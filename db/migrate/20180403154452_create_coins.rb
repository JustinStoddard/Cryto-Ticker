class CreateCoins < ActiveRecord::Migration[5.1]
  def change
    create_table :coins do |t|
      t.string :cmc_id
      t.string :name
      t.string :symbol
      t.string :price
      t.datetime :last_fetched

      t.timestamps
    end
  end
end
