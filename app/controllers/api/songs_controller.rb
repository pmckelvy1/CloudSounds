class Api::SongsController < ApplicationController
  def new
  end

  def create
  end

  def index
    # IF GIVEN A USER ID, GET ALL OF THE SONGS BY THAT USER
    # IF NOT GIVEN A USER ID, GET ALL OF THE SONGS BY USERS
    # THAT THE CURRENT USER FOLLOWS
    if params[:user_id]
      @songs = Song.where(user_id: params[:user_id])
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
      params.require(:song).permit(:title, :info)
    end
end
