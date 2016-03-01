class Game < ActiveRecord::Base
  belongs_to :user
  has_one :high_score, :dependent => :nullify
  has_many :tags, :dependent => :destroy

  validates :user,
            :presence => true

  validates :high_score_id,
            :uniqueness => true
end
