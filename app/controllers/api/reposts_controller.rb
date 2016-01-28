class Api::RepostsController < ApplicationController

  def create
    @repost = Repost.create!(song_id: params[:song_id], user_id: current_user.id)
    render :show
  end

  def index
    @reposts = User.find(params[:id]).repostd_songs
    render :index
  end

  def show
  end

  def destroy
    @repost = Repost.find(params[:id])
    @repost.destroy!
    render :show
  end

end
