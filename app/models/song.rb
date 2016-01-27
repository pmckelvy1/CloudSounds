class Song < ActiveRecord::Base
  validates :user_id, :title, :info, presence: true

  belongs_to :user
end
