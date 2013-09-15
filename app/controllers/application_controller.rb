class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception
  helper_method :logged_in
  helper_method :token_str

  def logged_in
  	session[:token].present?
  end

  def token_str
  	session[:token]
  end

end
