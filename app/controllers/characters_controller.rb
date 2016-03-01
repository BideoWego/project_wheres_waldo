class CharactersController < ApplicationController
  def index
    @characters = Character.all
    respond_to do |format|
      format.json { render :json => @characters.to_json, :status => 200 }
    end
  end
end
