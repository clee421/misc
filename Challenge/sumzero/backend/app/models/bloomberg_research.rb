class BloombergResearch < ActiveRecord::Base
  belongs_to :user

  def convert_to_research_item
    ResearchItem.new(attributes)
  end
end
