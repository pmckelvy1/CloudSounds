# Phase 4: Playlists

## Models

### Playlist model
  - validations:  user_id, title, description, PRESENCE
  - associations: HAS_MANY playlist_spots, likes, reposts
                  HAS_MANY songs THROUGH playlist_spots
                  BELONGS_TO user

### Playlist_spot model
  - validations:  playlist_id, song_id, song_ord, PRESENCE
                  song_ord UNIQUE IN playlist_id
                  song_id UNIQUE IN playlist_id
  - associations: BELONGS_TO song, playlist

### User model
  - associations: HAS_MANY playlists
                  HAS_MANY playlist_spots THROUGH playlists
                  HAS_MANY playlisted_songs THROUGH playlist_spots

### Song model
  - associations: HAS_MANY playlist_spots
                  HAS_MANY playlists THROUGH playlist_spots


## Controllers

### playlists controller
  - routes:       create, index (under user)
                  show, edit, update, destroy

### playlist_spots controller
  - routes:       create, update, destroy (under playlist)


## Views
  - /playlists/index.json.jbuilder
  - /playlists/show.json.jbuilder


## React / Flux

### Components  
  - playlist (different components for different looks?)
  - playlistItem

### Stores      
  - playlist_store, (playlist_spot_store?)

### Constants    
  - playlist_constants

### Actions       
  - playlist_actions
    - createPlaylist
    - updatePlaylist
    - destroyPlaylist
    - createPlaylistSpot
    - updatePlaylistSpot
    - destroyPlaylistSpot
    - fetchSinglePlaylist (with all songs)
    - fetchAllPlaylists (with 5 songs and full song count)
  - api_actions
    - receiveSinglePlaylist (with all songs)
    - receiveAllPlaylists (with 5 songs and full song count)

### Utils          
  - api_utils
    - createPlaylist
    - updatePlaylist
    - destroyPlaylist
    - createPlaylistSpot
    - updatePlaylistSpot
    - destroyPlaylistSpot
    - fetchSinglePlaylist (with all songs)
    - fetchAllPlaylists (with 5 songs and full song count)
