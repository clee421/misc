class CreateIdeas < ActiveRecord::Migration
  def change
    create_table :ideas do |t|
      t.string :text
      t.float :return
      t.string :ticker

      t.timestamps
    end
  end
end
