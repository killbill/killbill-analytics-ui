module Kanaui
  class DashboardController < Kanaui::EngineController

    #
    # Load the dashboard by rendering the view and executing the javascript that will call
    # the reports and available_reports endpoints below.
    #
    def index
      raw_reports = Kanaui::DashboardHelper::DashboardApi.available_reports(options_for_klient)

      @raw_name = (params[:name] || '').split('^')[0]

      @end_date = params[:end_date] || Date.today.to_s

      @available_start_dates = start_date_options
      @start_date = params[:start_date] || (params[:delta_days].present? ? (@end_date.to_date - params[:delta_days].to_i.day).to_s : @available_start_dates['Last 6 months'])

      @reports = JSON.parse(raw_reports)
      @report = current_report(@reports) || {}

      query = build_slice_and_dice_query

      # Redirect also in case the dates have been updated to avoid any confusion in the view
      if query.present? || params[:start_date].blank? || params[:end_date].blank?
        # TODO Make metrics configurable
        name = query.present? ? "#{params[:name]}#{query}^metric:count" : params[:name]
        redirect_to dashboard_index_path(:start_date => @start_date,
                                         :end_date => @end_date,
                                         :name => name,
                                         :smooth => params[:smooth],
                                         :sql_only => params[:sql_only],
                                         :format => params[:format]) and return
      end

      render
    end

    # Not used anymore as reports are pulled from index
    def available_reports
      available_reports = Kanaui::DashboardHelper::DashboardApi.available_reports(options_for_klient)
      render :json => available_reports
    end

    def reports
      format = params[:format] || 'json'
      raw_reports = fetch_reports(format)

      if format == 'json' && params[:sql_only] != 'true'
        reports = JSON.parse(raw_reports)

        # Remove reports with empty data
        reports.reject! do |report|
          reject = false
          (report['data'] || []).each { |data| reject = true if (data['values'] || []).empty? && data['value'].blank? }
          reject
        end
      else
        reports = raw_reports
      end
      render :json => reports
    end

    private

    def start_date_options
      end_date = @end_date.to_date
      {
        'Last month' => (end_date - 1.month).to_s,
        'Last 3 months' => (end_date - 3.months).to_s,
        'Last 6 months' => (end_date - 6.months).to_s,
        'Last year' => (end_date - 1.year).to_s
      }
    end

    def fetch_reports(format)
      if params[:fake]
        type = params.fetch('type', 'pie')
        File.read(Kanaui::Engine.root.join('lib', 'sample_data', "#{type}.json"))
      else
        Kanaui::DashboardHelper::DashboardApi.reports(params[:start_date],
                                                      params[:end_date],
                                                      params[:name],
                                                      params[:smooth],
                                                      params[:sql_only],
                                                      format,
                                                      options_for_klient)
      end
    end

    def current_report(reports)
      return nil if @raw_name.blank?

      reports.find { |r| r['reportName'] == @raw_name }
    end

    def build_slice_and_dice_query
      query = ''

      filters = {}
      groups = {}
      ((@report['schema'] || {})['fields'] || []).each do |field|
        field_name = field['name']

        filters[field_name] = params["filter_#{field_name}"]
        groups[field_name] = params["group_#{field_name}"]
      end

      filter_query = ''
      filters.each do |k, v|
        next if v.blank?
        filter_query << '%26' unless filter_query.blank?
        filter_query << "(#{k}=#{v.join("|#{k}=")})"
      end
      query << "^filter:#{filter_query}" unless filter_query.blank?

      groups.each do |k, v|
        next if v.blank?
        # TODO Make "no other" configurable
        query << "^dimension:#{k}(#{v.join('|')}|-)"
      end

      query
    end
  end
end
