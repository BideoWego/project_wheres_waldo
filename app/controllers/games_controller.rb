class GamesController < ApplicationController
  before_action :require_login
  before_action :set_game, :except => [:create]


  layout 'game'


  def show
    respond_to do |format|
      format.html {}
      format.json do
        render(
          :json => @game.to_json(
            :include => [:high_score],
            :methods => [:total_possible_points, :time_remaining]
          ),
          :status => 200
        )
      end
      format.js {}
    end
  end

  
  def create
    @game = current_user.games.build
    if @game.save
      flash[:success] = 'Game created'
      redirect_to game_path(@game)
    else
      flash[:error] = 'Game not created: ' + @game.errors.full_messages.join(', ')
      redirect_to :back
    end
  end


  def destroy
    if @game.destroy
      flash[:success] = 'Game destroyed'
    else
      flash[:error] = 'Game not destroyed'
    end
    redirect_to :back
  end




  private
  def set_game
    @game = current_user.games.find_by_id(params[:id])
    unless @game
      flash[:error] = 'Game not found'
      redirect_to root_path
    end
  end
end

