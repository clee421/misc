##Greetings Fellow Developer!

Thanks for your interest in SumZero and welcome to our Back-end Challenge! To kick off our interview process, we'd like you to solve a few problems to help us gauge your back-end experience.

##A few notes to get you started.

* The test is designed to take about two hours, but you are allotted about four. If you need more time, that's fine, but we will factor in the total time you take to complete the challenge into our evaluation. However, we strongly prefer quality submissions over hasty and incomplete work, so it's in your best interest to stick with it and finish, putting on your best show!
* The project environment already contains a working gemfile with rspec. All you need to do is install ruby (if you don't have it already), run bundle install and you should be good to go.
* Feel free to contact us if you need clarification (this is expected), and you are free to use any online resources, but please do not collaborate or share your work with anyone else.
* DO NOT publish the exam or your work (e.g., to your own Github!). Please respect our need to accurately assess candidates and give everyone an equal opportunity.

##Challenge 1: Refactor Idea#bloomberg_symbol and Idea#yahoo_symbol
You must refactor two model methods, separating out responsibilites to the models in the association chain (Idea hm Positions bt Asset hm AssetSymbols). We have provided idea_spec.rb where you must write two (or more) tests on the methods to ensure they behave as expected. You are not required to write tests on the other models to cover the new responsibilities, but if you have extra time it will count for bonus points.

To make your job easier, we have provided factories (via FactoryGirl) which automatically create all associated models for you. Check out spec/factories for more detail.

## Challenge 2: Refactor ResearchItemsController#create
You have been given a legacy controller without tests which you must clean up:

1. Write controller tests to cover all paths through the create action. You have been given a ResearchedItem and a BloombergResearch factory to aid in testing.

2. Refactor the action, pushing responsibilities into the model and/or any service classes you feel appropriate (you may create any additional classes as you deem necessary). Hint: your controller code should be very minimal at the end.

3. Refactor your tests (commenting out those which are now irrelevant so we can see them) to match the new division of labor (creating new model/service test classes and associated tests where appropriate).

Your final set of tests should pass and the overall behavior of the create action should remain unchanged from its initial form.

Hint: current_user is a devise feature which allows you to access the logged-in user. You may either stub current_user on the controller or use the devise sign_in helper (see http://stackoverflow.com/questions/7452295/rspec-controller-test-with-devise-authentication), your choice (stubbing probably will be easier). We have included all the necessary devise infrastructure.

##Challenge 3: Design a Flag Module
Imagine you need to allow users to flag three different kinds of items on SumZero (comments, ideas, and quick ideas). You want to develop a common module that is shared with each model to keep things DRY.

1. Database Design. We've created a simple schema to get you started. You'll need to create a migration which embodies your design decisions, e.g., how will you record when an item has been flagged?
2. Module logic. Create the necessary interface for the view layer to interact with your module. Hint: How will it tell what has been flagged and how will it flag items? You'll probably want a "flag_item!" method as well as a "flagged?" method. Feel free to add additional methods if you think they would be useful.
3. Tests. Write tests for your module (if you didn't already in step 2). 