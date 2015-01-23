module Kanaui
  class EngineController < ApplicationController

    #layout :get_layout

    def current_tenant_user
      Kanaui.current_tenant_user.call
    end

  end
end
