# frozen_string_literal: true

module Kanaui
  class SettingsController < Kanaui::EngineController
    def index; end

    # update would have been nicer, but it's hard to pass the id in the url
    def create
      Kanaui::DashboardHelper::DashboardApi.refresh(params.require(:account_id), options_for_klient)
      redirect_to({ action: :index }, notice: 'Account successfully refreshed')
    end
  end
end
