class SessionsController < ApplicationController
  before_action :require_logout, :only => [:create]


  def new
    redirect_to root_path if signed_in_user?
  end


  def create
    @user = User.find_by_username_or_email(params[:username_or_email])
    if @user && @user.authenticate(params[:password])
      if sign_in(@user)
        flash[:success] = 'You are now signed in'
        redirect_to user_path(@user)
      else
        flash[:error] = 'There was a problem signing you in'
        redirect_to login_path
      end
    else
      flash[:error] = 'Unable to sign in'
      redirect_to login_path
    end
  end


  def destroy
    if current_user && sign_out
      flash[:success] = 'You are now signed out'
    else
      flash[:error] = 'Unable to sign out'
    end
    redirect_to login_path
  end
end

