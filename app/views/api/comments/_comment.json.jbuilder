json.extract! comment, :user_id, :song_id, :body, :id
json.user do
  json.partial! 'api/users/user', user: comment.user
end
