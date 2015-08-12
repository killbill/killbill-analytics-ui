module Kanaui
  class DashboardController < Kanaui::EngineController

    #
    # Load the dashboard by rendering the view and executing the javascript that will call
    # the reports and available_reports endpoints below.
    #
    def index

      user = current_tenant_user
      options = {
          :username => user[:username],
          :password => user[:password],
          :session_id => user[:session_id],
          :api_key => user[:api_key],
          :api_secret => user[:api_secret]
      }

      raw_reports = Kanaui::DashboardHelper::DashboardApi.available_reports(options)

      @startDate = params['startDate'] || (Date.today << 3).to_s
      @endDate = params['endDate'] || Date.today.to_s

      @reports = JSON.parse(raw_reports)
      render
    end

    # Not used anymore as reports are pulled from index
    def available_reports
      user = current_tenant_user
      options = {
          :username => user[:username],
          :password => user[:password],
          :session_id => user[:session_id],
          :api_key => user[:api_key],
          :api_secret => user[:api_secret]
      }

      available_reports = Kanaui::DashboardHelper::DashboardApi.available_reports(options)
      render json: available_reports
    end

    def reports
      user = current_tenant_user
      options = {
          :username => user[:username],
          :password => user[:password],
          :session_id => user[:session_id],
          :api_key => user[:api_key],
          :api_secret => user[:api_secret]
      }

      format = params['format'] || 'json'
      reports = Kanaui::DashboardHelper::DashboardApi.reports(params['startDate'], params['endDate'], params['name'], params['smooth'], format, options)
      render json: reports
    end

  end
end
