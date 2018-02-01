class Asset < ActiveRecord::Base
  has_many :positions
  has_many :asset_symbols

  def bloomberg_active_symbol
    active_asset_symbol.where(source: AssetSymbol::BLOOMBERG)
  end

  def yahoo_active_symbol
    active_asset_symbol.where(source: AssetSymbol::YAHOO)
  end

  def active_asset_symbol
    asset_symbols.where(status: AssetSymbol::ACTIVE)
  end
end
