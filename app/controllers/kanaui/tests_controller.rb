
module Kanaui
  class TestsController < Kanaui::EngineController

    def index
      puts "+++++++++++++   Kanaui::TestsController INDEX"

    end

    def show

      user = current_user

      puts "+++++++++++++   Kanaui::TestsController current_user = #{user.inspect}"

      @tenant_user = current_tenant_user
    end

  end
end
