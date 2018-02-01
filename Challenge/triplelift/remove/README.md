# Solutions Challenge

Given the current problem from Thomas:

I recently activated a Land Rover Campaign, tactic ID 343664. We're seeing a delivery in our system but TripleLift numbers are roughly 4.45% higher compared to third party numbers. The pixel they are using is http://ec2-50-16-41-235.compute-1.amazonaws.com:8002/support.php.
They gave me a log level data for us to explore. Any chance you can take a look? Let me know if you need additional information.
\- Thomas

Solve the 3 issues below:
  1. Analysis   
  2. Exploration
  3. Scripting Analysis

### Installation

test_tactic_imp_pixel.js requires:
 - [Node.js](https://nodejs.org/) (to run)
 - [Mocha](https://mochajs.org/) (to test)

After cloning cd into the Solutions.Challenge folder. Install the dependencies and execute the script. 
```sh
$ cd Solutions.Challenge
$ npm install
$ node ./src/test_tactic_imp_pixel.js ./src/tactic.csv 100 10000
```

Use npm test for running the tests
```sh
$ npm test
```

A sample output can be found in output.txt

Usage is as follows:
node <script_name> <filename> <block_size> <wait_time(ms)>
