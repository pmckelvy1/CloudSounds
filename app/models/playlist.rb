class Playlist < ActiveRecord::Base
  validates :user_id, :title, :info, presence: true

  belongs_to :user
  has_many :playlist_items
  has_many(
    :songs,
    through: :playlist_items,
    source: :song
  )
end
