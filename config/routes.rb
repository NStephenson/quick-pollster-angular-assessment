Rails.application.routes.draw do
  mount_devise_token_auth_for 'User', at: 'auth'

  root to: 'home#index'

  #devise_for :users, :controllers => { :omniauth_callbacks => "users/omniauth_callbacks" }
  # resources :surveys
  resources :users, only: [:show] do
    resources :polls, only: [ :index, :show ]
  end

  resources :polls, only: [:index, :create, :show, :update, :destroy]




  get 'polls/:id/results', to: 'polls#results', as: 'poll_results'
  post 'polls/:id/results', to: 'polls#add_results', as: "poll_add_results"

  # get 'surveys/:id/results', to: 'surveys#results', as: 'survey_results'
  # post 'surveys/:id/results', to: 'surveys#add_results', as: "survey_add_results"
end
