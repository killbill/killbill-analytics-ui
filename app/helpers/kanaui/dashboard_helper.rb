module Kanaui
  module DashboardHelper

    class DashboardApi < KillBillClient::Model::Resource

      KILLBILL_ANALYTICS_PREFIX = "/plugins/killbill-analytics"

      # http://127.0.0.1:8080/plugins/killbill-analytics/static/analytics.html?startDate=2012-11-08&endDate=2012-11-15&report1=new_accounts_per_day&__preset=ANALYTICS
      class << self

        def get_dashboard(start_date, end_date, reports, options = {})

          path = "#{KILLBILL_ANALYTICS_PREFIX}/static/analytics.html?startDate=2012-11-08&endDate=2012-11-15&report1=new_accounts_per_day&__preset=ANALYTICS"
          get path,
              {
              },
              options
        end

        def available_reports(options = {})
          path = "#{KILLBILL_ANALYTICS_PREFIX}/plugins/killbill-analytics/reports"

          response = KillBillClient::API.get path, {}, options
          response.body
        end


        def reports(start_date, end_date, name, smooth, options = {})
          path = "#{KILLBILL_ANALYTICS_PREFIX}/plugins/killbill-analytics/reports?format=json&startDate=2012-11-08&endDate=2012-11-15&name=new_accounts_per_day"
          response = KillBillClient::API.get path, {}, options
          response.body
        end

      end
    end

  end
end

