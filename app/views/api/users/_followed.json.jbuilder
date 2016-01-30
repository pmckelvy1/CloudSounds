json.partial! 'api/users/user', user: @user
json.songs @user.songs do |song|
  json.partial! 'api/songs/song', song: song
end
