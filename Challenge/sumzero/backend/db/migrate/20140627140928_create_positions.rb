class CreatePositions < ActiveRecord::Migration
  def change
    create_table :positions do |t|
      t.integer :idea_id
      t.integer :asset_id
      t.string :status

      t.timestamps
    end
  end
end
