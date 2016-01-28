json.partial! 'api/users/user', user: @user
json.followed_users @user.followed_users do |followed_user|
  json.username followed_user.username
  json.id followed_user.id
end
json.songs @user.songs do |song|
  json.partial! 'api/songs/song', song: song
end
json.likes @user.likes do |like|
  json.partial! 'api/likes/like', like: like
end
