class PollsController < ApplicationController
  before_action :authenticate_user!, only: [ :index, :edit, :update, :destroy ]
  before_action :find_poll, only: [ :edit, :update, :add_results, :destroy]

  def index
    if params[:user_id]
      @polls = User.find(params[:user_id]).polls.published_polls
      render json: @polls
    else
      @polls = Poll.published_polls
      render json: @polls
    end
  end

  def show
    if params[:user_id]
      @user = User.find_by(id: params[:user_id])
      @poll = @user.polls.find_by(id: params[:id])
      if @poll.nil?
        redirect_to user_polls_path(@user), alert: "Poll not found"
      end
    else
      @poll = Poll.find(params[:id])
      respond_to do |format|
        format.json {render json: @poll}
      end
    end 
  end

  def results
    @poll = Poll.find(params[:id])
    render json: @poll
  end

  def create
    @poll = Poll.new(new_poll_params)
    @poll.user = current_user if signed_in?
    if @poll.save
      render json: @poll, status: 201
    else
      render body: "error"
    end
  end

  def update
    @poll.update(edit_poll_params)
    if @poll.save
      render json: @polls
    else
      flash[:error] = "Somehow, you managed to fuck up. Congrats."
      render action: 'edit'
    end
  end

  def add_results
    response_value = params.require('response')[:id]
    if response_value.class == ActionController::Parameters
      response_value.each do |k,v|
        response = Response.find(k.to_i)
        if response.poll == @poll #put this logic in a validate response method?
          response.selected += 1
          response.save
          if signed_in? 
            current_user.responses << response 
          else
            #add cookie
          end 
        end
      end
    else
      response = Response.find(response_value.to_i)
      if response.poll == @poll #put this logic in a validate response method?
        response.selected += 1
        response.save
        if signed_in?
          current_user.responses << response 
        else
          #add cookie
        end 
      end
    end
    render json: @poll
  end

  def destroy
    @poll.votes.each { |vote| vote.delete }
    @poll.responses.each { |response| response.delete }
    @poll.delete
    redirect_to root_path
  end


  private
  def new_poll_params
    params.require(:poll).permit(:question, :limit_to_survey, :select_multiple, :open, :public_results, :published, responses_attributes: [:text])
  end

  def edit_poll_params
    params.require(:poll).permit(:limit_to_survey, :select_multiple, :open, :public_results, :published)
  end

  def find_poll
    @poll = Poll.find(params[:id])
  end
end
