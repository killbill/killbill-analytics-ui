module Kanaui
  class ReportsController < Kanaui::EngineController

    def index
      @reports = JSON.parse(Kanaui::DashboardHelper::DashboardApi.available_reports(options_for_klient)).map(&:deep_symbolize_keys)
    end

    def new
      @report = {}
    end

    def create
      Kanaui::DashboardHelper::DashboardApi.create_report(report_from_params.to_json, options_for_klient)

      flash[:notice] = 'Report successfully created'
      redirect_to :action => :index
    end

    def edit
      @report = JSON.parse(Kanaui::DashboardHelper::DashboardApi.available_reports(options_for_klient))
                    .find { |x| x['reportName'] == params.require(:id) }
                    .deep_symbolize_keys
    end

    def update
      Kanaui::DashboardHelper::DashboardApi.update_report(params.require(:id), report_from_params.to_json, options_for_klient)

      flash[:notice] = 'Report successfully updated'
      redirect_to :action => :index
    end

    def refresh
      Kanaui::DashboardHelper::DashboardApi.refresh_report(params.require(:id), options_for_klient)

      flash[:notice] = 'Report refresh successfully scheduled'
      redirect_to :action => :index
    end

    def destroy
      Kanaui::DashboardHelper::DashboardApi.delete_report(params.require(:id), options_for_klient)

      flash[:notice] = 'Report successfully deleted'
      redirect_to :action => :index
    end

    private

    def report_from_params
      {
          :reportName => params[:report_name],
          :reportPrettyName => params[:report_pretty_name],
          :reportType => params[:report_type],
          :sourceTableName => params[:source_table_name],
          :sourceName => params[:source_name],
          :sourceQuery => params[:source_query],
          :refreshProcedureName => params[:refresh_procedure_name],
          :refreshFrequency => params[:refresh_frequency],
          :refreshHourOfDayGmt => params[:refresh_hour_of_day_gmt]
      }
    end
  end
end
