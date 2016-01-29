class Api::UsersController < ApplicationController

  # before_action :ensure_logged_in

  def show
    @user = User.includes(:followed_users, :followings, :followed_songs, :songs, :likes, :liked_songs).find(params[:id])
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
      params.require(:user).permit(:email, :username, :password, :session_token)
    end

end
