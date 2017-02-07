module Kanaui
  module DashboardHelper

    class DashboardApi < KillBillClient::Model::Resource

      KILLBILL_ANALYTICS_PREFIX = "/plugins/killbill-analytics"

      class << self

        def available_reports(options = {})
          path = "#{KILLBILL_ANALYTICS_PREFIX}/reports"
          response = KillBillClient::API.get path, {}, options
          response.body
        end

        def reports(start_date, end_date, name, smooth, format, options = {})
          path = "#{KILLBILL_ANALYTICS_PREFIX}/reports?format=#{format}&startDate=#{start_date}&endDate=#{end_date}&name=#{name}"
          path = "#{path}&smooth=#{smooth}" if smooth
          response = KillBillClient::API.get path, {}, options
          response.body
        end

        def report_configuration(name, options = {})
          path = "#{KILLBILL_ANALYTICS_PREFIX}/reports/#{name}"
          response = KillBillClient::API.get path, {}, options
          JSON.parse(response.body).symbolize_keys
        end

        def create_report(report, options = {})
          path = "#{KILLBILL_ANALYTICS_PREFIX}/reports"
          KillBillClient::API.post path, report, {}, options
        end

        def refresh_report(name, options = {})
          path = "#{KILLBILL_ANALYTICS_PREFIX}/reports/#{name}?shouldRefresh=true"
          KillBillClient::API.put path, {}, {}, options
        end

        def update_report(name, report, options = {})
          path = "#{KILLBILL_ANALYTICS_PREFIX}/reports/#{name}"
          KillBillClient::API.put path, report, {}, options
        end

        def delete_report(name, options = {})
          path = "#{KILLBILL_ANALYTICS_PREFIX}/reports/#{name}"
          KillBillClient::API.delete path, {}, {}, options
        end
      end
    end

  end
end

