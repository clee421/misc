# require "json"
require "./campaign.rb"

# this is for checking if the campaign_id is duplicated
# source1_hash = {}
#
# File.open("source1.csv", "r").each_with_index do |line, index|
#   next if index == 0
#   key, audience, impression = line.chomp.split(",")
#   if source1_hash[key]
#     source1_hash[key].impression += impression.to_i
#   else
#     state, hair, age = audience.split("_")
#     source1_hash[key] = Campaign.new(key, state, hair, age, impression.to_i)
#   end
#   source1_hash[key].count += 1
# end

# File.open("source2.csv", "r").each_with_index do |line, index|
#   next if index == 0
#   # These lines are redundent, but ok for now as testing
#   line_array = line.chomp.split(",")
#   key, ad_type, date, spend = line_array[0..3]
#   actions = line_array[4..-1].join(",").gsub('""', '"')
#   # These lines....
#   # p actions
#   campaign_date = { date => {
#     ad_type: ad_type,
#     spend: spend,
#     actions: JSON.parse(actions[1...-1])
#   } }
#
#   unless source1_hash[key]
#     source1_hash[key] = Campaign.new(key)
#   end
#
#   source1_hash[key].date << campaign_date
# end

test_collect = CampaignCollection.new
test_collect.parse_source1("source1.csv")
test_collect.parse_source2("source2.csv")

test_collect.campaign_collection.values[0..10].each do |campaign|
  # campaign = source1_hash[camp_key]
  puts "_________________________________"
  puts "Campaign ID: #{campaign.id}"
  puts "Campaign State: #{campaign.state}"
  puts "Campaign Hair: #{campaign.hair_color}"
  puts "Campaign Age Range: #{campaign.age_range}"
  puts "Campaign Total Impressions: #{campaign.impression}"
  puts "Campaign Total Spending: #{campaign.total_spending}"
  print "Campaign Date: "
  p campaign.date
  puts "_________________________________"
end

data_map = test_collect.data_map

# puts "Data Map: "
# data_map.each do |key, val|
#   puts "Key: #{key} : Value: #{val}"
# end

# state_dupe = Hash.new(0)
# data_map[:state].each do |state, state_hash|
#   puts "State: #{state}"
#   puts "Total spending: #{state_hash[:total_spending]}"
#   puts "Total impression: #{state_hash[:total_impression]}"
#   p state_hash[:campaign_id].length
# end
#
# puts "Duplicate state and campaign"
# p state_dupe.select { |_, v| v > 1 }
#
# hair_dupe = Hash.new(0)
# data_map[:hair_color].each do |color, hair_hash|
#   puts "Hair Color: #{color}"
#   puts "Total spending: #{hair_hash[:total_spending]}"
#   puts "Total impression: #{hair_hash[:total_impression]}"
#   p hair_hash[:campaign_id].length
# end
#
# puts "Duplicate hair and campaign"
# p hair_dupe.select { |_, v| v > 1 }
#
# age_dupe = Hash.new(0)
# data_map[:age_range].each do |age, age_hash|
#   puts "Age Range: #{age}"
#   puts "Total spending: #{age_hash[:total_spending]}"
#   puts "Total impression: #{age_hash[:total_impression]}"
#   p age_hash[:campaign_id].length
# end
#
# puts "Duplicate age range and campaign"
# p age_dupe.select { |_, v| v > 1 }

# data_map[:date].each do |date, date_hash|
#   puts "Dates: #{date}"
#   p date_hash[:campaign_id].length
# end

# data_map[:ad_type].each do |ad_type, ad_hash|
#   puts "Ad Type: #{ad_type}"
#   puts "Total spending: #{ad_hash[:total_spending]}"
#   puts "Action total value: "
#   p ad_hash[:action_total]
#   p ad_hash[:campaign_id].length
# end
#
# data_map[:action].each do |action_type, action_hash|
#   puts "Action Type: #{action_type}"
#   p action_hash[:campaign_id].length
# end

# data_map[:source].each do |source_type, source_hash|
#   puts "Source: #{source_type}"
#   puts "Report count: #{source_hash[:report_count]}"
#   # p source_hash[:campaign_id]
# end
#
# puts "Source H Data"
# p data_map[:source]["H"][:report_count]
