class ResearchItemsController < ApplicationController

  def create
    @id = params[:id]

    # The user should add research items
    current_user.save_research_item_by_id(@id)
    # save_research_item_by_id(@id)

    #added for simplification purposes...
    render :nothing => true
  end

# private
  # def add_research_item_to_current_user (research_item)
  #   unless current_user.nil?
  #     current_user.research_items << research_item
  #     current_user.save!
  #   end
  # end
  #
  # def save_research_item_by_id(id)
  #   unless id.nil?
  #     @research_item = ResearchItem.find_by_id(id)
  #
  #     # has_research_item? takes research_item as an argument NOT research_item.id
  #     if !@research_item.nil? && !current_user.has_research_item?(@research_item)
  #       add_research_item_to_current_user(@research_item)
  #     else
  #       bloomberg_research_item = BloombergResearch.find_by_id(id)
  #       unless bloomberg_research_item.nil?
  #         @research_item = bloomberg_research_item.convert_to_research_item
  #         add_research_item_to_current_user(@research_item)
  #       end
  #     end
  #   end
  # end
end
