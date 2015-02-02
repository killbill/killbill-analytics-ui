module Kanaui
  class EngineController < ApplicationController

    layout :get_layout

    def get_layout
      layout ||= Kanaui.config[:layout]
    end

    def current_tenant_user
      Kanaui.current_tenant_user.call
    end

  end
end
