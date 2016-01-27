class User < ActiveRecord::Base
  validates :email, :username, :password_digest, :session_token, presence: true
  validates :email, :username, uniqueness: true
  validates :password, length: { minimum: 8, allow_nil: true }

  has_many :follows, dependent: :destroy
  has_many(
    :followed_users,
    through: :follows,
    source: :followed_user
  )

  has_many(
    :followings,
    class_name: "Follow",
    foreign_key: :followed_id,
    primary_key: :id,
    dependent: :destroy
  )
  has_many(
    :following_users,
    through: :followings,
    source: :user
  )

  has_many :songs

  after_initialize :ensure_session_token

  attr_reader :password

  def self.find_by_credentials(email, password)
    @user = User.find_by_email(email)
    return @user if @user
    return nil
  end

  def password=(password)
    @password = password
    self.password_digest = BCrypt::Password.create(password)
  end

  def is_password?(password)
    BCrypt::Password.new(self.password_digest).is_password?(password)
  end

  def reset_session_token!
    self.session_token = SecureRandom.urlsafe_base64
    return self.session_token
  end

  def ensure_session_token
    self.session_token ||= SecureRandom.urlsafe_base64
  end

end
