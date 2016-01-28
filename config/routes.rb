Rails.application.routes.draw do
  root to: 'staticpages#root'

  namespace :api, defaults: { format: :json } do
    resources :users, only: [:show, :index, :edit, :update]
    resources :songs
    resources :follows, only: [:create, :index, :destroy]
    resources :likes, only: [:create, :index, :destroy, :show]
  end

  resources :users, only: [:new, :create]
  resource :session, only: [:new, :create, :destroy]


end
