class AddImagesToUsers < ActiveRecord::Migration
  def change
    add_attachment :users, :image
    add_attachment :users, :header_image
  end
end
