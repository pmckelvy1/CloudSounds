class Adduserinfo < ActiveRecord::Migration
  def change
    add_column :users, :info, :text
  end
end
