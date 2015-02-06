Rails.application.routes.draw do

  mount Kanaui::Engine => "/kanaui", :as => "kanaui_engine"
end
