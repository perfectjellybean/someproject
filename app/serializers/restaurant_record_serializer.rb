class RestaurantRecordSerializer < ActiveModel::Serializer
  attributes :id, :restaurant_id, :created_at
  belongs_to :user
end
