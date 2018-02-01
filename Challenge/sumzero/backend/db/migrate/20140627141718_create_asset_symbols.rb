class CreateAssetSymbols < ActiveRecord::Migration
  def change
    create_table :asset_symbols do |t|
      t.integer :asset_id
      t.string :symbol
      t.string :source

      t.timestamps
    end
  end
end
