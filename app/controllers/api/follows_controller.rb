class Api::FollowsController < ApplicationController

  before_action :ensure_logged_in

  def index
  end

  def create
    @follow = Follow.create!(user_id: current_user.id, followed_id: params[:followed_id])
    # @user = User.where(id: @follow.followed_id).includes(:songs)[0]
    @user = User.includes(songs: [:likes]).find(@follow.followed_id)
    # @songs = Song.where(user_id: @follow.followed_id)
    # render 'api/users/followed'
    render 'api/users/_followed'
  end

  def destroy
    @follow = Follow.find_by_followed_id(params[:id])
    @follow.destroy!
    render :show
  end

end
