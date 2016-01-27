class CreateSongs < ActiveRecord::Migration
  def change
    create_table :songs do |t|
      t.integer :user_id, null: false, index: true
      t.string :title, null: false
      t.text :info, null: false
      t.integer :num_plays, default: 0

      t.timestamps null: false
    end
  end
end
