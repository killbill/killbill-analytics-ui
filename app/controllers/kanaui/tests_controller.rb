
module Kanaui
  class TestsController < Kanaui::EngineController

    def index
      puts "+++++++++++++   Kanaui::TestsController INDEX"

    end

    def show


      @tenant_user = current_tenant_user
    end

  end
end
