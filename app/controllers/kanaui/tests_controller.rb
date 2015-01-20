
module Kanaui
  class TestsController < Kanaui::EngineController

    def show
      @tenant_user = current_tenant_user
    end

  end
end
