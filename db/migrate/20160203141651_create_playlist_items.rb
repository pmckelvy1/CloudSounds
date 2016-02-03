class CreatePlaylistItems < ActiveRecord::Migration
  def change
    create_table :playlist_items do |t|
      t.integer :playlist_id, null: false, index: true
      t.integer :song_id, null: false, index: true
      t.integer :song_ord, null: false

      t.timestamps null: false
    end
  end
end
