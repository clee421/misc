# arr = []
#
# %w(I you he she it we they me him her us them).each {|w| arr << w.downcase}
#
#
# %w(I you he she it we they what who).each {|w| arr << w.downcase}
#
# %w(me him her it us you them whom).each {|w| arr << w.downcase}
#
#
# %w(mine yours his hers ours theirs).each {|w| arr << w.downcase}
#
# %w(this that these those).each {|w| arr << w.downcase}
#
#
# %w(who whom which what whose whoever whatever whichever whomever).each {|w| arr << w.downcase}
#
#
# %w(who whom whose which that what whatever whoever whomever whichever).each {|w| arr << w.downcase}
#
#
# %w(myself yourself himself herself itself ourselves themselves).each {|w| arr << w.downcase}
#
#
# %w(myself yourself himself herself itself ourselves themselves).each {|w| arr << w.downcase}
#
# arr.uniq.sort.each {|w| puts w}

File.open("./ignore_words/aux_verb.txt", "r") do |f|
  f.each_line do |line|
    line.chomp.split(" ").each do |word|
      puts word.downcase.delete(",()")
    end
  end
end
