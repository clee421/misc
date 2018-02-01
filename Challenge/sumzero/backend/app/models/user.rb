class User < ActiveRecord::Base
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  has_many :quick_ideas
  has_many :comments
  has_many :ideas
  has_many :research_items

  def has_research_item?(research_item)
    research_items.include?(research_item)
  end

  def save_research_item_by_id(id)
    unless id.nil?
      research_item = ResearchItem.find_by_id(id)

      # has_research_item? takes research_item as an argument NOT research_item.id
      if !research_item.nil? && !current_user.has_research_item?(research_item)
        add_research_item_to_current_user(research_item)
      else
        bloomberg_research_item = BloombergResearch.find_by_id(id)
        unless bloomberg_research_item.nil?
          research_item = bloomberg_research_item.convert_to_research_item
          add_research_item_to_current_user(research_item)
        end
      end
    end
  end
end

private
def add_research_item_to_current_user (research_item)
  unless current_user.nil?
    current_user.research_items << research_item
    current_user.save!
  end
end
