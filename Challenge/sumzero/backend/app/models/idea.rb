class Idea < ActiveRecord::Base
  has_many :comments
  has_many :positions
  belongs_to :user

  def bloomberg_symbol_original
    positions.where(benchmark: false).first.asset.asset_symbols.where(status: AssetSymbol::ACTIVE).where(source: AssetSymbol::BLOOMBERG).first.symbol
  end

  def yahoo_symbol_original
    positions.where(benchmark: false).first.asset.asset_symbols.where(status: AssetSymbol::ACTIVE).where(source: AssetSymbol::YAHOO).first.symbol
  end

  def bloomberg_symbol
    false_benchmark_positions.first.asset.bloomberg_active_symbol.first.symbol
  end

  def yahoo_symbol
    false_benchmark_positions.first.asset.yahoo_active_symbol.first.symbol
  end

  def false_benchmark_positions
    # .first could have been written here also potentially
    positions.where(benchmark: false)
  end
end
