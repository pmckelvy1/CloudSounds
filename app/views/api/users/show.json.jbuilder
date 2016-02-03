json.partial! 'api/users/user', user: @user
json.followed_users @user.followed_users do |followed_user|
  json.username followed_user.username
  json.id followed_user.id
  json.image_url asset_path(followed_user.image.url)
  json.num_songs followed_user.num_songs
  json.num_followers followed_user.followings.length
end
json.num_followers @user.followings.length
json.num_followed_users @user.follows.length
json.followed_songs @user.followed_songs do |song|
  json.partial! 'api/songs/song', song: song
end
json.songs @user.songs do |song|
  json.partial! 'api/songs/song', song: song
end
json.liked_songs @user.liked_songs do |song|
  json.partial! 'api/songs/song', song: song
end
json.playlists @user.playlists do |playlist|
  json.partial! 'api/playlists/playlist', playlist: playlist
end
