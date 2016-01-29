json.partial! 'api/users/user', user: @user
json.followed_users @user.followed_users do |followed_user|
  json.username followed_user.username
  json.id followed_user.id
end
json.following_users @user.following_users do |following_user|
  json.username following_user.username
  json.id following_user.id
end
json.followed_songs @user.followed_songs do |followed_song|
  json.partial! 'api/songs/song', song: followed_song
end
json.songs @user.songs do |song|
  json.partial! 'api/songs/song', song: song
end
json.likes @user.likes do |like|
  json.partial! 'api/likes/like', like: like
end
json.liked_songs @user.liked_songs do |song|
  json.partial! 'api/songs/song', song: song
end
