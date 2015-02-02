module Kanaui
  module DashboardHelper

    class DashboardApi < KillBillClient::Model::Resource

      KILLBILL_ANALYTICS_PREFIX = "/plugins/killbill-analytics"

      class << self

        def available_reports(options = {})
          path = "#{KILLBILL_ANALYTICS_PREFIX}/plugins/killbill-analytics/reports"
          response = KillBillClient::API.get path, {}, options
          response.body
        end

        def reports(start_date, end_date, name, smooth, options = {})
          path = "#{KILLBILL_ANALYTICS_PREFIX}/plugins/killbill-analytics/reports?format=json&startDate=#{start_date}&endDate=#{end_date}&name=#{name}"
          path = "#{path}&smooth=#{smooth}" if smooth
          response = KillBillClient::API.get path, {}, options
          response.body
        end

      end
    end

  end
end

