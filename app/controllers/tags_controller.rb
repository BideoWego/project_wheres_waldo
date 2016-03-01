class TagsController < ApplicationController
  before_action :require_login
  before_action :set_game
  before_action :set_tag, :only => [:destroy]


  def index
    respond_to do |format|
      format.json { render :json => @game.tags.to_json, :status => 200 }
    end
  end


  def create
    @tag = @game.tags.build(tag_params)
    if @tag.save
      flash[:success] = 'Tag created'
    else
      flash[:error] = 'Tag not created: ' +
        @tag.errors.full_messages.join(', ')
    end
    redirect_to :back
  end


  def destroy
    if @tag.destroy
      flash[:success] = 'Tag destroyed'
    else
      flash[:error] = 'Tag not destroyed: ' +
        @tag.errors.full_messages.join(', ')
    end
    redirect_to :back
  end



  private
  def set_game
    @game = current_user.games.find_by_id(params[:game_id])
    unless @game
      flash[:error] = 'Cannot modify tags on nonexistent game'
      redirect_to :back
    end
  end


  def set_tag
    if @game.high_score
      flash[:error] = 'Cannot modify tags on completed game'
      redirect_to :back
    else
      @tag = @game.tags.find_by_id(params[:id])
      unless @tag
        flash[:error] = 'Tag not found'
        redirect_to :back
      end
    end
  end


  def tag_params
    params.require(:tag).permit(
      :character_id,
      :game_id,
      :x,
      :y
    )
  end
end
