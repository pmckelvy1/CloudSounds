class CreatePlaylists < ActiveRecord::Migration
  def change
    create_table :playlists do |t|
      t.integer :user_id, null: false, index: true
      t.string :title, null: false
      t.text :info, null: false

      t.timestamps null: false
    end
  end
end
