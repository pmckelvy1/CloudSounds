class Api::FollowsController < ApplicationController

  before_action :ensure_logged_in

  def index
  end

  def create
    @follow = Follow.create!(user_id: current_user.id, followed_id: params[:followed_id])
    render :show
  end

  def destroy
    @follow = Follow.find(params[:id])
    @follow.destroy!
    render :show
  end

end
