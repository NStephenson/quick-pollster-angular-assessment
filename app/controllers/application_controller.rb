class ApplicationController < ActionController::Base
  include DeviseTokenAuth::Concerns::SetUserByToken
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  # protect_from_forgery with: :exception
  before_action :configure_permitted_parameters, if: :devise_controller?
  respond_to :json

  protected



  def configure_permitted_parameters
    devise_parameter_sanitizer.permit(:sign_in, keys: [:email, :nickname])
    devise_parameter_sanitizer.permit(:sign_up, keys: [:username, :nickname])
    devise_parameter_sanitizer.permit(:account_update, keys: [:username])
    #binding.pry
  end



  
end
