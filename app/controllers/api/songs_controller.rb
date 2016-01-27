class Api::SongsController < ApplicationController
  def new
  end

  def create
  end

  def index
    if params[:user_id]
      @songs = Song.where(user_id: params[:user_id])
    else
      @songs = Song.all
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
