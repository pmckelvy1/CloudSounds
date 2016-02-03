class Api::PlaylistsController < ApplicationController
  def create
    @playlist = Playlist.create(playlist_params)
    @playlist.user_id = current_user.id
    if @playlist.save
      render :show
    else
      render json: ['playlist could not be saved']
    end
  end

  def show
    @playlist = Playlist.includes(:songs, :user).find(id: params[:id])
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
      params.require(:playlist).permit(:title, :info)
    end
end
