json.extract! playlist_item, :id, :playlist_id, :song_ord
json.playlist_title playlist_item.playlist.title
json.song do
  json.partial! 'api/songs/song', song: playlist_item.song
end
