class RestaurantSerializer < ActiveModel::Serializer
  attributes :id, :name
  has_many :restaurant_records
end
