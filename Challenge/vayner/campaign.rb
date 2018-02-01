# Assumptions (tested):
# All audience of a campaign_id have the same state, hair
# and age range
#  - Given the above, the impressions of the same audience target will
#    be added together

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
