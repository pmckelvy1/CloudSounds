class AddImagesToSongs < ActiveRecord::Migration
  def change
    add_attachment :songs, :image
  end
end
