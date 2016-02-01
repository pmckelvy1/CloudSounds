class Api::UsersController < ApplicationController

  # before_action :ensure_logged_in
  def create
    @user = User.create(user_params)
    if @user.save
      log_in!(@user)
      @user = User.includes(:followings, :follows, :followed_users, followed_songs: [:likes], liked_songs: [:likes], songs: [:likes]).find(@user.id)
      render :show
    else
      flash[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.includes(:followings, :follows, followed_users: [:followings], followed_songs: [:likes], liked_songs: [:likes], songs: [:likes]).find(params[:id])
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

  private
    def user_params
      params.require(:user).permit(:email, :username, :info, :password, :session_token)
    end

end
