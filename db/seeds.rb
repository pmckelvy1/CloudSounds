# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)
require 'open-uri'

User.destroy_all

# ARTISTS
guest = User.create!(num_songs: 3, email: 'guest_user@guest.com', username: 'guest', password: 'guest_password', info: "This is a guest account.")
me = User.create!(num_songs: 2, email: 'ryonlawford@gmail.com', username: 'Ryon Lawford', password: 'jamboxcool', info: "Electrified Dancing Musician")
darth = User.create!(num_songs: 1, email: 'darth_vader@gmail.com', username: 'd_vader', password: 'starwars', info: "Leader of the Imperial Army, Dark Lord, and Sith Master")
bach = User.create!(num_songs: 3, email: 'johansebass@gmail.com', username: 'bach_rachs', password: 'classical', info: "I play piano.  I also crochet.")
bowie = User.create!(num_songs: 2, email: 'dbowie@gmail.com', username: 'David Bowie', password: 'ziggystardust', info: "Call me ziggy.")
sophie = User.create!(num_songs: 4, email: 'sophiebeats@gmail.com', username: 'SOPHIE', password: 'latexhard', info: "Mysterious beat-maker from the nether. \n \n Noises \n Nonsense \n \n I like weird sounds.")

# RANDOM USERS
i = 0
robo_users = []
while (i < 10)
  name = Faker::Name.name
  u = User.create!(username: name,
    email: Faker::Internet.email,
    password: Faker::Internet.password,
    info: Faker::Hipster.paragraph,
    image: open(URI.encode(Faker::Avatar.image(name)))
  )
  robo_users.push(u)
  i += 1
end


Song.destroy_all

s1 = Song.create(user_id: guest.id, username: guest.username, title: "Yellow Submarine", info: "Originally by the beatles.  From the album 'Yellow Submarine'.")
s2 = Song.create!(user_id: guest.id, username: guest.username, title: "A Little Help From My Friends", info: "Originally by the beatles.  SARGEANT PEPPER!")
s3 = Song.create!(user_id: guest.id, username: guest.username, title: "Happy Birthday", info: "Originally by the beatles.  I'm so glad it's your birthday!")
s4 = Song.create!(user_id: me.id, username: me.username, title: "Been There Before", info: "Featuring Julia Lauren on vocals!")
s5 = Song.create!(user_id: me.id, username: me.username, title: "Punch Funk Love", info: "From the new Pitchslap album.")
s6 = Song.create!(user_id: darth.id, username: darth.username, title: "Imperial March", info: "Music by John Williams.")
s7 = Song.create!(user_id: bowie.id, username: bowie.username, title: "Ziggy Stardust", info: "We were ziggy's band.")
s8 = Song.create!(user_id: bowie.id, username: bowie.username, title: "Space Oddity", info: "Out there...")
s9 = Song.create!(user_id: bach.id, username: bach.username, title: "Brandenburg Concerto No. 1", info: "Old school, ya heard?")
s10 = Song.create!(user_id: bach.id, username: bach.username, title: "Minuet in G Minor", info: "...but im a major G.")
s11 = Song.create!(user_id: bach.id, username: bach.username, title: "Moonlight Sonata", info: "Beethoven ripped me off!")


# SOPHIE SONGS
# sophie1 = Song.create!(user_id: sophie.id, username: sophie.username, title: 'Lemonade', info: "Off the self titled album. \n Also from that McDonalds commercial. \n Lemonade, \n le- le- lemonade.",
#   audio: File.open('app/assets/audio/Lemonade.m4a'), image: File.open('app/assets/images/sophie_slide1.jpg'), num_plays: 3562)
# sophie2 = Song.create!(user_id: sophie.id, username: sophie.username, title: 'Hard', info: "Off the self titled album. \n Latex gloves go so hard.",
#   audio: File.open('app/assets/audio/Hard.m4a'), image: File.open('app/assets/images/sophie_slide2.png'), num_plays: 8574)
# sophie3 = Song.create!(user_id: sophie.id, username: sophie.username, title: 'Just Like We Never Said Goodbye', info: "Off the self titled album. \n Remixes coming soon!.",
#   audio: File.open('app/assets/audio/Just Like We Never Said Goodbye.m4a'), image: File.open('app/assets/images/sophie_slide3.jpg'), num_plays: 11453)
#
# sophie_songs = [sophie1, sophie2, sophie3]

Follow.destroy_all

f1 = Follow.create!(user_id: guest.id, followed_id: me.id);
f2 = Follow.create!(user_id: guest.id, followed_id: darth.id);
f3 = Follow.create!(user_id: guest.id, followed_id: bach.id);
f4 = Follow.create!(user_id: me.id, followed_id: guest.id);
f5 = Follow.create!(user_id: me.id, followed_id: bowie.id);
f6 = Follow.create!(user_id: darth.id, followed_id: bach.id);
f7 = Follow.create!(user_id: darth.id, followed_id: me.id);
f8 = Follow.create!(user_id: darth.id, followed_id: guest.id);
f9 = Follow.create!(user_id: darth.id, followed_id: bowie.id);
f10 = Follow.create!(user_id: bowie.id, followed_id: bach.id);
f11 = Follow.create!(user_id: bowie.id, followed_id: guest.id);
f12 = Follow.create!(user_id: bach.id, followed_id: guest.id);
f13 = Follow.create!(user_id: bach.id, followed_id: me.id);
f14 = Follow.create!(user_id: bach.id, followed_id: darth.id);

Like.destroy_all

Comment.destroy_all

c1 = Comment.create!(user_id: guest.id, song_id: s1.id, body: "awesome song!")
c2 = Comment.create!(user_id: guest.id, song_id: s2.id, body: "i love this part")
c3 = Comment.create!(user_id: guest.id, song_id: s6.id, body: "class vader")
c4 = Comment.create!(user_id: guest.id, song_id: s1.id, body: "awesome song!")
c5 = Comment.create!(user_id: bowie.id, song_id: s6.id, body: "wow!")
c6 = Comment.create!(user_id: bowie.id, song_id: s2.id, body: "great job with this one!")
c7 = Comment.create!(user_id: bowie.id, song_id: s3.id, body: "love the guitar here")
c8 = Comment.create!(user_id: bowie.id, song_id: s4.id, body: "when's the album coming out?")
c9 = Comment.create!(user_id: darth.id, song_id: s1.id, body: "terrible")
c10 = Comment.create!(user_id: darth.id, song_id: s7.id, body: "awful")
c11 = Comment.create!(user_id: darth.id, song_id: s3.id, body: "a jedi must have made this. horrible.")
c12 = Comment.create!(user_id: darth.id, song_id: s5.id, body: "lackluster performance")
c13 = Comment.create!(user_id: darth.id, song_id: s1.id, body: "this must be a joke, right?")
c14 = Comment.create!(user_id: me.id, song_id: s8.id, body: "come play a show in NY!")
c15 = Comment.create!(user_id: me.id, song_id: s9.id, body: "when can i get this on itunes?")
c17 = Comment.create!(user_id: darth.id, song_id: s4.id, body: "you should go back there.")
c18 = Comment.create!(user_id: bowie.id, song_id: s4.id, body: "awoopwa wooha")
c19 = Comment.create!(user_id: bach.id, song_id: s4.id, body: "quite elementary")
c20 = Comment.create!(user_id: guest.id, song_id: s4.id, body: "i can dig it")
c21 = Comment.create!(user_id: bach.id, song_id: s4.id, body: "on second thought, i rather enjoy the groove of this piece.")

# robo_users.each do |user|
#   i = 0
#   while (i < 3)
#     song_id = Random.rand(3)
#     Comment.create!(user_id: user.id, song_id: sophie_songs[song_id].id, body: Faker::Hipster.sentence)
#     i += 1
#   end
# end

Playlist.destroy_all
PlaylistItem.destroy_all

p1 = Playlist.create!(user_id: guest.id, title: 'You guest it!')
p1a = PlaylistItem.create!(playlist_id: p1.id, song_id: s1.id, song_ord: 0)
p1b = PlaylistItem.create!(playlist_id: p1.id, song_id: s2.id, song_ord: 1)
p1c = PlaylistItem.create!(playlist_id: p1.id, song_id: s6.id, song_ord: 2)
p1d = PlaylistItem.create!(playlist_id: p1.id, song_id: s5.id, song_ord: 3)
p1e = PlaylistItem.create!(playlist_id: p1.id, song_id: s9.id, song_ord: 4)

p2 = Playlist.create!(user_id: guest.id, title: 'Electro party music')
p2a = PlaylistItem.create!(playlist_id: p2.id, song_id: s10.id, song_ord: 0)
p2b = PlaylistItem.create!(playlist_id: p2.id, song_id: s3.id, song_ord: 1)
p2c = PlaylistItem.create!(playlist_id: p2.id, song_id: s4.id, song_ord: 2)

# p3 = Playlist.create!(user_id: sophie.id, title: 'SOPHIE')
# p3a = PlaylistItem.create!(playlist_id: p3.id, song_id: sophie1)
# p3b = PlaylistItem.create!(playlist_id: p3.id, song_id: sophie2)
# p3c = PlaylistItem.create!(playlist_id: p3.id, song_id: sophie3)
