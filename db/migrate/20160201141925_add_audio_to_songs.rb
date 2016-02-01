class AddAudioToSongs < ActiveRecord::Migration
  def change
    add_attachment :songs, :audio
  end
end
