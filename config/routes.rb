Rails.application.routes.draw do
  root to: 'staticpages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :create, :index, :edit, :update]
    resource :session, only: [:show, :create, :destroy]
    resources :songs do
      resources :comments, only: [:index]
    end
    resources :follows, only: [:create, :index, :destroy]
    resources :likes, only: [:create, :index, :destroy, :show]
    resources :reposts, only: [:create, :index, :destroy, :show]
    resources :images, only: [:create, :destroy, :show]
    resources :comments, only: [:create, :destroy]
    get 'songs/:id/play', to: 'songs#add_play'
    resources :playlists do
      resources :playlist_items
    end
    resources :playlist_items, only: [:destroy, :edit, :update]
    get "search", to: "utils#search"
  end

  get 'auth/facebook/callback', to: 'sessions#omniauth_facebook'
  # resources :users, only: [:new, :create]
  # resource :session, only: [:new, :create, :destroy]


end
