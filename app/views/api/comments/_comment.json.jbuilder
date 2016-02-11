json.extract! comment, :user_id, :song_id, :body, :id, :time_stamp
json.user do
  json.partial! 'api/users/user', user: comment.user
end
