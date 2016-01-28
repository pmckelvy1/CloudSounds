class Api::LikesController < ApplicationController

  def create
    @like = Like.create!(song_id: params[:song_id], user_id: current_user.id)
    render :show
  end

  def index
    @likes = User.find(params[:id]).liked_songs
    render :index
  end

  def show
  end

  def destroy
    @like = Like.find(params[:id])
    @like.destroy!
    render :show
  end

end
