class Song < ActiveRecord::Base
  validates :user_id, :title, :info, presence: true
  has_attached_file :image, default_url: "note.png"
  validates_attachment_content_type :image, content_type: /\Aimage\/.*\Z/

  belongs_to :user
  has_many :likes
  has_many(
    :liking_users,
    through: :likes,
    source: :user
  )

  has_many :comments
end
