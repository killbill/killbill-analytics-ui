module Kanaui
  class DashboardController < Kanaui::EngineController

    #
    # Load the dashboard by rendering the view and executing the javascript that will call
    # the reports and available_reports endpoints below.
    #
    def index
      raw_reports = Kanaui::DashboardHelper::DashboardApi.available_reports(options_for_klient)

      @endDate = params['endDate'] || Date.today.to_s

      @available_start_dates = start_date_options
      @startDate = params['startDate'] || @available_start_dates['Last 6 months']

      @reports = JSON.parse(raw_reports)
      render
    end

    # Not used anymore as reports are pulled from index
    def available_reports
      available_reports = Kanaui::DashboardHelper::DashboardApi.available_reports(options_for_klient)
      render json: available_reports
    end

    def reports
      format = params['format'] || 'json'
      reports = fetch_reports(format)
      render json: reports
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
      if params['fake']
        type = params.fetch('type', 'pie')
        File.read(Kanaui::Engine.root.join('lib', 'sample_data', "#{type}.json"))
      else
        Kanaui::DashboardHelper::DashboardApi.reports(params['startDate'], params['endDate'], params['name'], params['smooth'], format, options_for_klient)
      end
    end

  end
end
