module Kanaui
  class EngineController < ActionController::Base

    #layout :get_layout

    def current_tenant_user
      Kanaui.current_tenant_user.call
    end

  end
end
