class CreateGames < ActiveRecord::Migration
  def change
    create_table :games do |t|
      t.integer :user_id, :null => false
      t.integer :high_score_id
      t.datetime :ended_at

      t.index :user_id
      t.index :high_score_id, :unique => true
      t.index :ended_at

      t.timestamps null: false
    end
  end
end
