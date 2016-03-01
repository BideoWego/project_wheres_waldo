class CreateTags < ActiveRecord::Migration
  def change
    create_table :tags do |t|
      t.integer :character_id, :null => false
      t.integer :game_id, :null => false
      t.integer :x, :null => false
      t.integer :y, :null => false

      t.index :character_id
      t.index :game_id
      t.index [:character_id, :game_id], :unique => true
      t.index :x
      t.index :y

      t.timestamps null: false
    end
  end
end
