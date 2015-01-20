Kanaui::Engine.routes.draw do

  resources :tests, :only => [ :show ]

end
