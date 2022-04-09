class Api::RestaurantRecordsController < ApplicationController
  def create
    record = RestaurantRecord.create(user_id: params[:user_id], restaurant_id: params[:restaurant_id])
    render json: record.restaurant, status: :created
  end

  # def get_by_date
  #   users = User.all.group_by_day { |u| u.created_at }
  #   users.map do |k, v|
  #     [k, v]
  #   end
  # end

  def show
    user_records = RestaurantRecord.where(restaurant_id: params[:id])
    user_records = user_records.group_by_day { |u| u.created_at }
    records = user_records.map do |key, value|
      [key, value]
    end
    render json: records, include: :user
  end

  def unique_restaurants
    restaurants = @current_user.restaurants.uniq { |record| record[:id] }
    render json: restaurants
  end

  def past_day
    # records = @current_user.restaurant_records.group_by_week { |u| u.created_at }
    # render json: records
    records = @current_user.restaurant_records.where(created_at: Time.zone.now.beginning_of_day..Time.zone.now.end_of_day)
    render json: records
  end
end
