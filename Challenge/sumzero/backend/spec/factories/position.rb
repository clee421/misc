FactoryGirl.define do
  factory :position do

    factory :position_with_asset_and_asset_symbols do
      association :asset, factory: :asset_with_asset_symbols
      benchmark false
    end

    factory :benchmark_position do
      asset  
      benchmark true
    end
  end
end