# Task: Find the most common occurring words
# - Potentially multiple words may have a tie on being the most common
# - On the same note the most common word may only be just one word

# Considerations: pluralization will count
# Note: if pluralization does not count then a library can be imported
#       to singularize the word: require 'active_support/inflector'
# - king, king's, kings will be considered different words
# - family, families will be considered different words

# Considerations: conjunctions and prepositions should not count
# - e.g. "by", "with", "and", "but", etc...

# Considerations: english dictionary has an upper bounds of 200,000
#                 words and a hash will fit them all

# Alternatives: After opening the files, each line can be saved
#               but this may pose a problem when the files contains
#               large amounts of data

# Retrieves all .txt files in directory in array
# Dir["./test_docs/*.txt"]

# Populate ignore_hash with a list of words to ignore
ignore_hash = {}
Dir["./ignore_words/*.txt"].each do |filename|
  File.open(filename, "r") do |f|
    f.each_line do |line|
      ignore_hash[line.chomp] = true
    end
  end
end

# Count the occurence of each word not ignored
word_count_hash = Hash.new(0)

# Keeping track of the word with the most occurences
# If more than one word or a sorted list of words by occurence
# is required, use the sort_by below
most_occ_word = ""
most_occ_count = -1

Dir["./test_docs/*.txt"].each do |filename|
  File.open(filename, "r") do |f|
    f.each_line do |line|
      line.chomp.split(" ").each do |word|
        word = word.downcase.delete(",.?!;:")
        unless ignore_hash[word]
          word_count_hash[word] += 1
          if word_count_hash[word] > most_occ_count
            most_occ_count = word_count_hash[word]
            most_occ_word = word
          end
        end
      end
    end
  end
end
# sort_by is done in O(nlogn) so we'll just keep track of the largest
# count while running through the file
# sorted_count = word_count_hash.sort_by { |_, v| v }.reverse

puts "Word with most occurences: #{most_occ_word}"
puts "Count of occurences: #{most_occ_count}"

# We are opening the files again and running through each line
# The alternative would be to store all lines into an array but
# that would require more resources than necessary
# NOTE: There were no specifications regarding where to output
# the data. This could be outputed to a .txt file if necessary
Dir["./test_docs/*.txt"].each do |filename|
  puts "\n\n"
  puts "#{filename} has these lines with #{most_occ_word}"
  puts "*************************************************"
  File.open(filename, "r") do |f|
    f.each_line do |line|
      if line.chomp.include?(most_occ_word)
        puts "\n"
        puts line.chomp
        puts "\n"
      end
    end
  end
end
