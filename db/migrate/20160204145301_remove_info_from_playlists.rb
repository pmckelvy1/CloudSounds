class RemoveInfoFromPlaylists < ActiveRecord::Migration
  def change
    remove_column :playlists, :info
  end
end
