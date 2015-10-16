module Kanaui
  class EngineController < ApplicationController

    layout :get_layout

    def get_layout
      layout ||= Kanaui.config[:layout]
    end

    def current_tenant_user
      # If the rails application on which that engine is mounted defines such method (Devise), we extract the current user,
      # if not we default to nil, and serve our static mock configuration
      user = current_user if respond_to?(:current_user)
      Kanaui.current_tenant_user.call(session, user)
    end

  end
end
