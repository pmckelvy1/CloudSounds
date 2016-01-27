json.partial! 'api/users/user', user: @user
json.followed_users @user.followed_users do |followed_user|
  json.username followed_user.username
  json.id followed_user.id
end
json.songs @user.songs do |song|
  json.id song.id
  json.title song.title
  json.info song.info
  json.user_id song.user_id
end
