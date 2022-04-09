class Api::OwnersController < ApplicationController
  def index
    render json: Owner.all
  end

  def show
    render json: Owner.find_by(user_id: params[:id])
  end
end
