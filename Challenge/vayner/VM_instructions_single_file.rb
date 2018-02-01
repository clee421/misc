# TERMINAL OUTPUT
# ~/Projects/VaynerMedia$ ruby VM_instructions.rb
#
# What was the total spent against people with purple hair?
# Answer: 566512
# __________________________________________________________
# How many campaigns spent on more than 4 days?
# Answer: 133
# __________________________________________________________
# How many times did source H report on clicks?
# Answer: 623
# __________________________________________________________
# Which sources reported more "junk" than "noise"?
# Answer: D, J, F
# __________________________________________________________
# What was the total cost per view for all video ads, truncated to two decimal places?
# Answer: 16.49
# __________________________________________________________
# How many source B conversions were there for campaigns targeting NY?
# Answer: 268
# __________________________________________________________
# What combination of state and hair color had the best CPM?
# Answer: NY blue
#
# Time to load files: 0.232156058
# Time to map files: 0.142976948
# Time to answer questions: 0.004872637
# Total time: 0.380005643
#
#
#  -- Notes --
# Considering a benchmark was asked, I assume that time to process data
# is important and thus added additional data structure to speed up
# process time.
#
# Using a SQL database was considered, but the data could have been
# from an API endpoint and that felt a bit pointless without further
# information
#
# The data_map should be another class of it's own used to generate
# reports but it also may be a potential state of the front end (with
# modification).
#
# With report generation being the goal, data_map essentially the report
# and thus if new data was added to the CampaignCollection another
# data_map would need to be called
#
# A sample state of the data map is at the very bottom
#
# Also, with this submission being only 1 .txt file, making additional
# classes may make it more complicated than it needs to be
#
# This file can be copied onto a .rb file and run as is
#
#
#
# Assumptions (tested):
# All audience of a campaign_id have the same state, hair
# and age range
#  - Given the above, the impressions of the same audience target will
#    be added together

# require "./campaign.rb"
require 'json'

class Campaign
  attr_accessor(
    :id,
    :state,
    :hair_color,
    :age_range,
    :impression,
    :date,
    :total_spending
  )

  def initialize(id, state = nil, hair = nil, age = nil, impression = 0)
    @id = id
    @state = state
    @hair_color = hair
    @age_range = age
    @impression = impression
    @date = []
    @total_spending = 0
  end
end

class CampaignCollection
  attr_accessor :campaign_collection

  def initialize
    @campaign_collection = {}
  end

  # Format
  # campaign_id, audience, impressions
  # dce13dc8-3da2-4c6f-9e6b-1a2d07ee7f7f,MT_green_33-38,2652
  def parse_source1(filename)
    File.open(filename, "r").each_with_index do |line, index|
      next if index == 0

      key, audience, impression = source1_parse_line(line)

      if campaign_collection[key]
        campaign_collection[key].impression += impression
      else
        state, hair, age = audience
        campaign_collection[key] = Campaign.new(
          key,
          state,
          hair,
          age,
          impression)
      end
    end
  end

  # regex might be more efficient
  def source1_parse_line(line)
    key, audience, impression = line.chomp.split(",")
    [key, audience.split("_"), impression.to_i]
  end

  # Format
  # campaign_id, ad_type, date, spend, actions
  # 856c435c-2dd1-42dd-ad40-b4d3c24d99d9,photo,2017-06-21,943,"[{""A"": 47, ""action"": ""views""}]"
  def parse_source2(filename)
    File.open(filename, "r").each_with_index do |line, index|
      next if index == 0

      key, ad_type, date, spend, actions = source2_parse_line(line)

      campaign_date = { date => {
        ad_type: ad_type,
        spend: spend,
        actions: actions
      } }

      unless campaign_collection[key]
        campaign_collection[key] = Campaign.new(key)
      end
      campaign_collection[key].total_spending += spend
      campaign_collection[key].date << campaign_date
    end
  end

  # This logic should be refactored, but later, since this is part of
  # boot up
  def source2_parse_line(line)
    line_array = line.chomp.split(",")
    key, ad_type, date, spend = line_array[0..3]
    actions = line_array[4..-1].join(",").gsub('""', '"')

    [key, ad_type, date, spend.to_i, JSON.parse(actions[1...-1])]
  end

  # Map the data from each part of the campaign
  # Campaign - itself
  # State, Hair, Age Range
  # Sources, Actions
  # Date
  # ad_type
  # While requiring more space, this will provide faster look up
  # Format will be a symbol(each part) pointing to a hash of data
  def data_map
    {
      campaign:   map_campaign,
      state:      map_state,
      hair_color: map_hair_color,
      age_range:  map_age_range,
      source:     map_source,
      action:     map_action,
      date:       map_date,
      ad_type:    map_ad_type
    }
  end

  def map_campaign
    campaign_collection
  end

  def map_state
    state_hash = Hash.new do |h, k| h[k] = {
      campaign_id: [],
      total_spending: 0,
      total_impression: 0
      }
    end
    campaign_collection.each do |camp_id, campaign|
      state_hash[campaign.state][:campaign_id] << camp_id
      state_hash[campaign.state][:total_spending] += campaign.total_spending
      state_hash[campaign.state][:total_impression] += campaign.impression
    end
    state_hash
  end

  def map_hair_color
    hair_hash = Hash.new do |h, k| h[k] = {
      campaign_id: [],
      total_spending: 0,
      total_impression: 0
      }
    end
    campaign_collection.each do |camp_id, campaign|
      hair_hash[campaign.hair_color][:campaign_id] << camp_id
      hair_hash[campaign.hair_color][:total_spending] += campaign.total_spending
      hair_hash[campaign.hair_color][:total_impression] += campaign.impression
    end
    hair_hash
  end

  def map_age_range
    age_hash = Hash.new do |h, k| h[k] = {
      campaign_id: [],
      total_spending: 0,
      total_impression: 0
      }
    end
    campaign_collection.each do |camp_id, campaign|
      age_hash[campaign.age_range][:campaign_id] << camp_id
      age_hash[campaign.age_range][:total_spending] += campaign.total_spending
      age_hash[campaign.age_range][:total_impression] += campaign.impression
    end
    age_hash
  end

  # map_source and map_action feels like it can be refactored
  # later, this is part of load time
  def map_source
    source_hash = Hash.new do |h, k| h[k] = {
      campaign_id: [],
      report_count: Hash.new(0)
      }
    end
    campaign_collection.each do |k, v|
      v.date.each do |campaign_date_hash|
        campaign_date_hash.each do |date, ad_spend_action_hash|
          ad_spend_action_hash[:actions].each do |campaign_source_hash|
            action_source, report_num = campaign_source_hash.to_a.first
            source_hash[action_source][:report_count][campaign_source_hash["action"]] += 1
            source_hash[action_source][:campaign_id] << [k, date, campaign_source_hash["action"], report_num]
          end
        end
      end
    end
    source_hash
  end

  def map_action
    action_hash = Hash.new do |h, k| h[k] = {
      campaign_id: []
      }
    end
    campaign_collection.each do |k, v|
      v.date.each do |campaign_date_hash|
        campaign_date_hash.each do |date, ad_spend_action_hash|
          ad_spend_action_hash[:actions].each do |campaign_action_hash|
            action_source = campaign_action_hash.to_a.first
            action_hash[campaign_action_hash["action"]][:campaign_id] << [k, date, action_source]
          end
        end
      end
    end
    action_hash
  end

  def map_date
    date_hash = Hash.new do |h, k| h[k] = {
      campaign_id: []
      }
    end
    campaign_collection.each do |k, v|
      v.date.each do |campaign_date_hash|
        campaign_date_hash.each do |date, _ad_spend_action|
          date_hash[date][:campaign_id] << k
        end
      end
    end
    date_hash
  end

  def map_ad_type
    ad_hash = Hash.new do |h, k| h[k] = {
      campaign_id: [],
      total_spending: 0,
      action_total: Hash.new(0)
      }
    end
    campaign_collection.each do |k, v|
      v.date.each do |campaign_date_hash|
        campaign_date_hash.each do |date, ad_spend_action_hash|
          ad_type = ad_spend_action_hash[:ad_type]
          spend = ad_spend_action_hash[:spend]
          actions = ad_spend_action_hash[:actions]

          # Format of each action
          # {"D"=>15, "action"=>"conversions"}
          # actions, array of hash action
          actions.each do |action|
            reported_value = 0
            # {"source" => "D", "value"=>15, "action"=>"conversions"}
            # would be a more intuitive format for this
            # or a string "conversion_D_15"
            action.each do |key, val|
              next if key == "action"
              reported_value += val
            end
            ad_hash[ad_type][:action_total][action["action"]] += reported_value
          end

          ad_hash[ad_type][:total_spending] += spend
          ad_hash[ad_type][:campaign_id] << [k, date]
        end
      end
    end
    ad_hash
  end

end


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


# DATA MAP SAMPLE STATE
# {
#   campaign:   {
#     "campaign_id" => <Campaign Object>,
#     "campaign_id" => <Campaign Object>,
#     "campaign_id" => <Campaign Object>
#     ...
#   },
#   state: {
#     "NY" => {
#       campaign_id: [ array_of_campaign_ids ],
#       total_spending: number,
#       total_impression: number
#     },
#     "SD" => {
#       campaign_id: [ array_of_campaign_ids ],
#       total_spending: number,
#       total_impression: number
#     }
#     ...
#   },
#   hair_color: {
#     "blue" => {
#       campaign_id: [ array_of_campaign_ids ],
#       total_spending: number,
#       total_impression: number
#     },
#     "purple" => {
#       campaign_id: [ array_of_campaign_ids ],
#       total_spending: number,
#       total_impression: number
#     }
#     ...
#   },
#   age_range:  {
#     "23-39" => {
#       campaign_id: [ array_of_campaign_ids ],
#       total_spending: number,
#       total_impression: number
#     },
#     "33-45" => {
#       campaign_id: [ array_of_campaign_ids ],
#       total_spending: number,
#       total_impression: number
#     }
#     ...
#   },
#   source:     {
#     "A" => {
#       campaign_id: [
#         [id, date, action, value],
#         [id, date, action, value],
#         ...
#       ],
#       report_count: number
#     },
#     "B" => {
#       campaign_id: [
#         [id, date, action, value],
#         [id, date, action, value],
#         ...
#       ],
#       report_count: number
#     }
#     ...
#   },
#   action: {
#     "click" => {
#       campaign_id: [
#         [k, date, source],
#         [k, date, source],
#         ...
#       ]
#     },
#     "views" => {
#       campaign_id: [
#         [k, date, source],
#         [k, date, source],
#         ...
#       ]
#     }
#     ...
#   },
#   date: {
#     "2017-06-23" => {
#       campaign_id: [ array_of_campaign_ids ]
#     },
#     "2017-07-23" => {
#       campaign_id: [ array_of_campaign_ids ]
#     }
#     ...
#   },
#   ad_type: {
#     "video" => {
#       campaign_id: [
#         [id, date],
#         [id, date],
#         ...
#       ],
#       total_spending: number,
#       action_total: {
#         "click" => number,
#         "views" => number
#         ...
#       }
#     },
#     "photo" => {
#       campaign_id: [
#         [id, date],
#         [id, date],
#         ...
#       ],
#       total_spending: number,
#       action_total: {
#         "click" => number,
#         "views" => number
#         ...
#       }
#     }
#     ...
#   }
# }
