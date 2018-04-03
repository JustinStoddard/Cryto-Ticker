class Coin < ApplicationRecord
  validates_uniqueness_of :cmc_id, :name, :symbol, { case_sensitive: false }
  validates_presence_of :cmc_id, :name, :symbol

  has_many :watched_coins, through: :destroy
  has_many :users, through: :watched_coins

  def self.create_by_cmc_id(res)
    if /^2\d\d$/ =~ res.code.to_s 
      match = res[0].with_inifferent_access
      coin_params = { 
        name: match[:name],
        symbol: match[:symbol],
        cmc_id: match[:id]
      }

      Coin.find_or_create_by(coin_params) do |coin|
        coin.price = match[:price_usd]
        coin.last_fetched = DateTime.now
    else
      nil
    end
  end 
  
end
