json.extract! song, :id, :user_id, :title, :info, :username, :comments
json.image_url asset_path(song.image.url)
json.num_likes song.likes.length
