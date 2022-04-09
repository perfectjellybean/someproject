class RestaurantOwner < ApplicationRecord
  belongs_to :owner
  belongs_to :restaurant
end
