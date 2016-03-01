class CreateUsers < ActiveRecord::Migration
  def change
    create_table :users do |t|
      t.string :email, :null => false
      t.string :username, :null => false
      t.string :password_digest, :null => false
      t.string :auth_token, :null => false

      t.index :email, :unique => true
      t.index :username, :unique => true
      t.index :auth_token, :unique => true

      t.timestamps null: false
    end
  end
end
