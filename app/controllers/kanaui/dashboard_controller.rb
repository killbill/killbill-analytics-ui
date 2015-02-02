module Kanaui
  class DashboardController < Kanaui::EngineController

    def index
      render
=begin
      puts "+++++++++++++   Kanaui::DashboardController INDEX"


      user = current_tenant_user

      options = {
          :username => user[:username],
          :password => user[:password],
          :session_id => user[:session_id],
          :api_key => user[:api_key],
          :api_secret => user[:api_secret]
      }

      @raw_html  = Kanaui::DashboardHelper::DashboardApi.get_dashboard(nil, nil, nil, options)
=end
    end

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
      puts "available_reports = #{available_reports}"

      render json: available_reports
    end

    def reports
=begin
    url += '?format=' + (format ? format : 'json')
    url += '&startDate=' + this.startDate;
    url += '&endDate=' + this.endDate;
    url += '&name=' + this.reports[position].join('&name=');
    if (this.smoothingFunctions[position]) {
        url += '&smooth=' + this.smoothingFunctions[position]
    }
=end

      user = current_tenant_user
      options = {
          :username => user[:username],
          :password => user[:password],
          :session_id => user[:session_id],
          :api_key => user[:api_key],
          :api_secret => user[:api_secret]
      }

      reports = Kanaui::DashboardHelper::DashboardApi.reports(nil, nil, nil, nil, options)
      puts "reports = #{reports}"
      reports

      render json: reports

    end

  end
end
