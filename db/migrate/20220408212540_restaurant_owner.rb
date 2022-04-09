class RestaurantOwner < ActiveRecord::Migration[7.0]
  def change
    create_table :restaurant_owners do |t|
      t.integer :owner_id
      t.integer :restaurant_id

      t.timestamps
    end
  end
end
