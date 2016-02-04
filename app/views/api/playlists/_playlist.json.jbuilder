json.extract! playlist, :title, :id
# json.parital! 'api/users/user', user: playlist.user
json.songs do |song_item|
  song_item.array!(playlist.songs) do |song|
    json.partial! 'api/songs/song', song: song
  end
end
