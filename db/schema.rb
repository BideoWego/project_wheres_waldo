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
    t.index ["name"], name: "index_characters_on_name", unique: true
  end

  create_table "games", force: :cascade do |t|
    t.integer  "user_id",       null: false
    t.integer  "high_score_id"
    t.datetime "ended_at"
    t.datetime "created_at",    null: false
    t.datetime "updated_at",    null: false
    t.index ["ended_at"], name: "index_games_on_ended_at"
    t.index ["high_score_id"], name: "index_games_on_high_score_id", unique: true
    t.index ["user_id"], name: "index_games_on_user_id"
  end

  create_table "high_scores", force: :cascade do |t|
    t.integer  "points",     null: false
    t.string   "username",   null: false
    t.integer  "game_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_high_scores_on_game_id", unique: true
    t.index ["username"], name: "index_high_scores_on_username"
  end

  create_table "tags", force: :cascade do |t|
    t.integer  "character_id", null: false
    t.integer  "game_id",      null: false
    t.integer  "x",            null: false
    t.integer  "y",            null: false
    t.datetime "created_at",   null: false
    t.datetime "updated_at",   null: false
    t.index ["character_id", "game_id"], name: "index_tags_on_character_id_and_game_id", unique: true
    t.index ["character_id"], name: "index_tags_on_character_id"
    t.index ["game_id"], name: "index_tags_on_game_id"
    t.index ["x"], name: "index_tags_on_x"
    t.index ["y"], name: "index_tags_on_y"
  end

  create_table "users", force: :cascade do |t|
    t.string   "email",           null: false
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "auth_token",      null: false
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
    t.index ["auth_token"], name: "index_users_on_auth_token", unique: true
    t.index ["email"], name: "index_users_on_email", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
