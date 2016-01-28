class AddUsernameToSongs < ActiveRecord::Migration
  def change
    add_column :songs, :username, :string, null: false
  end
end
