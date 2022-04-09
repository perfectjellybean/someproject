class Api::RestaurantOwnersController < ApplicationController
  def index
    owner = Owner.find_by(user_id: @current_user.id)
    render json: owner.restaurants
  end
end
