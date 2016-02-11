class AddTimestampToComments < ActiveRecord::Migration
  def change
    add_column :comments, :time_stamp, :decimal, default: 0
  end
end
