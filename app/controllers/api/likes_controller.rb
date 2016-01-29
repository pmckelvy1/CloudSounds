class Api::LikesController < ApplicationController

  def create
    @like = Like.create!(song_id: params[:song_id], user_id: current_user.id)
    @song = Song.where(id: @like.song_id).includes(:likes)[0]
    render 'api/songs/liked'
  end

  def index
    @likes = User.find(params[:id]).liked_songs
    render :index
  end

  def show
  end

  def destroy
    @like = Like.find_by_song_id(params[:id])
    @like.destroy!
    render :show
  end

end
