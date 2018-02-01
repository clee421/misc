class AssetSymbol < ActiveRecord::Base
  belongs_to :asset

  validates_uniqueness_of :symbol, :scope => [:source, :status] 

  SOURCES=[
    BLOOMBERG = 'bloomberg',
    YAHOO = 'yahoo',
    USER = 'user'
  ]

  STATUS=[
    ACQUIRED='acquired',
    TICKER_CHANGE='ticker_change',
    ACTIVE='active'
  ]

  def for_bloomberg?
    source == BLOOMBERG
  end

  def for_yahoo?
    source == YAHOO
  end
end
