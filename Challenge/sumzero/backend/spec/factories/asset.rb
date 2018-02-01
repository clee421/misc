FactoryGirl.define do
  factory :asset do
    factory :asset_with_asset_symbols do
      after(:create) do |asset, evaluator|
        create(:bloomberg_asset_symbol, asset: asset)
        create(:yahoo_asset_symbol, asset: asset)
      end
    end
  end
end