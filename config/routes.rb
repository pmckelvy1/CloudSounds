Rails.application.routes.draw do
  root to: 'staticpages#root'
  # namespace :api, defaults: { formate: :json } do
  #
  # end

  resources :users, only: [:new, :create, :show, :index]
  resource :session, only: [:new, :create, :destroy]
  resources :follows, only: [:create, :index, :destroy]
end
