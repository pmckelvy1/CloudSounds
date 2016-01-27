# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all

guest = User.create!(email: 'guest_user@guest.com', username: 'guest', password: 'guest_password', info: "This is a guest account.")
me = User.create!(email: 'pmckelvy1@gmail.com', username: 'pmckelvy', password: 'jamboxcool', info: "This is the account for the creator of this site, Patrick McKelvy")
darth = User.create!(email: 'darth_vader@gmail.com', username: 'd_vader', password: 'starwars', info: "Leader of the Imperial Army, Dark Lord, and Sith Master")
bach = User.create!(email: 'johansebass@gmail.com', username: 'bach_rachs', password: 'classical', info: "I play piano.  I also crochet.")
bowie = User.create!(email: 'dbowie@gmail.com', username: 'David Bowie', password: 'ziggystardust', info: "Call me ziggy.")

Follow.destroy_all

# f1 = Follow.create!(user_id: guest.id, followed_id: me.id);
# f2 = Follow.create!(user_id: guest.id, followed_id: darth.id);
# f3 = Follow.create!(user_id: guest.id, followed_id: bach.id);
# f4 = Follow.create!(user_id: me.id, followed_id: guest.id);
# f5 = Follow.create!(user_id: me.id, followed_id: bowie.id);
# f6 = Follow.create!(user_id: darth.id, followed_id: bach.id);
# f7 = Follow.create!(user_id: darth.id, followed_id: me.id);
# f8 = Follow.create!(user_id: darth.id, followed_id: guest.id);
# f9 = Follow.create!(user_id: darth.id, followed_id: bowie.id);
# f10 = Follow.create!(user_id: bowie.id, followed_id: bach.id);
# f11 = Follow.create!(user_id: bowie.id, followed_id: guest.id);
# f12 = Follow.create!(user_id: bach.id, followed_id: guest.id);
# f13 = Follow.create!(user_id: bach.id, followed_id: me.id);
# f14 = Follow.create!(user_id: bach.id, followed_id: darth.id);
