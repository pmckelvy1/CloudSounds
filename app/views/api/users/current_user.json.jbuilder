json.partial! 'api/users/user', user: @user
json.followed_users @user.followed_users do |followed_user|
  json.username followed_user.username
  json.id followed_user.id
end
json.followed_songs @user.followed_songs do |song|
  json.partial! 'api/songs/song', song: song
end
json.num_followings @user.followings.length
json.songs @user.songs do |song|
  json.partial! 'api/songs/song', song: song
end
json.liked_songs @user.liked_songs do |song|
  json.partial! 'api/songs/song', song: song
end
