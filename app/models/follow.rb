class Follow < ActiveRecord::Base
  validates :user_id, :followed_id, presence: true
  validates :user_id, uniqueness: { scope: :followed_id }
  validates :followed_id, uniqueness: { scope: :user_id }

  belongs_to :user
  belongs_to(
    :followed_user,
    class_name: "User",
    foreign_key: :followed_id,
    primary_key: :id
  )

end
