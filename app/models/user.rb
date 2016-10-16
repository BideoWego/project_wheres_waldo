class User < ApplicationRecord
  include UniquelyIdentifiable


  has_many :games, :dependent => :destroy
  has_many :tags, :through => :games, :source => :tags
  has_many :high_scores, :through => :games, :source => :high_score


  unique_id_seed :email
  unique_id_attribute :auth_token


  has_secure_password

  validates :email,
            :presence => true,
            :uniqueness => true,
            :format => { :with => /@/ }

  validates :username,
            :presence => true,
            :length => { :in => 8..32 },
            :format => { :with => /\A[\w\d]+\z/ }

  validates :password,
            :length => { :in => 8..32 },
            :format => { :without => /\s/ },
            :allow_nil => true


  before_update :deny_if_guest
  before_destroy :deny_if_guest


  def self.find_by_username_or_email(username_or_email)
    User.where(
      'email = ? OR username = ?',
      username_or_email,
      username_or_email
    ).first
  end




  private
  def deny_if_guest
    is_guest = username == 'guest'
    if is_guest
      errors.add(:base, 'Cannot alter guest user')
    end
    !is_guest
  end
end

