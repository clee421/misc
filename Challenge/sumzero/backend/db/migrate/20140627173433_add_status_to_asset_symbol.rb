class AddStatusToAssetSymbol < ActiveRecord::Migration
  def change
    add_column :asset_symbols, :status, :string
  end
end
