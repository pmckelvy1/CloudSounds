class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  helper_method :current_user, :ensure_logged_in, :logged_in?

  private

    def log_in!(user)
      @current_user = user
      session[:session_token] = user.reset_session_token!
      user.save!
    end

    def log_out!
      current_user.reset_session_token!
      session[:session_token] = nil
      @current_user = nil
    end

    def logged_in?
      !!current_user
    end

    def current_user
      @current_user ||= User.find_by_session_token(session[:session_token])
    end

    def ensure_logged_in
      redirect_to new_session_url unless logged_in?
    end
end
