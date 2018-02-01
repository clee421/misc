FactoryGirl.define do
  factory :idea do
    user
    
    factory :idea_with_positions do
      after(:create) do |idea|
        create(:position_with_asset_and_asset_symbols, idea: idea)
        create(:benchmark_position, idea: idea)
      end
    end
  end
end