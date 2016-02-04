class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = User.includes(:followed_users, :followings, :followed_songs, playlists: [:songs], liked_songs: [:likes], songs: [:likes]).find(current_user.id)
      render "api/users/current_user"
    else
      render json: {}
    end
  end

  def create
    @user = User.find_by_credentials(
      params[:email],
      params[:password]
    )

    if @user.nil?
      # flash.now[:alert] = "Wrong email/password combo"
      # render :new, status: 401
      render json: ["Wrong email/password combo!"], status: 401
    else
      log_in!(@user)
      @user = User.includes(:followed_users, :followings, :followed_songs, playlists: [:songs], liked_songs: [:likes], songs: [:likes]).find(current_user.id)
      # redirect_to root_url
      render "api/users/current_user"
    end
  end

  def omniauth_facebook
    @user = User.find_or_create_by_auth_hash(auth_hash)
    log_in!(@user)
    redirect_to root_url + '#/'
  end

  def destroy
    log_out!
    render json: {}
  end

  private
    def auth_hash
      request.env['omniauth.auth']
    end
end
