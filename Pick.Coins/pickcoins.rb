# Coin game: Alice and Bob are playing a game using a bunch of coins. 
# The players pick several coins out of the bunch in turn. 
# Each time a player is allowed to pick 1, 2, or 4 coins, and the player that gets the last coin is the winner. 
# Assume that both players are very smart and he/she will try his/her best to work out a strategy to win the game. 
# For example, if there are 2 coins and Alice is the first player to pick, she will definitely pick 2 coins and win. 
# If there are 3 coins and Alice is stils the first player to pick, no matter she picks 1 or 2 coins, Bob will get the 
# last coin and win the game. 
# Given the number of coins and the order of players (which means the first and the second players to pick the coins), 
# you are required to write a program to calculate the winner of the game, and calculate how many different strategies 
# there are for he/she to win the game. 
# You should use recursion to solve the problem, and the parameters are read from the command line. 
# You can assume that there are no more than 30 coins.

def pickcoin(num_coins, player_one, player_two, picks = [1, 2, 4], winner_hash = Hash.new(0), level = 1)
  # If there aren't any coins then there's nothing to check
  if num_coins == 0
    return nil
  end
  
  # If player one can win with just picking the number of coins
  # with the available picks then he/she will
  if picks.include?(num_coins)
    return "#{player_one} 1"
  end

  # At this point it's not possible for player one to win
  # So he/she will try to not allow player two to win

  # Remove all the picks that are larger than the number
  # of coins. Can't take 4 coins if there are only 3 coins left
  valid_picks = picks.reject { |pick| pick > num_coins }

  # Reject all picks that will allow the other player to win
  possible_picks = valid_picks.reject do |pick|
    picks.include?(num_coins - pick)
  end

  # If possible picks is empty then it means that none of the valid
  # picks were viable so you return the other player winning
  if possible_picks.length == 0
    return "#{player_two} #{valid_picks.length}"
  end
end

# Here are some sample runs of the program:
puts pickcoin(1, 'alice', 'bob') == 'alice 1'
puts pickcoin(2, 'bob', 'alice') == 'bob 1'
puts pickcoin(3, 'alice', 'bob') == 'bob 2'
puts pickcoin(4, 'alice', 'bob', [1, 2]) == 'alice 2'
# puts pickcoin(10, 'alice', 'bob') == 'alice 22'
# puts pickcoin(25, 'alice', 'bob') == 'alice 3344'
# puts pickcoin(30, 'alice', 'bob') == 'bob 18272'

