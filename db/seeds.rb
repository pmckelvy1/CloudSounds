require 'open-uri'




PgSearch::Document.destroy_all
### USERS ###
#############
#
User.destroy_all
#
# # ARTISTS
guest = User.create!(num_songs: 3, email: 'guest_user@guest.com', username: 'Guest', password: 'guest_password', info: "This is a guest account.", image: File.open('app/assets/images/guest_pic.jpg'))
me = User.create!(num_songs: 4, email: 'ryonlawford@gmail.com', username: 'Ryon Lawford', password: 'jamboxcool', info: "Electrified Dancing Musician", image: File.open('app/assets/images/ryon-lawford-profile.jpeg'))
darth = User.create!(num_songs: 1, email: 'darth_vader@gmail.com', username: 'Darth Vader', password: 'starwars', info: "Leader of the Imperial Army, Dark Lord, and Sith Master", image: File.open('app/assets/images/vader.jpg'))
bach = User.create!(num_songs: 1, email: 'johansebass@gmail.com', username: 'Bach', password: 'classical', info: "I play piano.  I also crochet.", image: File.open('app/assets/images/bach_shades.jpg'))
bowie = User.create!(num_songs: 0, email: 'dbowie@gmail.com', username: 'David Bowie', password: 'ziggystardust', info: "Call me ziggy.", image: File.open('app/assets/images/bowie.jpg'))
sophie = User.create!(num_songs: 3, email: 'sophiebeats@gmail.com', username: 'SOPHIE', password: 'latexhard', info: "Mysterious beat-maker from the nether. \n \n Noises \n Nonsense \n \n I like weird sounds.", image: File.open('app/assets/images/sophie_artwork.jpg'))
grimes = User.create!(num_songs: 3, email: 'grimes@gmail.com', username: 'Grimes', password: 'sogrimey', info: "I make music because i like the way it makes me feel.  I hope you like it as well.  \n new album ART-ANGELS out now!", image: File.open('app/assets/images/g-prof.jpeg'))
franksinatra = User.create!(num_songs: 3, email: 'frank@gmail.com', username: 'Frank Sinatra', password: 'frankies', info: "A tribute profile for one of the greatest entertainers of all time. \n Leader of the Ratpack, and Las Vegas star.  New York, New York, It's a hell of a town!", image: File.open('app/assets/images/frank_sinatra.jpg'))
fugees = User.create!(num_songs: 4, email: 'fugees@gmail.com', username: 'The Fugees', password: 'wyclefftheman', info: "Soulful r&b reggae goodness.  Planning a reunion for anydaynow 20-never", image: File.open('app/assets/images/fugees-profile.jpg'))
pitchslap = User.create!(num_songs: 3, email: 'pitchslap@gmail.com', username: 'Pitchslap', password: 'pitchslap', info: "Potomac, MD to the rest of the world. \n Get ready to dance.", image: File.open('app/assets/images/pitch-slap-prof.jpg'))
whatsonot = User.create!(num_songs: 5, email: 'whatsonot@gmail.com', username: 'What So Not', password: 'whatsonot', info: "Australian beat-making duo.  Flume + Chet Faker.  We tour the world and make you twerk.", image: File.open('app/assets/images/what-so-not-profile.jpg'))
russ = User.create!(num_songs: 3, email: 'russLiq@gmail.com', username: 'Russ Liquid', password: 'russliquid', info: "Funky trumpet player.  Funkytown mayor.", image: File.open('app/assets/images/russ_liquid.jpeg'))
thedude = User.create!(num_songs: 1, email: 'dude_the@hotmail.com', username: 'Lebowski', password: 'dudesauce', info: "Look, let me explain something to you. I'm not Mr. Lebowski. You're Mr. Lebowski. I'm the Dude. So that's what you call me. That, or His Dudeness … Duder … or El Duderino, if, you know, you're not into the whole brevity thing.", image: File.open('app/assets/images/thedude.jpg'))
eveningfools = User.create!(num_songs: 2, email: 'theeveningfools@gmail.com', username: 'The Evening Fools', password: 'foolish1', info: "Go see the four boys in Birmingham, they'll take ya to the hazy sanctuary, for the broken man.", image: File.open('app/assets/images/fools2.jpg'))
dillonf = User.create!(num_songs: 3, email: 'dillonfrancis@hotmail.com', username: 'DJ Hanzel', password: 'dillonfrancis', info: "Burn up the dance.", image: File.open('app/assets/images/dillon-francis.png'))

real_users = [me, darth, bach, bowie, sophie, grimes, franksinatra, fugees, pitchslap, whatsonot, russ, thedude, eveningfools, dillonf]


Song.destroy_all

imperialmarch = Song.create!(user_id: darth.id, username: darth.username, title: "Imperial March", info: "Original music by John Williams.",
audio: File.open('app/assets/audio/songs/Star Wars-Imperial March.mp3'), image: File.open('app/assets/images/vader-army.jpg'))

thunderstorm = Song.create(user_id: guest.id, username: guest.username, title: "Thunder", info: "A frightening thunderstorm!",
  image: File.open('app/assets/images/lightning.jpg'), num_plays: 35)
rain = Song.create(user_id: guest.id, username: guest.username, title: "Mellow Rain", info: "Relax to the calming sounds of the rain.",
  audio: File.open('app/assets/audio/Rain.m4a'), image: File.open('app/assets/images/rain1.jpg'), num_plays: 58)
cloudsounds = Song.create(user_id: guest.id, username: guest.username, title: "Cloud Sounds!", info: "I love cloudy days...",
  audio: File.open('app/assets/audio/Cloud Sounds 2.m4a'), image: File.open('app/assets/images/cloudsclouds.jpg'), num_plays: 42)


# all_songs = [thunderstorm, rain, cloudsounds]

# # RANDOM USERS
i = 0
robo_users = []
while (i < 20)
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
#
#
#
#
#
#
#
#
#
# ### FOLLOWS ###
#
Follow.destroy_all
#
# # CREATE REAL FOLLOWS
i = 0
while (i < real_users.length)
  j = 0
  num_to_follow = Random.rand(10)
  past_follows = []
  while (j < num_to_follow)
    who_to_follow = Random.rand(real_users.length)
    while (past_follows.include?(who_to_follow))
      who_to_follow = Random.rand(real_users.length)
    end
    user = real_users[who_to_follow]
    Follow.create!(user_id: real_users[i].id, followed_id: user.id)
    past_follows.push who_to_follow
    j += 1
  end
  i += 1
end
# #
# # # CREATE GUEST FOLLOWS
f1 = Follow.create!(user_id: guest.id, followed_id: me.id)
f2 = Follow.create!(user_id: guest.id, followed_id: darth.id)
f3 = Follow.create!(user_id: guest.id, followed_id: bach.id)
f4 = Follow.create!(user_id: guest.id, followed_id: pitchslap.id)
f5 = Follow.create!(user_id: guest.id, followed_id: dillonf.id)
f6 = Follow.create!(user_id: guest.id, followed_id: whatsonot.id)

#
# # # CREATE ROBO FOLLOWS
real_and_guest_users = real_users + [guest]
i = 0
while (i < robo_users.length)
  j = 0
  num_to_follow = Random.rand(10)
  past_follows = []
  while (j < num_to_follow)
    who_to_follow = Random.rand(real_and_guest_users.length)
    while (past_follows.include?(who_to_follow))
      who_to_follow = Random.rand(real_and_guest_users.length)
    end
    user = real_and_guest_users[who_to_follow]
    Follow.create!(user_id: robo_users[i].id, followed_id: user.id)
    past_follows.push who_to_follow
    j += 1
  end
  i += 1
end
#
#
#
#
#
#
#
#
#
#
#
#
#
# ### SONGS ###
# #############
#
# # THE DUDE
dude1 = Song.create!(user_id: thedude.id, username: thedude.username, title: 'Blase (Louis the Child Remix)', info: 'Its like, a dope, funky song, man.  Just listen to it, and like, get down.',
   audio: File.open("app/assets/audio/songs/Blase (Louis The Child Remix).m4a"), image: File.open('app/assets/images/dude-music.jpeg'), num_plays: 354)

dude_songs = [dude1]

# # THE EVENING FOOLS
fools1 = Song.create!(user_id: eveningfools.id, username: eveningfools.username, title: 'For The Chance', info: "Keep me babe, darlin i got to know ya. And I promise that my love won't be in vain.  I have prayed, over and over, for the chance that we would meet some shiney day. \n Lord I'm on the way.",
   audio: File.open("app/assets/audio/songs/For The Chance.m4a"), image: File.open('app/assets/images/hazy-sanc.jpg'), num_plays: 107)
fools2 = Song.create!(user_id: eveningfools.id, username: eveningfools.username, title: 'Summer Tangerine', info: "She's brightest on the vine, of ruby gold elixer she is made. My summer tangerine, be sweet until the winder come again.",
   audio: File.open("app/assets/audio/songs/Summer Tangerine.m4a"), image: File.open('app/assets/images/hazy-sanc.jpg'), num_plays:88)

fools_songs = [fools1, fools2]

# # DILLON FRANCIS
# dillon1 = Song.create!(user_id: dillonf.id, username: dillonf.username, title: 'Masta Blasta (THE REBIRTH)', info: "Feelin' alright somehow......",
#    audio: File.open("app/assets/audio/songs/Masta Blasta (THE REBIRTH).mp3"), image: File.open('app/assets/images/money-sucks.jpg'), num_plays: 234156)
# dillon2 = Song.create!(user_id: dillonf.id, username: dillonf.username, title: 'Bootleg Fireworks (The Rebirth)', info: "You got me burnin' up!",
#    audio: File.open("app/assets/audio/songs/Bootleg Fireworks (The Rebirth).mp3"), image: File.open('app/assets/images/money-sucks.jpg'), num_plays: 284759)
# dillon3 = Song.create!(user_id: dillonf.id, username: dillonf.username, title: 'Burn Up the Dance', info: "Bu- bu- bu- bu- burn up tha...",
#    audio: File.open("app/assets/audio/songs/Burn Up the Dance.m4a"), image: File.open('app/assets/images/money-sucks.jpg'), num_plays: 87650)
#
# dillon_songs = [dillon3]


#
# # s7 = Song.create!(user_id: bowie.id, username: bowie.username, title: "Ziggy Stardust", info: "We were ziggy's band.")
#
moonlight = Song.create!(user_id: bach.id, username: bach.username, title: "Moonlight Sonata", info: "I wrote this song first.  This is totally not a Beethoven song.",
  audio: File.open('app/assets/audio/songs/Moonlight Sonata 1st Movement.mp3'), image: File.open('app/assets/images/moonlight.jpg'), num_plays: 45)

other_songs = [thunderstorm, rain, cloudsounds, imperialmarch, moonlight]

#
# # RYON LAWFORD SONGS
ryon1 = Song.create!(user_id: me.id, username: me.username, title: "Surrender To The Night", info: "Lyrics by Matty J",
  audio: File.open('app/assets/audio/songs/Surrender To The Night.m4a'), image: File.open('app/assets/images/surrender-to-the-night.jpg'), num_plays: 3778)
ryon2 = Song.create!(user_id: me.id, username: me.username, title: "When Is Love Not Enough", info: "Lyrics and vocals by Cara Onofrio",
  audio: File.open('app/assets/audio/songs/When Is Love Not Enough.m4a'), image: File.open('app/assets/images/when-is-love.jpg'), num_plays: 876)
ryon3 = Song.create!(user_id: me.id, username: me.username, title: "Don't You Worry, Love (Ryon Lawford Remix)", info: "Original by Oh Honey.  Out now on iTunes!",
  audio: File.open("app/assets/audio/songs/Don't You Worry, Love (Ryon Lawford Remix).mp3"), image: File.open('app/assets/images/dont-you-worry-remix.jpg'), num_plays: 2465)
ryon4 = Song.create!(user_id: me.id, username: me.username, title: "Pop That", info: "Featuring Akon and Snoop Dogg",
  audio: File.open('app/assets/audio/songs/Pop That.m4a'), image: File.open('app/assets/images/pop-that.jpg'), num_plays: 245)

ryon_songs = [ryon1, ryon2, ryon3, ryon4]
# ryon_songs = [ryon1]
#
#
# # PITCHSLAP SONGS
pitchslap1 = Song.create!(user_id: pitchslap.id, username: pitchslap.username, title: "Whatcha Done", info: "From the upcoming mixtape LANIAKEA",
  audio: File.open('app/assets/audio/songs/Whatcha Done.mp3'), image: File.open('app/assets/images/pitchslap-art.jpg'), num_plays: 9436)
pitchslap2 = Song.create!(user_id: pitchslap.id, username: pitchslap.username, title: "Painful", info: "From the upcoming mixtape LANIAKEA",
  audio: File.open('app/assets/audio/songs/Painful.mp3'), image: File.open('app/assets/images/pitchslap-art.jpg'), num_plays: 7354)
pitchslap3 = Song.create!(user_id: pitchslap.id, username: pitchslap.username, title: "Take Me Higher", info: "From the upcoming mixtape LANIAKEA",
  audio: File.open('app/assets/audio/songs/Take Me Higher.mp3'), image: File.open('app/assets/images/pitchslap-art.jpg'), num_plays: 13426)

pitchslap_songs = [pitchslap1, pitchslap2, pitchslap3]
# pitchslap_songs = [pitchslap1]
#
#
# # SOPHIE SONGS
sophie1 = Song.create!(user_id: sophie.id, username: sophie.username, title: 'Lemonade', info: "Off the self titled album. \n Also from that McDonalds commercial. \n Lemonade, \n le- le- lemonade.",
  audio: File.open('app/assets/audio/songs/Lemonade.m4a'), image: File.open('app/assets/images/sophie_slide4.jpg'), num_plays: 3562)
sophie2 = Song.create!(user_id: sophie.id, username: sophie.username, title: 'Hard', info: "Off the self titled album. \n Latex gloves go so hard.",
  audio: File.open('app/assets/audio/songs/Hard.m4a'), image: File.open('app/assets/images/sophie_slide2.png'), num_plays: 8574)
sophie3 = Song.create!(user_id: sophie.id, username: sophie.username, title: 'Just Like We Never Said Goodbye', info: "Off the self titled album. \n Remixes coming soon!.",
  audio: File.open('app/assets/audio/songs/Just Like We Never Said Goodbye.m4a'), image: File.open('app/assets/images/sophie_slide3.jpg'), num_plays: 11453)

sophie_songs = [sophie1, sophie2, sophie3]
# sophie_songs = [sophie1]
#
#
# # GRIMES SONGS
grimes1 = Song.create!(user_id: grimes.id, username: grimes.username, title: 'California', info: "From the album ART ANGELS. \n Get it now on iTunes!",
  audio: File.open('app/assets/audio/songs/California.mp3'), image: File.open('app/assets/images/art_angels.jpg'), num_plays: 808797)
grimes2 = Song.create!(user_id: grimes.id, username: grimes.username, title: 'Flesh Without Blood', info: "From the album ART ANGELS. \n Get it now on iTunes!",
  audio: File.open('app/assets/audio/songs/Flesh Without Blood.mp3'), image: File.open('app/assets/images/art_angels.jpg'), num_plays: 1415632)
grimes3 = Song.create!(user_id: grimes.id, username: grimes.username, title: 'Belly of the Beat', info: "From the album ART ANGELS. \n Get it now on iTunes!",
  audio: File.open('app/assets/audio/songs/Belly of the Beat.mp3'), image: File.open('app/assets/images/art_angels.jpg'), num_plays: 778347)

grimes_songs = [grimes1, grimes2, grimes3]
# grimes_songs = [grimes1]
#
#
# # FRANK SONGS
franksinatra1 = Song.create!(user_id: franksinatra.id, username: franksinatra.username, title: "My Way", info: "From the greatest hits album 'Sinatra: Best of the Best'",
  audio: File.open("app/assets/audio/songs/My Way.mp3"), image: File.open('app/assets/images/frank_sinatra.jpg'), num_plays: 875593)
franksinatra2 = Song.create!(user_id: franksinatra.id, username: franksinatra.username, title: "Theme from New York, New York", info: "From the greatest hits album 'Sinatra: Best of the Best'",
  audio: File.open("app/assets/audio/songs/Theme from New York, New York.mp3"), image: File.open('app/assets/images/frank_sinatra.jpg'), num_plays: 14225)
franksinatra3 = Song.create!(user_id: franksinatra.id, username: franksinatra.username, title: "The Way You Look Tonight", info: "From the greatest hits album 'Sinatra: Best of the Best'",
  audio: File.open("app/assets/audio/songs/The Way You Look Tonight.mp3"), image: File.open('app/assets/images/frank_sinatra.jpg'), num_plays: 246328)

franksinatra_songs = [franksinatra1, franksinatra2, franksinatra3]
# franksinatra_songs = [franksinatra1]
#
# # FUGEES SONGS
fugees1 = Song.create!(user_id: fugees.id, username: fugees.username, title: "No Woman, No Cry", info: "The Score was huge in the 90's.  If you haven't listened to it yet, do yourself a favor and go buy it.",
  audio: File.open("app/assets/audio/songs/No Woman, No Cry.mp3"), image: File.open('app/assets/images/fugees-art.jpg'), num_plays: 35667)
fugees2 = Song.create!(user_id: fugees.id, username: fugees.username, title: "Ready or Not", info: "Ready or not, here i come, you can't hide.  I'm gonna fiiiiind you, and. make. you. love. me.",
  audio: File.open("app/assets/audio/songs/Ready or Not.mp3"), image: File.open('app/assets/images/fugees-art.jpg'), num_plays: 6758834)
fugees3 = Song.create!(user_id: fugees.id, username: fugees.username, title: "The Score", info: "Let's settle it.",
  audio: File.open("app/assets/audio/songs/The Score.mp3"), image: File.open('app/assets/images/fugees-art.jpg'), num_plays: 41277)
fugees4 = Song.create!(user_id: fugees.id, username: fugees.username, title: "Killing Me Softly with His Song", info: "Lauren Hill is a goddess",
  audio: File.open("app/assets/audio/songs/Killing Me Softly with His Song.mp3"), image: File.open('app/assets/images/fugees-art.jpg'), num_plays: 1256904)

fugees_songs = [fugees1, fugees2, fugees3, fugees4]
# fugees_songs = [fugees1]
#
# # WHAT SO NOT SONGS
whatsonot1 = Song.create!(user_id: whatsonot.id, username: whatsonot.username, title: "What So Not - Gemini Intro ft. Tunji Ige", info: "GEMINI out now!",
  audio: File.open("app/assets/audio/songs/Gemini Intro ft. Tunji Ige.mp3"), image: File.open('app/assets/images/wsn-gemini.jpg'), num_plays: 56376)
whatsonot2 = Song.create!(user_id: whatsonot.id, username: whatsonot.username, title: "What So Not - Gemini ft. George Maple", info: "GEMINI out now!",
  audio: File.open("app/assets/audio/songs/Gemini ft. George Maple.mp3"), image: File.open('app/assets/images/wsn-gemini.jpg'), num_plays: 53076)
whatsonot3 = Song.create!(user_id: whatsonot.id, username: whatsonot.username, title: "What So Not X Dillon Francis - Arrows ft. Dawn Golden", info: "GEMINI out now!",
  audio: File.open("app/assets/audio/songs/Arrows ft. Dawn Golden.mp3"), image: File.open('app/assets/images/wsn-gemini.jpg'), num_plays: 153765)
whatsonot4 = Song.create!(user_id: whatsonot.id, username: whatsonot.username, title: "What So Not - Death Drive ft. KLP", info: "GEMINI out now!",
  audio: File.open("app/assets/audio/songs/Death Drive ft. KLP.mp3"), image: File.open('app/assets/images/wsn-gemini.jpg'), num_plays: 86723)
whatsonot5 = Song.create!(user_id: whatsonot.id, username: whatsonot.username, title: "What So Not - Oddity", info: "GEMINI out now!",
  audio: File.open("app/assets/audio/songs/Oddity.mp3"), image: File.open('app/assets/images/wsn-gemini.jpg'), num_plays: 11298)

whatsonot_songs = [whatsonot1, whatsonot2, whatsonot3, whatsonot4, whatsonot5]
# whatsonot_songs = [whatsonot1]
#
# # RUSS LIQUID
russ1 = Song.create!(user_id: russ.id, username: russ.username, title: "Alpha Bravo Echo Zulu", info: "Download FOREIGN FREQUENCY album now for free!",
  audio: File.open("app/assets/audio/songs/Alpha Bravo Echo Zulu.mp3"), image: File.open('app/assets/images/russ_liquid.jpeg'), num_plays: 875)
russ2 = Song.create!(user_id: russ.id, username: russ.username, title: "Welcome", info: "Download FOREIGN FREQUENCY album now for free!",
  audio: File.open("app/assets/audio/songs/Welcome.mp3"), image: File.open('app/assets/images/russ_liquid.jpeg'), num_plays: 1254)
russ3 = Song.create!(user_id: russ.id, username: russ.username, title: "Euqsom", info: "Download FOREIGN FREQUENCY album now for free!",
  audio: File.open("app/assets/audio/songs/Euqsom.mp3"), image: File.open('app/assets/images/russ_liquid.jpeg'), num_plays: 936)

russ_songs = [russ1, russ2, russ3]
# russ_songs = [russ1]
#
# # ALL SONGS
#

all_songs =  dude_songs + fools_songs + other_songs + ryon_songs + pitchslap_songs + sophie_songs + grimes_songs + franksinatra_songs + fugees_songs + whatsonot_songs + russ_songs
#
#



























#
#
#
#
# ### LIKES ###
# #############
#
Like.destroy_all
#
# # CREATE REAL LIKES
#
i = 0
while (i < real_users.length)
  j = 0
  num_to_like = Random.rand(10)
  past_likes = []
  while (j < num_to_like)
    what_to_like = Random.rand(all_songs.length)
    while (past_likes.include?(what_to_like))
      what_to_like = Random.rand(all_songs.length)
    end
    song = all_songs[what_to_like]
    Like.create!(user_id: real_users[i].id, song_id: song.id)
    past_likes.push(what_to_like)
    j += 1
  end
  i += 1
end
#
#
# # CREATE ROBO LIKES
#
i = 0
while (i < robo_users.length)
  j = 0
  num_to_like = Random.rand(15)
  past_likes = []
  while (j < num_to_like)
    what_to_like = Random.rand(all_songs.length)
    while (past_likes.include?(what_to_like))
      what_to_like = Random.rand(all_songs.length)
    end
    song = all_songs[what_to_like]
    Like.create!(user_id: robo_users[i].id, song_id: song.id)
    past_likes.push(what_to_like)
    j += 1
  end
  i += 1
end
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
#
# ### COMMENTS ###
# ################
#
Comment.destroy_all
# #
# # # CREATE ROBO COMMENTS
# #
robo_users.each do |user|
  j = 0
  num_to_comment = Random.rand(5)
  while (j < num_to_comment)
    where_to_comment = Random.rand(all_songs.length)
    song = all_songs[where_to_comment]
    Comment.create!(user_id: user.id, song_id: song.id, body: Faker::Hipster.sentence)
    j += 1
  end
end
#
# # CREATE REAL COMMENTS
#
c1 = Comment.create!(user_id: guest.id, song_id: grimes1.id, body: "awesome song!")
Comment.create!(user_id: fugees.id, song_id: franksinatra2.id, body: "classic album")
c3 = Comment.create!(user_id: guest.id, song_id: imperialmarch.id, body: "oh no! the clone army!")
c5 = Comment.create!(user_id: bowie.id, song_id: pitchslap2.id, body: "wow!")
Comment.create!(user_id: russ.id, song_id: whatsonot2.id, body: "wow!")
Comment.create!(user_id: grimes.id, song_id: moonlight.id, body: "amazing.")
c8 = Comment.create!(user_id: bowie.id, song_id: ryon2.id, body: "when's the album coming out?")
c9 = Comment.create!(user_id: darth.id, song_id: ryon1.id, body: "terrible")
Comment.create!(user_id: dillonf.id, song_id: dude1.id, body: "YEAH DUDE!")
c15 = Comment.create!(user_id: me.id, song_id: grimes1.id, body: "when can i get this on itunes?")
c10 = Comment.create!(user_id: darth.id, song_id: moonlight.id, body: "awful")
Comment.create!(user_id: pitchslap.id, song_id: imperialmarch.id, body: "run for your lives!")
c12 = Comment.create!(user_id: darth.id, song_id: whatsonot1.id, body: "lackluster performance")
c4 = Comment.create!(user_id: guest.id, song_id: pitchslap3.id, body: "awesome song!")
c14 = Comment.create!(user_id: me.id, song_id: whatsonot4.id, body: "come play a show in NY!")
c6 = Comment.create!(user_id: bowie.id, song_id: whatsonot4.id, body: "great job with this one!")
c21 = Comment.create!(user_id: bach.id, song_id: ryon3.id, body: "on second thought, i rather enjoy the groove of this piece.")
Comment.create!(user_id: eveningfools.id, song_id: ryon1.id, body: "i don't know what to do here")
Comment.create!(user_id: grimes.id, song_id: franksinatra1.id, body: "i can't get enough of this album!")
Comment.create!(user_id: russ.id, song_id: pitchslap1.id, body: "one of my favorites!")
Comment.create!(user_id: thedude.id, song_id: fools1.id, body: "this is my jam!")
Comment.create!(user_id: grimes.id, song_id: whatsonot2.id, body: "oh i love this one!")
Comment.create!(user_id: dillonf.id, song_id: fools2.id, body: "i can't dance to it, but i like it")
c13 = Comment.create!(user_id: darth.id, song_id: grimes2.id, body: "this must be a joke, right?")
Comment.create!(user_id: eveningfools.id, song_id: dude1.id, body: "dude you done it again!")
Comment.create!(user_id: fugees.id, song_id: imperialmarch.id, body: "woah")
c2 = Comment.create!(user_id: guest.id, song_id: whatsonot3.id, body: "i love this part")
Comment.create!(user_id: fugees.id, song_id: grimes3.id, body: "love this album, girl!")
Comment.create!(user_id: sophie.id, song_id: fugees3.id, body: "amazing song and album")
Comment.create!(user_id: grimes.id, song_id: whatsonot1.id, body: "you guys rock!")
c11 = Comment.create!(user_id: darth.id, song_id: pitchslap3.id, body: "a jedi must have made this. horrible.")
Comment.create!(user_id: dillonf.id, song_id: whatsonot3.id, body: "this song is terrible!")
Comment.create!(user_id: sophie.id, song_id: imperialmarch.id, body: "uh oh")
Comment.create!(user_id: thedude.id, song_id: thunderstorm.id, body: "wooooaaaaaa")
Comment.create!(user_id: pitchslap.id, song_id: grimes1.id, body: "you guys rock!")
Comment.create!(user_id: pitchslap.id, song_id: russ1.id, body: "oh man it doesn't get much funkier")
Comment.create!(user_id: eveningfools.id, song_id: thunderstorm.id, body: "sounds like the hazy sanctuary")
Comment.create!(user_id: russ.id, song_id: grimes1.id, body: "this chick is incredible")
Comment.create!(user_id: grimes.id, song_id: ryon3.id, body: "cool!")
Comment.create!(user_id: thedude.id, song_id: grimes3.id, body: "oh man, this chick rocks, man!")
c19 = Comment.create!(user_id: bach.id, song_id: fugees1.id, body: "quite elementary")
Comment.create!(user_id: thedude.id, song_id: ryon2.id, body: "this guys got some style man")
Comment.create!(user_id: eveningfools.id, song_id: pitchslap3.id, body: "could use more banjo")
Comment.create!(user_id: thedude.id, song_id: pitchslap3.id, body: "i could, like, party to this, yknow?")
Comment.create!(user_id: thedude.id, song_id: franksinatra2.id, body: "this song, is like, rad")
Comment.create!(user_id: grimes.id, song_id: whatsonot5.id, body: "funky!")
Comment.create!(user_id: dillonf.id, song_id: ryon3.id, body: "oh gimme da bassssss")
Comment.create!(user_id: sophie.id, song_id: whatsonot1.id, body: "funky funky funky funky!")
Comment.create!(user_id: dillonf.id, song_id: pitchslap3.id, body: "DJ Hanzel approves.")
Comment.create!(user_id: russ.id, song_id: ryon1.id, body: "so good")
Comment.create!(user_id: sophie.id, song_id: russ2.id, body: "ooooo love the trumpet")
Comment.create!(user_id: dillonf.id, song_id: fools1.id, body: "needs more BASS")
Comment.create!(user_id: grimes.id, song_id: pitchslap2.id, body: "i just got pitchslapped!")
Comment.create!(user_id: eveningfools.id, song_id: whatsonot4.id, body: "yes yes yes")
Comment.create!(user_id: eveningfools.id, song_id: ryon2.id, body: "oh what a jam!")
Comment.create!(user_id: pitchslap.id, song_id: whatsonot2.id, body: "dude your music is amazing!")
Comment.create!(user_id: eveningfools.id, song_id: imperialmarch.id, body: "wtf man")
Comment.create!(user_id: thedude.id, song_id: cloudsounds.id, body: "mellow")




# PLAYLISTS

Playlist.destroy_all
PlaylistItem.destroy_all

p1 = Playlist.create!(user_id: guest.id, title: 'You guest it!')
p1a = PlaylistItem.create!(playlist_id: p1.id, song_id: franksinatra1.id, song_ord: 0)
p1b = PlaylistItem.create!(playlist_id: p1.id, song_id: grimes1.id, song_ord: 1)
p1c = PlaylistItem.create!(playlist_id: p1.id, song_id: fugees1.id, song_ord: 2)
p1d = PlaylistItem.create!(playlist_id: p1.id, song_id: moonlight.id, song_ord: 3)
p1e = PlaylistItem.create!(playlist_id: p1.id, song_id: russ1.id, song_ord: 4)

p2 = Playlist.create!(user_id: guest.id, title: 'Electro party music')
p2a = PlaylistItem.create!(playlist_id: p2.id, song_id: whatsonot1.id, song_ord: 0)
p2b = PlaylistItem.create!(playlist_id: p2.id, song_id: ryon1.id, song_ord: 1)
p2c = PlaylistItem.create!(playlist_id: p2.id, song_id: pitchslap1.id, song_ord: 2)

p3 = Playlist.create!(user_id: sophie.id, title: 'SOPHIE')
p3a = PlaylistItem.create!(playlist_id: p3.id, song_id: sophie1.id, song_ord: 0)
p3b = PlaylistItem.create!(playlist_id: p3.id, song_id: sophie2.id, song_ord: 1)
p3c = PlaylistItem.create!(playlist_id: p3.id, song_id: sophie3.id, song_ord: 2)

p4 = Playlist.create!(user_id: grimes.id, title: 'Art Angels')
PlaylistItem.create!(playlist_id: p4.id, song_id: grimes1.id, song_ord: 0)
PlaylistItem.create!(playlist_id: p4.id, song_id: grimes2.id, song_ord: 1)
PlaylistItem.create!(playlist_id: p4.id, song_id: grimes3.id, song_ord: 2)

p6 = Playlist.create!(user_id: whatsonot.id, title: 'Gemini')
PlaylistItem.create!(playlist_id: p6.id, song_id: whatsonot1.id, song_ord: 0)
PlaylistItem.create!(playlist_id: p6.id, song_id: whatsonot2.id, song_ord: 1)
PlaylistItem.create!(playlist_id: p6.id, song_id: whatsonot3.id, song_ord: 2)
PlaylistItem.create!(playlist_id: p6.id, song_id: whatsonot4.id, song_ord: 3)
PlaylistItem.create!(playlist_id: p6.id, song_id: whatsonot5.id, song_ord: 4)
