class Api::SongsController < ApplicationController
  def new
  end

  def create
    @song = Song.create(song_params)
    @song.user_id = current_user.id
    @song.username = current_user.username
    if @song.save
      @user = User.find(@song.user_id)
      @user.num_songs += 1
      @user.save!
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
      @songs = User.find(current_user.id).followed_songs.includes(:likes)
    end
    render :index
  end

  def show
    @song = Song.where(id: params[:id]).includes(:liking_users, :likes, :user, comments: [:user])[0]
  end

  def edit
  end

  def update
  end

  def destroy
  end

  def add_play
    @song = Song.find(params[:id])
    @song.num_plays += 1
    @song.save!
    render json: {id: @song.id, num_plays: @song.num_plays}
  end

  private
    def song_params
      params.require(:song).permit(:title, :info, :image, :audio)
    end
end
