class CreateResearchItems < ActiveRecord::Migration
  def change
    create_table :research_items do |t|
      t.integer :user_id

      t.timestamps
    end
  end
end
