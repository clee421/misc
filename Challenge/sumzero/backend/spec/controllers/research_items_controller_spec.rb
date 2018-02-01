require 'spec_helper'

# TODO: refactor specs to better reflect changes made
describe ResearchItemsController do
  let(:user) { create(:user, name: "John Doe") }
  before(:each) do
    ResearchItemsController.any_instance.stub(:current_user).and_return(user)
    User.any_instance.stub(:current_user).and_return(user)
  end

  context "#create" do
    it "has create route" do
      post :create
      expect(response.status).to eq(200)
    end

    it "adds a research item to the current user" do
      research_item = create(:research_item)

      post :create, id: research_item.id
      expect(user.has_research_item?(research_item)).to eq(true)
    end

    it "adds bloomberg research item if research item not found" do
      bloomberg_research = create(:bloomberg_research)
      research_item = ResearchItem.new(bloomberg_research.attributes)

      post :create, id: bloomberg_research.id
      expect(user.has_research_item?(research_item)).to eq(true)
    end

    # This failed specs because current_user.has_research_item?
    # is expecting a research_item not research_item.id: FIXED!
    it "does not add duplicate research item" do
      research_item = create(:research_item)

      user.research_items << research_item
      user.save!
      number_research = user.research_items.length

      post :create, id: research_item.id
      expect(user.research_items.length).to equal(number_research)
    end

    # Similar test to first spec but this one is more specific
    it "does not add any research if none is provided" do
      number_research = user.research_items.length

      post :create
      expect(user.research_items.length).to equal(number_research)
    end
  end
end
