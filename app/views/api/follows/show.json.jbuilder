json.extract! @follow, :user_id, :followed_id, :id
json.partial! @follow.followed_user
