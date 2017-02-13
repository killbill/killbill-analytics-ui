module Kanaui
  class DashboardController < Kanaui::EngineController

    #
    # Load the dashboard by rendering the view and executing the javascript that will call
    # the reports and available_reports endpoints below.
    #
    def index
      raw_reports = Kanaui::DashboardHelper::DashboardApi.available_reports(options_for_klient)

      @raw_name = (params[:name] || '').split('^')[0]

      @endDate = params[:endDate] || Date.today.to_s

      @available_start_dates = start_date_options
      @startDate = params[:startDate] || @available_start_dates['Last 6 months']

      @reports = JSON.parse(raw_reports)
      @report = current_report(@reports) || {}

      filtered_report = nil
      ((@report['schema'] || {})['fields'] || []).each do |field|
        next if params[field['name']].blank?

        filtered_report << '%26' unless filtered_report.blank?
        filtered_report ||= '('
        params[field['name']].each do |filter|
          filtered_report << '|' unless filtered_report == '('
          filtered_report = "#{filtered_report}#{field['name']}=#{filter}"
        end
        filtered_report << ')'
      end

      unless filtered_report.blank?
        redirect_to dashboard_index_path(:startDate => params[:startDate],
                                         :endDate => params[:endDate],
                                         :name => "#{params[:name]}^filter:#{filtered_report}^metric:count",
                                         :smooth => params[:smooth],
                                         :sqlOnly => params[:sqlOnly],
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
      reports = fetch_reports(format)
      render :json => reports
    end

    private

    def start_date_options
      end_date = @endDate.to_date
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
        Kanaui::DashboardHelper::DashboardApi.reports(params[:startDate],
                                                      params[:endDate],
                                                      params[:name],
                                                      params[:smooth],
                                                      params[:sqlOnly],
                                                      format,
                                                      options_for_klient)
      end
    end

    def current_report(reports)
      return nil if @raw_name.blank?

      reports.find { |r| r['reportName'] == @raw_name }
    end
  end
end
