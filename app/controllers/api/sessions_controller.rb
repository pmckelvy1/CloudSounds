class Api::SessionsController < ApplicationController
  def show
    if current_user
      @user = current_user
      render "api/users/show"
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
      # redirect_to root_url
      render "api/users/show"
    end
  end

  def destroy
    log_out!

    render json: {}
  end
end