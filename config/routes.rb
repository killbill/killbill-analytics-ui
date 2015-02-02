Kanaui::Engine.routes.draw do

  resources :dashboard, :only => [ :index ]
  scope "/dashboard" do
    match "/available_reports" => "dashboard#available_reports", :via => :get, :as => "available_reports"
    match "/reports" => "dashboard#reports", :via => :get, :as => "reports"
  end


end
