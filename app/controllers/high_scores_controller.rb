class HighScoresController < ApplicationController
  def index
    @high_scores = HighScore.order(:points => :desc)
  end
end
