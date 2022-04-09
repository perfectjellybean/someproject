class Restaurant < ApplicationRecord
  has_many :restaurant_records
  has_many :users, through: :restaurant_records

  has_many :restaurant_owners
  has_many :owners, through: :restaurant_owners
end
