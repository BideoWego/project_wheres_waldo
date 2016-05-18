# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160229214326) do

  create_table "characters", force: :cascade do |t|
    t.string   "name",       null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "characters", ["name"], name: "index_characters_on_name", unique: true

  create_table "games", force: :cascade do |t|
    t.integer  "user_id",       null: false
    t.integer  "high_score_id"
    t.datetime "ended_at"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
  end

  add_index "games", ["ended_at"], name: "index_games_on_ended_at"
  add_index "games", ["high_score_id"], name: "index_games_on_high_score_id", unique: true
  add_index "games", ["user_id"], name: "index_games_on_user_id"

  create_table "high_scores", force: :cascade do |t|
    t.integer  "points",     null: false
    t.string   "username",   null: false
    t.integer  "game_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "high_scores", ["game_id"], name: "index_high_scores_on_game_id", unique: true
  add_index "high_scores", ["username"], name: "index_high_scores_on_username"

  create_table "tags", force: :cascade do |t|
    t.integer  "character_id", null: false
    t.integer  "game_id",      null: false
    t.integer  "x",            null: false
    t.integer  "y",            null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
  end

  add_index "tags", ["character_id", "game_id"], name: "index_tags_on_character_id_and_game_id", unique: true
  add_index "tags", ["character_id"], name: "index_tags_on_character_id"
  add_index "tags", ["game_id"], name: "index_tags_on_game_id"
  add_index "tags", ["x"], name: "index_tags_on_x"
  add_index "tags", ["y"], name: "index_tags_on_y"

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "auth_token",      null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

  add_index "users", ["auth_token"], name: "index_users_on_auth_token", unique: true
  add_index "users", ["email"], name: "index_users_on_email", unique: true
  add_index "users", ["username"], name: "index_users_on_username", unique: true

end
