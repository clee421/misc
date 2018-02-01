class CreateBloombergResearches < ActiveRecord::Migration
  def change
    create_table :bloomberg_researches do |t|
      t.integer :user_id

      t.timestamps
    end
  end
end
