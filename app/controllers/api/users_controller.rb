class Api::UsersController < ApplicationController

  # before_action :ensure_logged_in
  def create
    @user = User.create(user_params)
    if @user.save
      log_in!(@user)
      @user = User.includes(:followings, :follows, playlists: [:user, playlist_items: [song: [:likes, :user, comments: [:user]]]], followed_users: [:followings], followed_songs: [:likes], liked_songs: [:likes], songs: [:likes]).find(@user.id)
      render :show
    else
      render json: @user.errors.full_messages
    end
  end

  def show
    @user = User.includes(:followings, :follows, playlists: [:user, playlist_items: [song: [:likes, :user, comments: [:user]]]], followed_users: [:followings], followed_songs: [:likes], liked_songs: [:likes], songs: [:likes]).find(params[:id])
    if @user
      render :show
    else
      flash[:errors] = ['could not find that user']
      redirect_to root_url
    end
  end

  def index
    # @users = User.where('users.id != ?', current_user.id)
    @users = User.all
    render :index
  end

  def update
    @user = User.find(params[:id])
    @user.update!(user_params)
    render :show
  end

  private
    def user_params
      params.require(:user).permit(:email, :username, :info, :password, :session_token, :image)
    end

end
