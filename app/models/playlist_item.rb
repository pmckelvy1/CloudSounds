class PlaylistItem < ActiveRecord::Base
  validates :song_id, :playlist_id, :song_ord, presence: true
  validates :song_ord, uniqueness: { scope: :playlist_id }

  belongs_to :song
  belongs_to :playlist
end
