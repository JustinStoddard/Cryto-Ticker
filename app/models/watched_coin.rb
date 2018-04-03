class WatchedCoin < ApplicationRecord
  belongs_to :user
  belongs_to :coin
end
