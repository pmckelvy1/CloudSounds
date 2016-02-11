# Phase 3: User-music interaction

## Models

### Like model
  - validations:  user_id, song_id, PRESENCE, UNIQUENESS
  - associations: BELONGS_TO, user, song

### Repost model
  - validations:  user_id, song_id, PRESENCE, UNIQUENESS
  - associations: BELONGS_TO, user, song

### Comment model
  - validations:  user_id, song_id, body, time_stamp, PRESENCE
  - associations: BELONGS_TO, user, song

### User model
  - associations: HAS_MANY likes
                  HAS_MANY liked_songs THROUGH likes
                  HAS_MANY reposts
                  HAS_MANY reposted_songs THROUGH reposts
                  HAS_MANY comments

### Song model
  - associations: HAS_MANY likes
                  HAS_MANY likers THROUGH likes
                  HAS_MANY reposts
                  HAS_MANY reposters THROUGH reposts
                  HAS_MANY comments
                  HAS_MANY commenters THROUGH comments


## Controllers

### likes controller
  - routes:       create, show [under song]
                  index, destroy

### reposts controller
  - routes:       create [under song]
                  destroy

### comments controller
  - routes:       create, index [under song]
                  destroy

### users controller
  - routes:       show (add INCLUDES (likes, liked_songs, reposted_songs))

### songs controller
  - routes:       show (add INCLUDES (likes, likers, reposts, reposters, comments, commenters))
                  index (add INCLUDES (likes, reposts, comments, commenters))

## Views
  - users/show.json.jbuilder (add likes, reposts)
  - songs/show.json.jbuilder (add comments)

## React / Flux

### Components
  - likeButton
  - likeFeed
  - repostButton
  - commentForm
  - comment
  - commentBarn (displays comments along bottom of audio waveform)
  - commentFeed

### Stores       
  - like_store
  - repost_store
  - comment_store

### Constants     
  - like_constants
  - repost_constants
  - comment_constants

### Actions          
  - like_actions
    - createLike(song_id)
    - destroyLike(like_id)
    - fetchLikes
  - repost_actions
    - createRepost(song_id)
    - destroyRepost(repost_id)
    - fetchReposts
  - comment_actions
    - createComment(song_id, body, time_stamp)
    - destroyComment(comment_id)
  - song_actions
    - fetchAllSongs (for profile page, all user songs and reposts)
  - api_actions
    - receiveLikes
    - receiveReposts
    - receiveComments

### Utils          
  - api_utils
    - createLike(song_id)
    - destroyLike(like_id)
    - fetchLikes
    - createRepost(song_id)
    - destroyRepost(repost_id)
    - fetchReposts
    - createComment(song_id, body, time_stamp)
    - destroyComment(comment_id)
    - fetchAllSongs (for profile page, all user songs and reposts)  
