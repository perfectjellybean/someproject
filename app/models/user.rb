class User < ApplicationRecord
  has_many :restaurant_records
  has_many :restaurants, through: :restaurant_records

  has_secure_password

  def get_records(id)
    User.find(id).restaurant_records
  end
end
