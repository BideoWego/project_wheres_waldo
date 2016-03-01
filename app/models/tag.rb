class Tag < ActiveRecord::Base
  belongs_to :character
  belongs_to :game

  validates :game,
            :presence => true

  validates :character,
            :presence => true,
            :uniqueness => { :scope => :game_id }

  validates :x,
            :presence => true

  validates :y,
            :presence => true


  before_destroy :deny_if_game_complete




  private
  def deny_if_game_complete
    if game.high_score
      errors.add(:base, 'Cannot modify tag on completed game')
    end
    false
  end
end
