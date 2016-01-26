class UsersController < ApplicationController

  before_action :ensure_logged_in, only: [:show, :index]

  def new
    @user = User.new
    render :new
  end

  def create
    @user = User.create(user_params)
    if @user.save
      log_in!(@user)
      redirect_to root_url
    else
      flash[:errors] = @user.errors.full_messages
      render :new
    end
  end

  def show
    @user = User.find_by_id(params[:id])
    if @user
      render :show
    else
      flash[:errors] = ['could not find that user']
      redirect_to root_url
    end
  end

  def index
    @users = User.all
    render :index
  end

  private
    def user_params
      params.require(:user).permit(:email, :username, :password, :session_token)
    end

end
