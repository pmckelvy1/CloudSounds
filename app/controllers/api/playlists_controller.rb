class Api::PlaylistsController < ApplicationController
  def create
    @playlist = Playlist.create(playlist_params)
    @playlist.user_id = current_user.id
    if @playlist.save
      @playlist_item = PlaylistItem.create!(playlist_id: @playlist.id, song_id: params[:playlist][:song_id], song_ord: 0)
      @playlist = Playlist.includes(:songs, :user).find(@playlist.id)
      render :show
    else
      render json: ['playlist could not be saved']
    end
  end

  def show
    @playlist = Playlist.includes(:songs, :user).find(params[:id])
    render :show
  end

  def index
  end

  def edit
  end

  def update
  end

  def destroy
    @playlist = Playlist.find(params[:id])
    @playlist.destroy
    render json: [playlist_id: @playlist.id]
  end

  private
    def playlist_params
      params.require(:playlist).permit(:title)
    end
end
