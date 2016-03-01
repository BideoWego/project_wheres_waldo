class Character < ActiveRecord::Base
  has_many :tags


  validates :name,
            :presence => true,
            :uniqueness => true


  before_update :deny_modification
  before_destroy :deny_modification




  private
  def deny_modification
    errors.add(:base, "A Where's Waldo Character cannot be modified")
    false
  end
end
