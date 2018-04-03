class CreateWatchedCoins < ActiveRecord::Migration[5.1]
  def change
    create_table :watched_coins do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :coin, foreign_key: true
      t.string :initial_price

      t.timestamps
    end
  end
end
