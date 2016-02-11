## users
column name     | data type     | details
----------------|---------------|-----------------------
id              | integer       | not null, primary key
email           | string        | not null, indexed, unique
artist_name     | string        | not null, unique
password_digest | string        | not null
session_token   | string        | not null, indexed, unique
connections     | string (json) |

## songs
column name     | data type     | details
----------------|---------------|-----------------------
id              | integer       | not null, primary key
user_id         | integer       | not null, indexed
audio           | blob          | not null
title           | string        | not null
body            | text          | not null
num_plays       | integer       | default 0
spotlight_ord   | integer       | in [1-5], unique in user_id
downloadable    | boolean       | default false

## images
column name     | data type     | details
----------------|---------------|-----------------------
id              | integer       | not null, primary key
image           | blob (string?)| not null, polymorphic
imageable_id    | integer       | not null, indexed
imageable_type  | string        | not null
header          | boolean       | default false, only true for i_type user, unique true i_id

## likes (join table)
column name     | data type     | details
----------------|---------------|-----------------------
id              | integer       | not null, primary key
user_id         | integer       | not null, indexed, unique in song_id
song_id         | integer       | not null, indexed, unique in user_id

## follows (join table)
column name     | data type     | details
----------------|---------------|-----------------------
id              | integer       | not null, primary key
user_id         | integer       | not null, indexed, unique in followed_id
followed_id     | integer       | not null, indexed, unique in user_id

## comments
column name     | data type     | details
----------------|---------------|-----------------------
id              | integer       | not null, primary key
user_id         | integer       | not null, indexed
song_id         | integer       | not null, indexed
body            | text          | not null
time_stamp      | integer       | not null, indexed

## reposts (join table)
column name     | data type     | details
----------------|---------------|-----------------------
id              | integer       | not null, primary key
user_id         | integer       | not null, indexed, unique in song_id
song_id         | integer       | not null, indexed, unique in user_id

## playlists
column name     | data type     | details
----------------|---------------|-----------------------
id              | integer       | not null, primary key
user_id         | integer       | not null, indexed
title           | string        | not null
description     | text          | not null

## playlist_spots (join table)
column name     | data type     | details
----------------|---------------|-----------------------
id              | integer       | not null, primary key
playlist_id     | integer       | not null, indexed
song_id         | integer       | not null, unique in playlist_id
song_ord        | integer       | not null, unique in playlist_id

## messages
column name     | data type     | details
----------------|---------------|-----------------------
id              | integer       | not null, primary key
user_id         | integer       | not null, indexed
receiver_id     | integer       | not null, indexed
body            | text          | not null
