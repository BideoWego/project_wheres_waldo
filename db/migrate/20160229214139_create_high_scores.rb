class CreateHighScores < ActiveRecord::Migration
  def change
    create_table :high_scores do |t|
      t.integer :points, :null => false
      t.string :username, :null => false
      t.integer :game_id, :null => false

      t.index :username
      t.index :game_id, :unique => true

      t.timestamps null: false
    end
  end
end
