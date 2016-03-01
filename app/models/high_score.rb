class HighScore < ActiveRecord::Base
  belongs_to :game


  validates :game,
            :presence => true,
            :uniqueness => true

  validates :username,
            :presence => true

  validates :points,
            :presence => true


  before_update :deny_modification
  before_destroy :deny_modification




  private
  def deny_modification
    errors.add(:base, "A High Score cannot be modified")
    false
  end
end
