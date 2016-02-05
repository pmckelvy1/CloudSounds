require 'open-uri'





### USERS ###
#############

User.destroy_all

# ARTISTS
guest = User.create!(num_songs: 1, email: 'guest_user@guest.com', username: 'Guest', password: 'guest_password', info: "This is a guest account.", image: File.open('app/assets/images/guest_pic.jpg'))
me = User.create!(num_songs: 4, email: 'ryonlawford@gmail.com', username: 'Ryon Lawford', password: 'jamboxcool', info: "Electrified Dancing Musician", image: File.open('app/assets/images/ryon-lawford-profile.jpeg'))
darth = User.create!(num_songs: 1, email: 'darth_vader@gmail.com', username: 'Darth Vader', password: 'starwars', info: "Leader of the Imperial Army, Dark Lord, and Sith Master", image: File.open('app/assets/images/vader.jpg'))
bach = User.create!(num_songs: 1, email: 'johansebass@gmail.com', username: 'Bach', password: 'classical', info: "I play piano.  I also crochet.", image: File.open('app/assets/images/bach_shades.jpg'))
bowie = User.create!(num_songs: 0, email: 'dbowie@gmail.com', username: 'David Bowie', password: 'ziggystardust', info: "Call me ziggy.", image: File.open('app/assets/images/bowie.jpg'))
sophie = User.create!(num_songs: 3, email: 'sophiebeats@gmail.com', username: 'SOPHIE', password: 'latexhard', info: "Mysterious beat-maker from the nether. \n \n Noises \n Nonsense \n \n I like weird sounds.", image: File.open('app/assets/images/sophie_artwork.jpg'))
grimes = User.create!(num_songs: 3, email: 'grimes@gmail.com', username: 'Grimes', password: 'sogrimey', info: "I make music because i like the way it makes me feel.  I hope you like it as well.  \n new album ART-ANGELS out now!", image: File.open('app/assets/images/grimes_prof.jpg'))
franksinatra = User.create!(num_songs: 3, email: 'frank@gmail.com', username: 'Frank Sinatra', password: 'frankies', info: "A tribute profile for one of the greatest entertainers of all time. \n Leader of the Ratpack, and Las Vegas star.  New York, New York, It's a hell of a town!", image: File.open('app/assets/images/frank_sinatra.jpg'))
fugees = User.create!(num_songs: 4, email: 'fugees@gmail.com', username: 'The Fugees', password: 'wyclefftheman', info: "Soulful r&b reggae goodness.  Planning a reunion for anydaynow 20-never", image: File.open('app/assets/images/fugees-profile.jpg'))
# kasbo = User.create!(num_songs: 3, email: 'kasbo@gmail.com', username: 'Kasbo', password: 'password', info: "I think i can i think i can i think i can i think i can.", image: File.open('app/assets/images/kasbo_profile.jpeg'))
# galantis = User.create!(num_songs: 0, email: 'galantis@gmail.com', username: 'Galantis', password: 'catsandcats', info: "App Academy's favorite EDM artist.  Why?  Cats. Thats why.", image: File.open('app/assets/images/galantis_profile.jpg'))
pitchslap = User.create!(num_songs: 3, email: 'pitchslap@gmail.com', username: 'Pitchslap', password: 'pitchslap', info: "Potomac, MD to the rest of the world. \n Get ready to dance.", image: File.open('app/assets/images/pitch-slap-prof.jpg'))
whatsonot = User.create!(num_songs: 5, email: 'whatsonot@gmail.com', username: 'What So Not', password: 'whatsonot', info: "Australian beat-making duo.  Flume + Chet Faker.  We tour the world and make you twerk.", image: File.open('app/assets/images/what-so-not-profile.jpg'))
russ = User.create!(num_songs: 3, email: 'russLiq@gmail.com', username: 'Russ Liquid', password: 'russliquid', info: "Funky trumpet player.  Funkytown mayor.", image: File.open('app/assets/images/russ_liquid.jpeg'))

real_users = [me, darth, bach, bowie, sophie, grimes, franksinatra, fugees, pitchslap, whatsonot, russ]




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









### FOLLOWS ###

Follow.destroy_all

# CREATE REAL FOLLOWS
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

# CREATE GUEST FOLLOWS
f1 = Follow.create!(user_id: guest.id, followed_id: me.id)
f2 = Follow.create!(user_id: guest.id, followed_id: darth.id)
f3 = Follow.create!(user_id: guest.id, followed_id: bach.id)
f4 = Follow.create!(user_id: guest.id, followed_id: pitchslap.id)


# CREATE ROBO FOLLOWS
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













### SONGS ###
#############

Song.destroy_all

thunderstorm = Song.create(user_id: guest.id, username: guest.username, title: "Cloud Sounds!", info: "Relax to a thunderstorm.",
  image: File.open('app/assets/images/lightning.jpg'))

imperialmarch = Song.create!(user_id: darth.id, username: darth.username, title: "Imperial March", info: "Original music by John Williams.",
  audio: File.open('app/assets/audio/Star Wars-Imperial March.mp3'), image: File.open('app/assets/images/vader-army.jpg'))
# s7 = Song.create!(user_id: bowie.id, username: bowie.username, title: "Ziggy Stardust", info: "We were ziggy's band.")

moonlight = Song.create!(user_id: bach.id, username: bach.username, title: "Moonlight Sonata", info: "I wrote this song first.  This is totally not a Beethoven song.",
  audio: File.open('app/assets/audio/Moonlight Sonata 1st Movement.mp3'), image: File.open('app/assets/images/moonlight.jpg'))

other_songs = [thunderstorm, imperialmarch, moonlight]


# RYON LAWFORD SONGS
ryon1 = Song.create!(user_id: me.id, username: me.username, title: "Surrender To The Night", info: "Lyrics by Matty J",
  audio: File.open('app/assets/audio/Surrender To The Night.m4a'), image: File.open('app/assets/images/surrender-to-the-night.jpg'), num_plays: 3778)
ryon2 = Song.create!(user_id: me.id, username: me.username, title: "When Is Love Not Enough", info: "Lyrics and vocals by Cara Onofrio",
  audio: File.open('app/assets/audio/When Is Love Not Enough.m4a'), image: File.open('app/assets/images/when-is-love.jpg'), num_plays: 876)
ryon3 = Song.create!(user_id: me.id, username: me.username, title: "Don't You Worry, Love (Ryon Lawford Remix)", info: "Original by Oh Honey.  Out now on iTunes!",
  audio: File.open("app/assets/audio/Don't You Worry, Love (Ryon Lawford Remix).mp3"), image: File.open('app/assets/images/dont-you-worry-remix.jpg'), num_plays: 29465)
ryon4 = Song.create!(user_id: me.id, username: me.username, title: "Pop That", info: "Featuring Akon and Snoop Dogg",
  audio: File.open('app/assets/audio/Pop That.m4a'), image: File.open('app/assets/images/pop-that.jpg'), num_plays: 245)

ryon_songs = [ryon1, ryon2, ryon3, ryon4]


# PITCHSLAP SONGS
pitchslap1 = Song.create!(user_id: pitchslap.id, username: pitchslap.username, title: "Whatcha Done", info: "From the upcoming mixtape LANIAKEA",
  audio: File.open('app/assets/audio/Whatcha Done.mp3'), image: File.open('app/assets/images/pitchslap-art.jpg'), num_plays: 9436)
pitchslap2 = Song.create!(user_id: pitchslap.id, username: pitchslap.username, title: "Painful", info: "From the upcoming mixtape LANIAKEA",
  audio: File.open('app/assets/audio/Painful.mp3'), image: File.open('app/assets/images/pitchslap-art.jpg'), num_plays: 7354)
pitchslap3 = Song.create!(user_id: pitchslap.id, username: pitchslap.username, title: "Take Me Higher", info: "From the upcoming mixtape LANIAKEA",
  audio: File.open('app/assets/audio/Take Me Higher.mp3'), image: File.open('app/assets/images/pitchslap-art.jpg'), num_plays: 13426)

pitchslap_songs = [pitchslap1, pitchslap2, pitchslap3]


# SOPHIE SONGS
sophie1 = Song.create!(user_id: sophie.id, username: sophie.username, title: 'Lemonade', info: "Off the self titled album. \n Also from that McDonalds commercial. \n Lemonade, \n le- le- lemonade.",
  audio: File.open('app/assets/audio/Lemonade.m4a'), image: File.open('app/assets/images/sophie_slide1.jpg'), num_plays: 3562)
sophie2 = Song.create!(user_id: sophie.id, username: sophie.username, title: 'Hard', info: "Off the self titled album. \n Latex gloves go so hard.",
  audio: File.open('app/assets/audio/Hard.m4a'), image: File.open('app/assets/images/sophie_slide2.png'), num_plays: 8574)
sophie3 = Song.create!(user_id: sophie.id, username: sophie.username, title: 'Just Like We Never Said Goodbye', info: "Off the self titled album. \n Remixes coming soon!.",
  audio: File.open('app/assets/audio/Just Like We Never Said Goodbye.m4a'), image: File.open('app/assets/images/sophie_slide3.jpg'), num_plays: 11453)

sophie_songs = [sophie1, sophie2, sophie3]


# GRIMES SONGS
grimes1 = Song.create!(user_id: grimes.id, username: grimes.username, title: 'California', info: "From the album ART ANGELS. \n Get it now on iTunes!",
  audio: File.open('app/assets/audio/California.mp3'), image: File.open('app/assets/images/art_angels.jpg'), num_plays: 808797)
grimes2 = Song.create!(user_id: grimes.id, username: grimes.username, title: 'Flesh Without Blood', info: "From the album ART ANGELS. \n Get it now on iTunes!",
  audio: File.open('app/assets/audio/Flesh Without Blood.mp3'), image: File.open('app/assets/images/art_angels.jpg'), num_plays: 1415632)
grimes3 = Song.create!(user_id: grimes.id, username: grimes.username, title: 'Belly of the Beat', info: "From the album ART ANGELS. \n Get it now on iTunes!",
  audio: File.open('app/assets/audio/Belly of the Beat.mp3'), image: File.open('app/assets/images/art_angels.jpg'), num_plays: 778347)

grimes_songs = [grimes1, grimes2, grimes3]

# GALANTIS SONGS
# galantis1 = Song.create!(user_id: galantis.id, username: galantis.username, title: "Dancin' To the Sound of a Broken Heart", info: "From the album PHARMACY. \n Get it now on iTunes!",
#   audio: File.open("app/assets/audio/Dancin' To the Sound of a Broken Heart.m4a"), image: File.open('app/assets/images/art_angels.jpg'), num_plays: 1553632)
# galantis2 = Song.create!(user_id: galantis.id, username: galantis.username, title: 'Forever Tonight', info: "From the album PHARMACY. \n Get it now on iTunes!",
#   audio: File.open('app/assets/audio/Forever Tonight.m4a'), image: File.open('app/assets/images/art_angels.jpg'), num_plays: 895764)
# galantis3 = Song.create!(user_id: galantis.id, username: galantis.username, title: 'Runaway (U & I)', info: "From the album PHARMACY. \n Get it now on iTunes!",
#   audio: File.open('app/assets/audio/Runaway (U & I).m4a'), image: File.open('app/assets/images/art_angels.jpg'), num_plays: 2786900)
# galantis4 = Song.create!(user_id: galantis.id, username: galantis.username, title: 'Louder, Harder, Better', info: "From the album PHARMACY. \n Get it now on iTunes!",
#   audio: File.open('app/assets/audio/Louder, Harder, Better.m4a'), image: File.open('app/assets/images/art_angels.jpg'), num_plays: 987005)
# galantis5 = Song.create!(user_id: galantis.id, username: galantis.username, title: 'In My Head', info: "From the album PHARMACY. \n Get it now on iTunes!",
#   audio: File.open('app/assets/audio/In My Head.m4a'), image: File.open('app/assets/images/art_angels.jpg'), num_plays: 752678)
# galantis6 = Song.create!(user_id: galantis.id, username: galantis.username, title: 'Gold Dust', info: "From the album PHARMACY. \n Get it now on iTunes!",
#   audio: File.open('app/assets/audio/Gold Dust.m4a'), image: File.open('app/assets/images/art_angels.jpg'), num_plays: 845553)

# galantis_songs = [galantis1, galantis2, galantis3, galantis4, galantis5, galantis6]

# KASBO SONGS
# kasbo1 = Song.create!(user_id: kasbo.id, username: kasbo.username, title: "I Don't Get", info: "UMBRELLA CLUP EP out now.",
#   audio: File.open("app/assets/audio/I Don't Get.mp3"), image: File.open('app/assets/images/kasbo_kalide.jpg'), num_plays: 35664)
# kasbo1 = Song.create!(user_id: kasbo.id, username: kasbo.username, title: "There's Something About U", info: "UMBRELLA CLUP EP out now.",
#   audio: File.open("app/assets/audio/There's Something About U.mp3"), image: File.open('app/assets/images/kasbo_kalide.jpg'), num_plays: 56227)
# kasbo1 = Song.create!(user_id: kasbo.id, username: kasbo.username, title: "The Tension", info: "UMBRELLA CLUP EP out now.",
#   audio: File.open("app/assets/audio/The Tension.mp3"), image: File.open('app/assets/images/kasbo_kalide.jpg'), num_plays: 39525)
#
# kasbo_songs = [kasbo1, kasbo2, kasbo3]

# FRANK SONGS
franksinatra1 = Song.create!(user_id: franksinatra.id, username: franksinatra.username, title: "My Way", info: "From the greatest hits album 'Sinatra: Best of the Best'",
  audio: File.open("app/assets/audio/My Way.mp3"), image: File.open('app/assets/images/frank_sinatra.jpg'), num_plays: 875593)
# franksinatra2 = Song.create!(user_id: franksinatra.id, username: franksinatra.username, title: "Theme from New York, New York", info: "From the greatest hits album 'Sinatra: Best of the Best'",
#   audio: File.open("app/assets/audio/Theme from New York, New York.mp3"), image: File.open('app/assets/images/frank_sinatra.jpg'), num_plays: 14225)
# franksinatra3 = Song.create!(user_id: franksinatra.id, username: franksinatra.username, title: "The Way You Look Tonight", info: "From the greatest hits album 'Sinatra: Best of the Best'",
#   audio: File.open("app/assets/audio/The Way You Look Tonight.mp3"), image: File.open('app/assets/images/frank_sinatra.jpg'), num_plays: 2446328)

# franksinatra_songs = [franksinatra1, franksinatra2, franksinatra3]
franksinatra_songs = [franksinatra1]

# FUGEES SONGS
fugees1 = Song.create!(user_id: fugees.id, username: fugees.username, title: "No Woman, No Cry", info: "The Score was huge in the 90's.  If you haven't listened to it yet, do yourself a favor and go buy it.",
  audio: File.open("app/assets/audio/No Woman, No Cry.mp3"), image: File.open('app/assets/images/fugees-art.jpg'), num_plays: 35667)
# fugees2 = Song.create!(user_id: fugees.id, username: fugees.username, title: "Ready or Not", info: "Ready or not, here i come, you can't hide.  I'm gonna fiiiiind you, and. make. you. love. me.",
#   audio: File.open("app/assets/audio/Ready or Not.mp3"), image: File.open('app/assets/images/fugees-art.jpg'), num_plays: 6758834)
# fugees3 = Song.create!(user_id: fugees.id, username: fugees.username, title: "The Score", info: "Let's settle it.",
#   audio: File.open("app/assets/audio/The Score.mp3"), image: File.open('app/assets/images/fugees-art.jpg'), num_plays: 41277)
# fugees4 = Song.create!(user_id: fugees.id, username: fugees.username, title: "Killing Me Softly with His Song", info: "Lauren Hill is a goddess",
#   audio: File.open("app/assets/audio/Killing Me Softly with His Song.mp3"), image: File.open('app/assets/images/fugees-art.jpg'), num_plays: 1256904)

# fugees_songs = [fugees1, fugees2, fugees3, fugees4]
fugees_songs = [fugees1]

# WHAT SO NOT SONGS
whatsonot1 = Song.create!(user_id: whatsonot.id, username: whatsonot.username, title: "What So Not - Gemini Intro ft. Tunji Ige", info: "GEMINI out now!",
  audio: File.open("app/assets/audio/Gemini Intro ft. Tunji Ige.mp3"), image: File.open('app/assets/images/what-so-not-gemini.jpg'), num_plays: 56376)
# whatsonot2 = Song.create!(user_id: whatsonot.id, username: whatsonot.username, title: "What So Not - Gemini ft. George Maple", info: "GEMINI out now!",
#   audio: File.open("app/assets/audio/Gemini ft. George Maple.mp3"), image: File.open('app/assets/images/what-so-not-gemini.jpg'), num_plays: 53076)
# whatsonot3 = Song.create!(user_id: whatsonot.id, username: whatsonot.username, title: "What So Not X Dillon Francis - Arrows ft. Dawn Golden", info: "GEMINI out now!",
#   audio: File.open("app/assets/audio/Arrows ft. Dawn Golden.mp3"), image: File.open('app/assets/images/what-so-not-gemini.jpg'), num_plays: 153765)
# whatsonot4 = Song.create!(user_id: whatsonot.id, username: whatsonot.username, title: "What So Not - Death Drive ft. KLP", info: "GEMINI out now!",
#   audio: File.open("app/assets/audio/Death Drive ft. KLP.mp3"), image: File.open('app/assets/images/what-so-not-gemini.jpg'), num_plays: 86723)
# whatsonot5 = Song.create!(user_id: whatsonot.id, username: whatsonot.username, title: "What So Not - Oddity", info: "GEMINI out now!",
#   audio: File.open("app/assets/audio/Oddity.mp3"), image: File.open('app/assets/images/what-so-not-gemini.jpg'), num_plays: 11298)

# whatsonot_songs = [whatsonot1, whatsonot2, whatsonot3, whatsonot4, whatsonot5]
whatsonot_songs = [whatsonot1]

# RUSS LIQUID
russ1 = Song.create!(user_id: russ.id, username: russ.username, title: "Alpha Bravo Echo Zulu", info: "Download FOREIGN FREQUENCY album now for free!",
  audio: File.open("app/assets/audio/Alpha Bravo Echo Zulu.mp3"), image: File.open('app/assets/images/russ_liquid.jpeg'), num_plays: 5375)
# russ2 = Song.create!(user_id: russ.id, username: russ.username, title: "Welcome", info: "Download FOREIGN FREQUENCY album now for free!",
#   audio: File.open("app/assets/audio/Welcome.mp3"), image: File.open('app/assets/images/russ_liquid.jpeg'), num_plays: 3254)
# russ3 = Song.create!(user_id: russ.id, username: russ.username, title: "Euqsom", info: "Download FOREIGN FREQUENCY album now for free!",
#   audio: File.open("app/assets/audio/Euqsom.mp3"), image: File.open('app/assets/images/russ_liquid.jpeg'), num_plays: 2436)

# russ_songs = [russ1, russ2, russ3]
russ_songs = [russ1]

# ALL SONGS

all_songs = other_songs + ryon_songs + pitchslap_songs + sophie_songs + grimes_songs + franksinatra_songs + fugees_songs + whatsonot_songs + russ_songs

































### LIKES ###
#############

Like.destroy_all

# CREATE REAL LIKES
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


# CREATE ROBO LIKES

i = 0
while (i < robo_users.length)
  j = 0
  num_to_like = Random.rand(20)
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
















### COMMENTS ###
################

Comment.destroy_all

# CREATE ROBO COMMENTS

robo_users.each do |user|
  j = 0
  num_to_comment = Random.rand(20)
  while (j < num_to_like)
    where_to_comment = Random.rand(all_songs.length)
    song = all_songs[where_to_comment]
    Comment.create!(user_id: user.id, song_id: song.id, body: Faker::Hipster.sentence)
    j += 1
  end
end

# CREATE REAL COMMENTS

c1 = Comment.create!(user_id: guest.id, song_id: grimes1.id, body: "awesome song!")
c2 = Comment.create!(user_id: guest.id, song_id: whatsonot3.id, body: "i love this part")
c3 = Comment.create!(user_id: guest.id, song_id: imperialmarch.id, body: "oh no! the clone army!")
c4 = Comment.create!(user_id: guest.id, song_id: pitchslap3.id, body: "awesome song!")
c5 = Comment.create!(user_id: bowie.id, song_id: pitchslap2.id, body: "wow!")
c6 = Comment.create!(user_id: bowie.id, song_id: whatsonot4.id, body: "great job with this one!")
c8 = Comment.create!(user_id: bowie.id, song_id: ryon2.id, body: "when's the album coming out?")
c9 = Comment.create!(user_id: darth.id, song_id: ryon1.id, body: "terrible")
c10 = Comment.create!(user_id: darth.id, song_id: moonlight.id, body: "awful")
c11 = Comment.create!(user_id: darth.id, song_id: pitchslap3.id, body: "a jedi must have made this. horrible.")
c12 = Comment.create!(user_id: darth.id, song_id: whatsonot1.id, body: "lackluster performance")
c13 = Comment.create!(user_id: darth.id, song_id: grimes2.id, body: "this must be a joke, right?")
c14 = Comment.create!(user_id: me.id, song_id: whatsonot4.id, body: "come play a show in NY!")
c15 = Comment.create!(user_id: me.id, song_id: grimes1.id, body: "when can i get this on itunes?")
c19 = Comment.create!(user_id: bach.id, song_id: fugees1.id, body: "quite elementary")
c21 = Comment.create!(user_id: bach.id, song_id: ryon3.id, body: "on second thought, i rather enjoy the groove of this piece.")
Comment.create!(user_id: grimes.id, song_id: franksinatra1.id, body: "i can't get enough of this album!")
Comment.create!(user_id: grimes.id, song_id: whatsonot1.id, body: "you guys rock!")
Comment.create!(user_id: grimes.id, song_id: whatsonot2.id, body: "oh i love this one!")
Comment.create!(user_id: grimes.id, song_id: whatsonot5.id, body: "funky!")
Comment.create!(user_id: grimes.id, song_id: moonlight.id, body: "amazing.")
Comment.create!(user_id: grimes.id, song_id: ryon3.id, body: "cool!")
Comment.create!(user_id: grimes.id, song_id: pitchslap2.id, body: "i just got pitchslapped!")
Comment.create!(user_id: fugees.id, song_id: imperialmarch.id, body: "woah")
Comment.create!(user_id: fugees.id, song_id: grimes3.id, body: "love this album, girl!")
Comment.create!(user_id: fugees.id, song_id: franksinatra2.id, body: "classic album")
Comment.create!(user_id: sophie.id, song_id: fugees3.id, body: "amazing song and album")
Comment.create!(user_id: sophie.id, song_id: whatsonot1.id, body: "funky funky funky funky!")
Comment.create!(user_id: sophie.id, song_id: russ2.id, body: "ooooo love the trumpet")
Comment.create!(user_id: sophie.id, song_id: imperialmarch.id, body: "uh oh")
Comment.create!(user_id: pitchslap.id, song_id: imperialmarch.id, body: "run for your lives!")
Comment.create!(user_id: pitchslap.id, song_id: grimes1.id, body: "you guys rock!")
Comment.create!(user_id: pitchslap.id, song_id: russ1.id, body: "oh man it doesn't get much funkier")
Comment.create!(user_id: pitchslap.id, song_id: whatsonot2.id, body: "dude your music is amazing!")
Comment.create!(user_id: russ.id, song_id: whatsonot2.id, body: "wow!")
Comment.create!(user_id: russ.id, song_id: ryon1.id, body: "so good")
Comment.create!(user_id: russ.id, song_id: pitchslap1.id, body: "one of my favorites!")
Comment.create!(user_id: russ.id, song_id: grimes1.id, body: "this chick is incredible")
Comment.create!(user_id: russ.id, song_id: imperialmarch.id, body: "where's luke?!")












Playlist.destroy_all
PlaylistItem.destroy_all

p1 = Playlist.create!(user_id: guest.id, title: 'You guest it!')
p1a = PlaylistItem.create!(playlist_id: p1.id, song_id: franksinatra1.id, song_ord: 0)
p1b = PlaylistItem.create!(playlist_id: p1.id, song_id: grimes2.id, song_ord: 1)
p1c = PlaylistItem.create!(playlist_id: p1.id, song_id: fugees2.id, song_ord: 2)
p1d = PlaylistItem.create!(playlist_id: p1.id, song_id: moonlight.id, song_ord: 3)
p1e = PlaylistItem.create!(playlist_id: p1.id, song_id: russ1.id, song_ord: 4)

p2 = Playlist.create!(user_id: guest.id, title: 'Electro party music')
p2a = PlaylistItem.create!(playlist_id: p2.id, song_id: whatsonot5.id, song_ord: 0)
p2b = PlaylistItem.create!(playlist_id: p2.id, song_id: ryon2.id, song_ord: 1)
p2c = PlaylistItem.create!(playlist_id: p2.id, song_id: pitchslap3.id, song_ord: 2)

p3 = Playlist.create!(user_id: sophie.id, title: 'SOPHIE')
p3a = PlaylistItem.create!(playlist_id: p3.id, song_id: sophie1.id, song_ord: 0)
p3b = PlaylistItem.create!(playlist_id: p3.id, song_id: sophie2.id, song_ord: 1)
p3c = PlaylistItem.create!(playlist_id: p3.id, song_id: sophie3.id, song_ord: 2)

p4 = Playlist.create!(user_id: grimes.id, title: 'Art Angels')
PlaylistItem.create!(playlist_id: p4.id, song_id: grimes1.id, song_ord: 0)
PlaylistItem.create!(playlist_id: p4.id, song_id: grimes2.id, song_ord: 1)
PlaylistItem.create!(playlist_id: p4.id, song_id: grimes3.id, song_ord: 2)

# p5 = Playlist.create!(user_id: galantis.id, title: 'Pharmacy')
# PlaylistItem.create!(playlist_id: p5.id, song_id: galantis1)
# PlaylistItem.create!(playlist_id: p5.id, song_id: galantis2)
# PlaylistItem.create!(playlist_id: p5.id, song_id: galantis3)
# PlaylistItem.create!(playlist_id: p5.id, song_id: galantis4)
# PlaylistItem.create!(playlist_id: p5.id, song_id: galantis5)
# PlaylistItem.create!(playlist_id: p5.id, song_id: galantis6)

p6 = Playlist.create!(user_id: whatsonot.id, title: 'Gemini')
PlaylistItem.create!(playlist_id: p6.id, song_id: whatsonot1.id, song_ord: 0)
PlaylistItem.create!(playlist_id: p6.id, song_id: whatsonot2.id, song_ord: 1)
PlaylistItem.create!(playlist_id: p6.id, song_id: whatsonot3.id, song_ord: 2)
PlaylistItem.create!(playlist_id: p6.id, song_id: whatsonot4.id, song_ord: 3)
PlaylistItem.create!(playlist_id: p6.id, song_id: whatsonot5.id, song_ord: 4)
