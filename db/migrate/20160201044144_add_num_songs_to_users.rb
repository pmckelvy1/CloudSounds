class AddNumSongsToUsers < ActiveRecord::Migration
  def change
    add_column :users, :num_songs, :integer, default: 0
  end
end
