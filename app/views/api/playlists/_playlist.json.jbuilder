json.extract! playlist, :title, :id, :user_id
# json.parital! 'api/users/user', user: playlist.user
json.playlist_items do |item|
  item.array!(playlist.playlist_items) do |playlist_item|
    json.partial! 'api/playlist_items/playlist_item', playlist_item: playlist_item
  end
end
