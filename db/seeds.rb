# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

User.destroy_all

guest = User.create!(email: 'guest_user@guest.com', username: 'guest', password: 'guest_password')
me = User.create!(email: 'pmckelvy1@gmail.com', username: 'pmckelvy', password: 'jamboxcool')
darth = User.create!(email: 'darth_vader@gmail.com', username: 'd_vader', password: 'starwars')
bach = User.create!(email: 'johansebass@gmail.com', username: 'bach_rachs', password: 'classical')
bowie = User.create!(email: 'dbowie@gmail.com', username: 'David Bowie', password: 'ziggystardust')

Follow.destroy_all
