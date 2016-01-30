json.extract! user, :username, :id, :info
json.image_url asset_path(user.image.url)
json.header_image_url asset_path(user.header_image.url)
