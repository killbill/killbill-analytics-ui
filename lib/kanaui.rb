require "kanaui/engine"

module Kanaui

  mattr_accessor :current_tenant_user

  self.current_tenant_user = lambda {
    {:username => 'admin',
     :password => 'password',
     :session_id => nil,
     :api_key => KillBillClient.api_key,
     :api_secret => KillBillClient.api_secret}
  }

end
