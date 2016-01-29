class Api::SongsController < ApplicationController
  def new
  end

  def create
    @song = Song.create(song_params)
    # @song = Song.create(song_params)
    @song.user_id = current_user.id
    @song.username = current_user.username
    if @song.save
      render :show
    end
  end

  def index
    # IF GIVEN A USER ID, GET ALL OF THE SONGS BY THAT USER
    # IF NOT GIVEN A USER ID, GET ALL OF THE SONGS BY USERS
    # THAT THE CURRENT USER FOLLOWS
    if params[:user_id]
      @songs = Song.where(user_id: params[:user_id]).includes(:likes)[0]
    else
      @songs = User.find(current_user.id).followed_songs
    end
    render :index
  end

  def show
  end

  def edit
  end

  def update
  end

  def destroy
  end

  private
    def song_params
      params.require(:song).permit(:title, :info, :image)
    end
end
