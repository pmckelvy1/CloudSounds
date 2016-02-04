class SessionsController < ApplicationController

  def new
  end

  def create
    user = User.find_by_credentials(params[:user][:email], params[:user][:password])
    if user
      log_in!(user)
      redirect_to root_url
    else
      flash[:errors] = ['Could not find that user']
      render :new
    end
  end

  def omniauth_facebook
    @user = User.find_or_create_by_auth_hash(auth_hash)
    log_in!(@user)
    redirect_to root_url + '#/'
  end

  def destroy
    log_out!
    redirect_to new_session_url
  end

  private
    def auth_hash
      request.env['omniauth.auth']
    end

end
