FactoryGirl.define do
  factory :asset_symbol do
    sequence(:symbol) do |index| 
      "GOOG#{index}:US"
    end

    trait :source_bloomberg do
      source AssetSymbol::BLOOMBERG
    end

    trait :source_yahoo do
      source AssetSymbol::YAHOO
    end

    trait :status_active do
      status AssetSymbol::ACTIVE
    end

    trait :status_ticker_change do
      status AssetSymbol::TICKER_CHANGE
    end

    factory :bloomberg_asset_symbol do
      source_bloomberg
      status_active
    end

    factory :yahoo_asset_symbol do
      source_yahoo
      status_active
    end
  end
end