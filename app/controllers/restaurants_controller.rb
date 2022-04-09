class RestaurantsController < ApplicationController
  def index
    render json: Restaurant.all
  end

  def create
    restaurant = Restaurant.create!(name: params[:name])
    owner = Owner.find_or_create_by!(user_id: params[:user_id])
    RestaurantOwner.create!(owner_id: owner.id, restaurant_id: restaurant.id)
    render json: restaurant, status: :created
  end

  def show
    restaurant = Restaurant.find(params[:id])
    render json: restaurant
  end

  # def past_day
  #   owner = Owner.find_by(user_id: @current_user.id)
  #   records = owner.restaurants.map do |restaurant|
  #     { restaurant[:name] => restaurant.restaurant_records }
  #   end
  #   render json: records
  # end
end
