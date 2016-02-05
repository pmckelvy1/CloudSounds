class Api::PlaylistItemsController < ApplicationController
  def create
    @playlist_item = PlaylistItem.create(playlist_item_params)
    if !@playlist_item.song_ord
      highest_ord = PlaylistItem.where(playlist_id: params[:playlist_id]).maximum('song_ord')
      if (highest_ord)
        @playlist_item.song_ord = highest_ord + 1
      else
        @playlist_item.song_ord = 0
      end
    end


    if @playlist_item.save
      @playlist_item = PlaylistItem.includes(song: [:likes, :user, comments: [:user]]).find(@playlist_item.id)
      # @song = Song.includes(:likes, :user, :playlist_items, comments: [:user]).find(params[:playlist_item][:song_id])
      # @song.playlist_items = [@playlist_item]
      # render 'api/songs/playlisted'
      render 'api/playlist_items/show'
    else
      render json: ['could not save playlist item']
    end
  end

  def show
  end

  def index
  end

  def update
  end

  def destroy
    @playlist_item = PlaylistItem.find(params[:id])
    @playlist_item.destroy!
    playlist = Playlist.includes(:playlist_items).find(@playlist_item.playlist_id)
    if playlist.playlist_items.length === 0
      playlist.destroy!
    end
    render 'api/playlist_items/show'

  end

  private
    def playlist_item_params
      params.require(:playlist_item).permit(:song_id, :playlist_id, :song_ord)
    end
end
