class HighScoresController < ApplicationController
  before_action :set_game, :only => [:create]
  before_action :require_game_without_high_score, :only => [:create]


  def index
    @high_scores = HighScore.order(:points => :desc)
  end


  def create
    @high_score = @game.build_high_score(high_score_params)
    @high_score.username = current_user.username
    if @high_score.save
      respond_to do |format|
        format.json { render :json => @high_score, :status => 201 }
      end
    else
      error = 'HighScore not created: ' + @high_score.errors.full_messages.join(', ')
      respond_to do |format|
        format.json { render :json => { :error => error }, :status => 422 }
      end
    end
  end




  private
  def set_game
    @game = current_user.games.find_by_id(high_score_params[:game_id])
    unless @game
      flash[:error] = 'Cannot create high score on nonexistent game'
      redirect_to :back
    end
  end


  def require_game_without_high_score
    if @game.high_score_id
      flash[:error] = 'Game already has high score'
      redirect_to :back
    end
  end


  def high_score_params
    params.require(:high_score).permit(
      :game_id
    )
  end
end
