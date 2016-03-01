# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


# ----------------------------------------
# Reset Database
# ----------------------------------------

if Rails.env == 'development'
  puts 'Reseting Database'

  Rake::Task['db:migrate:reset'].invoke
end


# ----------------------------------------
# Create Users
# ----------------------------------------

puts 'Creating Users'

User.new(
  :email => 'guest@user.com',
  :username => 'guest',
  :password => 'password'
).save!(:validate => false)
users = User.all

# ----------------------------------------
# Create Characters
# ----------------------------------------

puts 'Creating Characters'

characters = [
  { :name => 'Waldo' },
  { :name => 'Wenda' },
  { :name => 'Odlaw' },
  { :name => 'Wizard Whitebeard' },
  { :name => 'Woof' }
]
Character.create(characters)
characters = Character.all


# ----------------------------------------
# Finish
# ----------------------------------------

puts 'Done!'

