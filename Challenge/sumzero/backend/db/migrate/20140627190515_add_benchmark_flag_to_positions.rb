class AddBenchmarkFlagToPositions < ActiveRecord::Migration
  def change
    add_column :positions, :benchmark, :boolean
  end
end
