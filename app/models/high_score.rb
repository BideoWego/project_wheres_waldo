class HighScore < ActiveRecord::Base
  TOTAL_POSSIBLE_POINTS = 60 * 60
  

  belongs_to :game


  validates :game,
            :presence => true,
            :uniqueness => true

  validates :username,
            :presence => true

  validates :points,
            :presence => true

  after_initialize :calculate_points
  after_create :update_game
  before_update :deny_modification
  before_destroy :deny_modification




  private
  def calculate_points
    self.points = game.time_remaining unless self.points
  end


  def update_game
    game.update!(
      :ended_at => Time.now,
      :high_score_id => id
    )
  end


  def deny_modification
    errors.add(:base, "A High Score cannot be modified")
    false
  end
end
