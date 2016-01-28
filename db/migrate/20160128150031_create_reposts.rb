class CreateReposts < ActiveRecord::Migration
  def change
    create_table :reposts do |t|
      t.integer :song_id, null: false, index: true
      t.integer :user_id, null: false, index: true
      
      t.timestamps null: false
    end
  end
end
