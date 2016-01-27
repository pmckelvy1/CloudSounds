json.partial! 'users/user', user: @user
json.followed_users @user.followed_users do |followed_user|
  json.username followed_user.username
  json.id followed_user.id
end
