class UsersController < ApplicationController


  def show
    @user = User.find_by(username: params[:id])
    respond_to do |format|
      format.html {render :show} 
      format.json {render json: @user}      
    end
  end
  
end