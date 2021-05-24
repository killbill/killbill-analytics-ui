# frozen_string_literal: true

require 'kanaui/engine'

module Kanaui
  mattr_accessor :current_tenant_user
  mattr_accessor :layout

  self.current_tenant_user = lambda { |_session, _user|
    { username: 'admin',
      password: 'password',
      session_id: nil,
      api_key: KillBillClient.api_key,
      api_secret: KillBillClient.api_secret }
  }

  def self.config
    {
      layout: layout || 'kanaui/layouts/kanaui_application'
    }
  end
end
