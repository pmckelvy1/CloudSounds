json.extract! song, :id, :user_id, :title, :info, :username
# json.partial! 'api/comments/index', comments: song.comments
# json.partial! 'api/users/user', user: song.user
json.user do
  json.image_url asset_path(song.user.image.url)
  json.username song.user.username
  json.id song.user.id
end
json.comments do |commentElement|
  commentElement.array!(song.comments) do |comment|
    json.partial! 'api/comments/comment', comment: comment
  end
end
json.image_url asset_path(song.image.url)
json.audio_url asset_path(song.audio.url)
json.num_likes song.likes.length
json.num_plays song.num_plays
