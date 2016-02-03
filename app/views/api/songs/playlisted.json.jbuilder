json.partial! 'api/songs/song', song: @song
json.playlist_items do |playlist_item|
  playlist_item.array! @song.playlist_items do |item|
    json.partial! 'api/playlist_items/playlist_item', playlist_item: item
  end
end
