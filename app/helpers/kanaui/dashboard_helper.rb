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
          path = "#{KILLBILL_ANALYTICS_PREFIX}/reports?format=json&startDate=#{start_date}&endDate=#{end_date}&name=#{name}"
          path = "#{path}&smooth=#{smooth}" if smooth
          response = KillBillClient::API.get path, {}, options
          response.body
        end

      end
    end

  end
end

