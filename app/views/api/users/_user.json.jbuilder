json.extract! user, :username, :id, :info, :num_songs, :email
json.image_url asset_path(user.image.url)
json.header_image_url asset_path(user.header_image.url)
