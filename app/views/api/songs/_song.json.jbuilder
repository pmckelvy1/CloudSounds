json.extract! song, :id, :user_id, :title, :info, :username
# json.partial! 'api/comments/index', comments: song.comments
json.comments do |commentElement|
  commentElement.array!(song.comments) do |comment|
    json.partial! 'api/comments/comment', comment: comment
  end
end
json.image_url asset_path(song.image.url)
json.num_likes song.likes.length
