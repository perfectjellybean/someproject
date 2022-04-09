# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: "Star Wars" }, { name: "Lord of the Rings" }])
#   Character.create(name: "Luke", movie: movies.first)

puts 'Removing old records ...'
User.destroy_all
RestaurantRecord.destroy_all
Restaurant.destroy_all
Owner.destroy_all
RestaurantOwner.destroy_all

puts 'Resetting table ids ...'
ActiveRecord::Base.connection.reset_pk_sequence!('users')
ActiveRecord::Base.connection.reset_pk_sequence!('restaurant_records')
ActiveRecord::Base.connection.reset_pk_sequence!('restaurants')
ActiveRecord::Base.connection.reset_pk_sequence!('owners')
ActiveRecord::Base.connection.reset_pk_sequence!('restaurant_owners')

puts 'Creating users ...'
user1 = User.create!(name: 'Johnny', username: 'john', password: '11', password_confirmation: '11')
user2 = User.create!(name: 'Michael', username: 'mike', password: '11', password_confirmation: '11')

puts 'Creating restaurants ...'
restaurant1 = Restaurant.create!(name: 'Starbucks')
owner1 = Owner.find_or_create_by!(user_id: user1.id)
RestaurantOwner.create!(owner_id: owner1.id, restaurant_id: restaurant1.id)

restaurant2 = Restaurant.create!(name: 'Max Brenner')
owner2 = Owner.find_or_create_by!(user_id: user2.id)
RestaurantOwner.create!(owner_id: owner2.id, restaurant_id: restaurant2.id)

restaurant3 = Restaurant.create!(name: 'Taco Bell')
owner3 = Owner.find_or_create_by!(user_id: user1.id)
RestaurantOwner.create!(owner_id: owner3.id, restaurant_id: restaurant3.id)

restaurant4 = Restaurant.create!(name: 'Chipotle')
owner4 = Owner.find_or_create_by!(user_id: user2.id)
RestaurantOwner.create!(owner_id: owner4.id, restaurant_id: restaurant4.id)

puts 'Creating dates ...'

def random_time
  rand(Time.now.beginning_of_day..Time.now.end_of_day).to_fs(:time)
end

date1 = DateTime.parse('31-1-2022 ' + random_time)
date2 = DateTime.parse('02-02-2022 ' + random_time)
date3 = DateTime.parse('03-02-2022 ' + random_time)

puts 'Creating restaurant records ...'
record1 = RestaurantRecord.create!(user_id: user1.id, restaurant_id: restaurant1.id)
record1.created_at = DateTime.parse('31-1-2022 ' + random_time)
record1.save

record2 = RestaurantRecord.create!(user_id: user1.id, restaurant_id: restaurant1.id)
record2.created_at = date2 = DateTime.parse('02-02-2022 ' + random_time)
record2.save

record3 = RestaurantRecord.create!(user_id: user2.id, restaurant_id: restaurant2.id)
record3.created_at = DateTime.parse('31-1-2022 ' + random_time)
record3.save

record4 = RestaurantRecord.create!(user_id: user1.id, restaurant_id: restaurant2.id)
record4.created_at = DateTime.parse('31-1-2022 ' + random_time)
record4.save

record5 = RestaurantRecord.create!(user_id: user2.id, restaurant_id: restaurant2.id)
record5.created_at = DateTime.parse('31-1-2022 ' + random_time)
record5.save

puts 'Done seeding!'
