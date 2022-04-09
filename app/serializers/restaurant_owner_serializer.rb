class RestaurantOwnerSerializer < ActiveModel::Serializer
  attributes :id, :restaurant_id, :user_id
  belongs_to :restaurant
end
