# CloudSounds

CloudSounds is a music sharing and discovery platform based on the popular website SoundCloud.com.  CloudSounds is built on Ruby on Rails and React.js with Flux.

Live demo: www.cloudsounds.xyz

![user-profile-screenshot](/app/assets/gh-images/user-profile.png "User Profile")


## MVP Features
- users can signup and log in
- users can upload songs to their profile
- uploaded songs can include a title, information, and artwork
- users can play their music and the music of other users
- JamBox is a single-page app, so music does not stop playing as the user navigates
- users can follow other users
- users can like, repost, and comment on other users' songs
- users can create playlists of their or other users' music

## External Libraries
- jQuery
- React with Flux
- Wavesurfer.js
- Font-Awesome
- serializeJSON

## Database
- Postgresql
- Rails / ActiveRecord
- Ajax requests from Javascript frontend
- jBuilder to build nested JSON responses from server
- [Schema](planning/schema.md)

## Implementation Timeline

### [Phase 1](planning/phases/phase1.md): User authentication and basic profile setup (1 day)
Phase 1 will consist of getting basic functionality working for a single user.  This will include signing up with an EMAIL, PASSWORD, and ARTIST-NAME.  Upon signing in, users will land on a basic homepage that will be their profile.

### [Phase 2](planning/phases/phase2.md): Browsing and following other artists (1.5 days)
Phase 2 will consist of building basic interaction between users.  Users will be able to search for and follow other users.  Users will be able to visit the profile pages of other users.  From here on out, the website will be a single-page app.  The log-in landing page will now be a browse/stream page consisting of the music of other artists that the user follows.  Phase 2 will consist mainly of styling the website and getting certain components ready for later functionality, i.e. populating user profiles with dummy images (song artwork) inside audio track boxes that will later house playable audio.

### [Phase 3](planning/phases/phase3.md): Uploads, user-music interaction (2.5 days)
Phase 3 will add music.  Users will be able to upload songs to their profile.  Users will have the option to upload a profile picture, as well as a header picture.  This phase will also consist of implementing functionality to allow users to like, repost, and comment on audio tracks uploaded by other artists.  Users will see the counts of likes and plays on their own profile.  Users will also see the comments left on their songs by other users. Users will be able to listen to their music and the music of other users.  Music will not stop playing as the user browses the website.

### [Phase 4](planning/phases/phase4.md): Playlists (1.5 days)
Phase 4 will consist of giving users the ability to create playlists.  The playlists can consist of their own music, as well as the music of other artists.  The playlists will be ordered by the user.  When a user plays a playlist, it will play all the way through to the end, starting from whatever song the user hit play on.

### EXTRA Phase: Other ideas to implement
** Groups: users can join groups. users can submit music to groups. groups act as a large collaborative playlist of music submitted by different users.
** Social Media: users can add social media links to their profile. simple links are placed on their profile under their user info.
** Downloads: users can allow other users to download their songs.
** Volume: the music player has a volume control slider.
** Private music: users can decide to make their music private or public.
** Spotlight: users can set their spotlight, which is the top 5 tracks on their profile. users can order their top 5 as they see fit.  a users spotlight appears at the top of their profile.
** Playlist Shuffle: users can play a playlist in "shuffle" mode.
** Messaging: users can send private messages to other users and view all messages between themselves and another user in a single thread
