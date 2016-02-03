json.array! playlist_items do |playlist_item|
  json.partial! 'api/playlist_items/playlist_item', playlist_item: playlist_item
end
