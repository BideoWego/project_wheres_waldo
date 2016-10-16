class Game < ApplicationRecord
  belongs_to :user
  has_one :high_score, :dependent => :nullify
  has_many :tags, :dependent => :destroy
  has_many :characters, :through => :tags, :source => :character

  validates :user,
            :presence => true

  validates :high_score_id,
            :uniqueness => true,
            :allow_blank => true

  attr_accessor :total_possible_points

  after_initialize :set_total_possible_points


  def time_remaining
    elapsed = Time.now - created_at
    remaining = HighScore::TOTAL_POSSIBLE_POINTS - elapsed
    remaining > 0 ? remaining.to_i : 0
  end




  private
  def set_total_possible_points
    self.total_possible_points = HighScore::TOTAL_POSSIBLE_POINTS
  end
end
