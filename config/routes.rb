Kanaui::Engine.routes.draw do

  root to: 'dashboard#index'
  resources :dashboard, :only => [:index]
  scope "/dashboard" do
    match "/available_reports" => "dashboard#available_reports", :via => :get, :as => "available_reports"
    match "/reports" => "dashboard#reports", :via => :get, :as => "reports"
  end

  resources :reports, :only => [:index, :new, :create, :edit, :update, :destroy]
  scope "/reports" do
    match "/refresh/:id" => "reports#refresh", :via => :put, :as => "refresh_report"
  end
end
