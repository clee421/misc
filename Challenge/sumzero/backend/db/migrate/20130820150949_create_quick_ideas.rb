class CreateQuickIdeas < ActiveRecord::Migration
  def change
    create_table :quick_ideas do |t|
      t.string :text
      t.integer :user_id

      t.timestamps
    end
  end
end
