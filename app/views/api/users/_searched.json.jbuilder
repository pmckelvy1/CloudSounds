json.extract! user, :username, :id, :info, :num_songs
json.image_url asset_path(user.image.url)
json.header_image_url asset_path(user.header_image.url)
json.num_followers @user.followings.length
