require "./campaign.rb"
require 'json'

# *********** FILE LOADING ***********
start = Time.now
test_collect = CampaignCollection.new
test_collect.parse_source1("source1.csv")
test_collect.parse_source2("source2.csv")
current = Time.now
benchmark_file_load = current - start
# *********** FILE LOADING ***********

# *********** FILE MAPPING ***********
start = Time.now
data_map = test_collect.data_map
current = Time.now
benchmark_file_mapping = current - start
# *********** FILE MAPPING ***********


# *********** ANSWER QUESTIONS ***********
start = Time.now
# 1. What was the total spent against people with purple hair?
answer1 = data_map[:hair_color]["purple"][:total_spending]

# 2. How many campaigns spent on more than 4 days?
answer2 = 0
data_map[:campaign].each do |_, campaign|
  answer2 += 1 if campaign.date.length > 4
end

# 3. How many times did source H report on clicks?
answer3 = data_map[:source]["H"][:report_count]["clicks"]

# 4. Which sources reported more "junk" than "noise"?
answer4 = []
data_map[:source].each do |source_type, source_hash|
  if source_hash[:report_count]["junk"] > source_hash[:report_count]["noise"]
    answer4 << source_type
  end
end

# 5. What was the total cost per view for all video ads, truncated to two decimal places?
answer5 = data_map[:ad_type]["video"][:total_spending].to_f / data_map[:ad_type]["video"][:action_total]["views"]

# 6. How many source B conversions were there for campaigns targeting NY?
answer6 = 0
data_map[:source]["B"][:campaign_id].each do |source_array|
  # source array format: [id, date, action, value]
  if source_array[2] == "conversions" && data_map[:state]["NY"][:campaign_id].include?(source_array[0])
    answer6 += source_array[3]
  end
end


# What is a 'Cost Per Thousand - CPM'
# Cost per thousand (CPM) is a marketing term used to denote the price
# of 1,000 advertisement impressions on one webpage. If a website publisher
# charges $2.00 CPM, that means an advertiser must pay $2.00 for every
# 1,000 impressions of its ad. The "M" in CPM represents the Roman numeral
# for 1,000.

# CPM = total_spend / (total_impression / 1000)

# 7. What combination of state and hair color had the best CPM?
state_best_cpm = [nil, -1]
data_map[:state].each do |state, state_hash|
  state_cpm = state_hash[:total_spending].to_f / state_hash[:total_impression].to_f / 1000
  if state_best_cpm[1] < state_cpm
    state_best_cpm = state, state_cpm
  end
end


hair_best_cpm = [nil, -1]
data_map[:hair_color].each do |color, hair_hash|
  hair_cpm = hair_hash[:total_spending].to_f / hair_hash[:total_impression].to_f / 1000
  if hair_best_cpm[1] < hair_cpm
    hair_best_cpm = color, hair_cpm
  end
end

answer7 = [state_best_cpm[0], hair_best_cpm[0]]

current = Time.now
benchmark_answer_questions = current - start
# *********** ANSWER QUESTIONS ***********


puts "What was the total spent against people with purple hair?"
puts "Answer: #{answer1}"
puts "__________________________________________________________"
puts "How many campaigns spent on more than 4 days?"
puts "Answer: #{answer2}"
puts "__________________________________________________________"
puts "How many times did source H report on clicks?"
puts "Answer: #{answer3}"
puts "__________________________________________________________"
puts "Which sources reported more \"junk\" than \"noise\"?"
puts "Answer: #{answer4.join(', ')}"
puts "__________________________________________________________"
puts "What was the total cost per view for all video ads, truncated to two decimal places?"
puts "Answer: #{answer5.round(2)}"
puts "__________________________________________________________"
puts "How many source B conversions were there for campaigns targeting NY?"
puts "Answer: #{answer6}"
puts "__________________________________________________________"
puts "What combination of state and hair color had the best CPM?"
puts "Answer: #{answer7.join(' ')}"

puts

puts "Time to load files: #{benchmark_file_load}"
puts "Time to map files: #{benchmark_file_mapping}"
puts "Time to answer questions: #{benchmark_answer_questions}"
puts "Total time: #{benchmark_file_load + benchmark_file_mapping + benchmark_answer_questions}"
