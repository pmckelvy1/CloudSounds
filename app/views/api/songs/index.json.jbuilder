json.array! @songs do |song|
  json.id song.id
  json.title song.title
  json.info song.info
  json.user_id song.user_id
end
