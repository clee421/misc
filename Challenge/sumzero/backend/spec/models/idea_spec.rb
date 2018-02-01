require 'spec_helper'

RSpec.describe Idea, :type => :model do

  context "factory" do
    #Note: included for example only, factories are automatically linted in spec_helper
    it "creates an idea" do
      expect(build(:idea_with_positions)).to be_valid
    end
  end

  #implement these
  context "#bloomberg_symbol" do
    #see https://github.com/thoughtbot/factory_girl/blob/master/GETTING_STARTED.md
    #for how to use FactoryGirl.
    it "returns the correct bloomberg symbol for this idea" do
      # Current testing method is temporary, will refactor if have time
      idea = create(:idea)
      asset = create(:asset)
      asset_symbol = create(
        :asset_symbol,
        asset_id: asset.id,
        status: AssetSymbol::ACTIVE,
        source: AssetSymbol::BLOOMBERG
        )
      position = create(
        :position,
        benchmark: false,
        idea_id: idea.id,
        asset_id: asset.id
        )

      expect(idea.bloomberg_symbol).to eq(idea.bloomberg_symbol_original)
    end
  end

  context "#yahoo_symbol" do
    it "returns the correct yahoo symbol for this idea" do
      idea = create(:idea)
      asset = create(:asset)
      asset_symbol = create(
        :asset_symbol,
        asset_id: asset.id,
        status: AssetSymbol::ACTIVE,
        source: AssetSymbol::YAHOO
        )
      position = create(
        :position,
        benchmark: false,
        idea_id: idea.id,
        asset_id: asset.id
        )

      expect(idea.yahoo_symbol).to eq(idea.yahoo_symbol_original)
    end
  end
end

# create_table "ideas", force: :cascade do |t|
#   t.string   "text"
#   t.float    "return"
#   t.string   "ticker"
#   t.datetime "created_at"
#   t.datetime "updated_at"
#   t.integer  "user_id"
# end
