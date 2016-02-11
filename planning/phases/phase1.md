### Phase 1: User Authentication ###
####################################

### MODELS

# User model
  - validations:  email, username, password, session-token, PRESENCE
                  email, username, UNIQUE
  - associations: HAS_MANY songs, DD
                  HAS_ONE profile_picture, header_picture as imageable, DD

# Song model
  - validations:  user_id, title, body, audio, PRESENCE
  - associations: BELONGS_TO user
                  HAS_ONE imageable as imageable DD

# Image model
  - validations:  imageable_id, imageable_type, url/blob, PRESENCE
                  imageable_id, UNIQUE TRUE IN imageable_type USER
  - associations  BELONGS_TO imageable, polymorphic: true


### CONTROLLERS

# sessions controller
  - routes:       new, create, destroy

# users controller
  - routes:       new, create, show, edit, update, destroy

# songs controller
  - routes:       new, create, show, edit, update, destroy
                  index [under user]

# images controller
  - routes:       create, edit, update (under user)


### VIEWS
  - users/new.html.erb
  - session/new.html.erb (modal)
  - users/show.json.jbuilder
  - songs/show.json.jbuilder

  - root page: '/session/new'
  - signed-in root page: 'staticpages.html.erb' (with current user profile page rendered)


### REACT / FLUX

# COMPONENTS
  - userProfile
    - userInfo
    - userCatalog
  - songUploader
  - audioPlayer (different components for different looks?)
    - playButton
  - jam_box.jsx

# STORES
  - user_store
  - song_store

# CONSTANTS     
  - user_constants
  - song_constants

# ACTIONS       
  - user_actions
    - updateUser
  - song_actions
    - createSong
    - fetchSingleSong(:song_id)
    - fetchAllUserSongs
    - updateSong(:song_id)
    - destroySong(:song_id)
  - image_actions
    - createImage
    - fetchSongImage(:imageable_id)
    - fetchUserImages(:imageable_id)
    - updateImage(:image_id)
  - api_actions
    - receiveSingleSong
    - receiveAllUserSongs
    - deleteSong
    - receiveImage
    - receiveUserImages
    - deleteImage
    - receiveUser

# UTILS         
  - api_utils
    - createSong
    - fetchSingleSong(:song_id)
    - fetchAllUserSongs
    - updateSong(:song_id)
    - destroySong(:song_id)
    - createImage
    - fetchSongImage(:imageable_id)
    - fetchUserImages(:imageable_id)
    - updateImage(:image_id)
  - audio_track

# DISPATCHER
  - dispatcher
