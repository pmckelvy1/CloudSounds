class PlaylistItem < ActiveRecord::Base
  validates :song_id, :playlist_id, :song_ord, presence: true
  validates :song_ord, uniqueness: { scope: :playlist_id }
  validates :song_id, uniqueness: { scope: :playlist_id }
  validate :one_song_per_user_playlists

  belongs_to :song
  belongs_to :playlist

  private
    def one_song_per_user_playlists
      user_id = playlist.user_id
      user_playlists = Playlist.where(user_id: user_id).includes(:songs)
      user_playlists.each do |plist|
        plist.songs.each do |sng|
          if sng.id == song_id
            errors.add(:song, "cannot be added to multiple user playlists")
            return errors
          end
        end
      end
    end
end
