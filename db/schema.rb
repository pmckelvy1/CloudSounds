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

ActiveRecord::Schema.define(version: 20160201141925) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "comments", force: :cascade do |t|
    t.text     "body",       null: false
    t.integer  "song_id",    null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "comments", ["song_id"], name: "index_comments_on_song_id", using: :btree
  add_index "comments", ["user_id"], name: "index_comments_on_user_id", using: :btree

  create_table "follows", force: :cascade do |t|
    t.integer  "user_id",     null: false
    t.integer  "followed_id", null: false
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  add_index "follows", ["followed_id"], name: "index_follows_on_followed_id", using: :btree
  add_index "follows", ["user_id"], name: "index_follows_on_user_id", using: :btree

  create_table "likes", force: :cascade do |t|
    t.integer  "song_id",    null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "likes", ["song_id"], name: "index_likes_on_song_id", using: :btree
  add_index "likes", ["user_id"], name: "index_likes_on_user_id", using: :btree

  create_table "reposts", force: :cascade do |t|
    t.integer  "song_id",    null: false
    t.integer  "user_id",    null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_index "reposts", ["song_id"], name: "index_reposts_on_song_id", using: :btree
  add_index "reposts", ["user_id"], name: "index_reposts_on_user_id", using: :btree

  create_table "songs", force: :cascade do |t|
    t.integer  "user_id",                        null: false
    t.string   "title",                          null: false
    t.text     "info",                           null: false
    t.integer  "num_plays",          default: 0
    t.datetime "created_at",                     null: false
    t.datetime "updated_at",                     null: false
    t.string   "username",                       null: false
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "audio_file_name"
    t.string   "audio_content_type"
    t.integer  "audio_file_size"
    t.datetime "audio_updated_at"
  end

  add_index "songs", ["user_id"], name: "index_songs_on_user_id", using: :btree

  create_table "users", force: :cascade do |t|
    t.string   "email",                                 null: false
    t.string   "username",                              null: false
    t.string   "password_digest",                       null: false
    t.string   "session_token",                         null: false
    t.datetime "created_at",                            null: false
    t.datetime "updated_at",                            null: false
    t.text     "info"
    t.string   "image_file_name"
    t.string   "image_content_type"
    t.integer  "image_file_size"
    t.datetime "image_updated_at"
    t.string   "header_image_file_name"
    t.string   "header_image_content_type"
    t.integer  "header_image_file_size"
    t.datetime "header_image_updated_at"
    t.integer  "num_songs",                 default: 0
  end

end
