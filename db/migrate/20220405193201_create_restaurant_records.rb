class CreateRestaurantRecords < ActiveRecord::Migration[7.0]
  def change
    create_table :restaurant_records do |t|
      t.integer :user_id
      t.integer :restaurant_id

      t.timestamps
    end
  end
end
