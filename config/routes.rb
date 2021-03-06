Rails.application.routes.draw do
  namespace :api do
    resources :owners
    resources :restaurant_owners
    resources :restaurant_records
    resources :restaurants
    resources :users

    get '/visit', to: 'restaurant_records#unique_restaurants'
    get '/visit/day', to: 'restaurants#past_day'
    # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

    # Defines the root path route ("/")
    root 'fallback#index'
    post '/signup', to: 'users#create'
    get '/me', to: 'users#show'
    post '/login', to: 'sessions#create'
    delete '/logout', to: 'sessions#destroy'

    get '*path', to: 'fallback#index', constraints: ->(req) { !req.xhr? && req.format.html }
  end
end
