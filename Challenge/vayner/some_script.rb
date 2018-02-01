source1_array = []
source2_array = []

source1_hash = Hash.new { |h, k| h[k] = [] }
source2_hash = Hash.new { |h, k| h[k] = [] }

ad_type_hash = {}

File.open("source1.csv", "r") do |f|
  f.each_line do |line|
    source1_array << line.chomp
    split_source = source1_array.last.split(",")
    source1_hash[split_source.first] << split_source[1..-1]
  end
end

File.open("source2.csv", "r") do |f|
  f.each_line do |line|
    source2_array << line.chomp
    split_source = source2_array.last.split(",")
    ad_type_hash[split_source[1]] = true
    source2_hash[split_source.first] << split_source[1..-1]
  end
end

puts "source1.csv"
puts "Number of rows in source1_array: #{source1_array.length}"
puts "Number of rows in source1_array: #{source1_array[0]}"
puts "Number of rows in source1_array: #{source1_array[1]}"
puts "Number of unique campaign id's: #{source1_hash.size}"
# source1_hash.each { |k, _| puts k if source1_hash[k].size > 1 }

puts "source2.csv"
puts "Number of rows in source2_array: #{source2_array.length}"
puts "Number of rows in source2_array: #{source2_array[0]}"
puts "Number of rows in source2_array: #{source2_array[1]}"
puts "Number of unique campaign id's: #{source2_hash.size}"
# source1_hash.each { |k, _| puts k if source1_hash[k].size > 1 }


diff_hash = source1_hash.select do |_, v|
  v.map(&:first).uniq.length > 1
end
puts "source1 difference hashs"
p diff_hash

puts "source2 ad types"
p ad_type_hash.keys
# source1_hash["52bc6bdd-a48a-4e19-902c-1b668aeb5562"].each do |el|
#   key, audience, impression = el.split(",")
#   puts "Key: #{key}"
#   puts "Audience: #{audience}"
#   puts "Impression: #{impression}"
# end

data_hash = Hash.new { |h, k| h[k] = [] }

source1_array[1..-1].each do |line|
  line_array = line.split(",")
  data_hash[line_array.first] << line_array[1..-1]
end

source2_array[1..-1].each do |line|
  line_array = line.split(",")
  data_hash[line_array.first] << line_array[1..-1]
end

puts "data_hash"
# puts data_hash.keys
puts "Number of total unique campaign id's: #{data_hash.size}"
# data_hash["52bc6bdd-a48a-4e19-902c-1b668aeb5562"].each do |el|
#   p el
# end
