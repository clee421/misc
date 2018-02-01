require 'json'

test_json = "[{\"\"A\"\": 47, \"\"action\"\": \"\"views\"\"}]"
test_json = test_json.gsub('""', '"')
my_hash = JSON.parse(test_json)
p my_hash
