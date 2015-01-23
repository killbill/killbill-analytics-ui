Kanaui::Engine.routes.draw do

  resources :tests, :only => [ :show, :index ]

end
