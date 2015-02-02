module Kanaui
  class DashboardController < Kanaui::EngineController

    #
    # Load the dashboard by rendering the view and executing the javascript that will call
    # the reports and available_reports endpoints below.
    #
    def index
      # Activate the redirection mechanics if the user is not logged in
      current_tenant_user
      render
    end

    # Proxy the call to the Kill Bill analytics plugin to retrieve all available reports
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

    # Proxy the call to the Kill Bill analytics plugin to retrieve the json data for each report
    def reports
      user = current_tenant_user
      options = {
          :username => user[:username],
          :password => user[:password],
          :session_id => user[:session_id],
          :api_key => user[:api_key],
          :api_secret => user[:api_secret]
      }

      reports = Kanaui::DashboardHelper::DashboardApi.reports(params['startDate'], params['endDate'], params['name'], params['smooth'], options)
      render json: reports
    end

  end
end
