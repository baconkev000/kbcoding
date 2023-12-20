Rails.application.routes.draw do
  namespace :api do
    namespace :v1 do
      root :to => 'projects#index'
      resources :media
      resources :projects
      resources :project_types
    end
  end
end
