# GetSwift Code Test
This code test is divided into two parts, a code writing portion, and an analysis portion, where you'll discuss your implementation and how it can be extended.

## The scenario
You run a drone delivery company. Packages arrive at your depo to be delivered by your fleet of drones.

## The problem
Your solution should take two inputs: a list of drones, and a list of packages; and produce two outputs: a list of assignments of packages to drones, and a list of packages that could not be assigned. For example, you could produce the following output:

```javascript
{
  assignments: [{droneId: 1593, packageId: 1029438}, {droneId: 1251, packageId: 1029439}]
  unassignedPackageIds: [109533, 109350, 109353]
}
```

## How to run
Run the following commands in terminal after cloning the project. Be sure to be in the project folder.
```
$ npm install
$ node gs_codetest.js
```

## Analysis
After you've implemented your solution, try answering the following questions. We're not really looking for a particular answer; we're more interested in how well you understand your choices, and how well you can justify them.

- How did you implement your solution?
   + I picked axios for my data retrieval because compared to jQuery, which handles much more than HTTP requests, is lighter, since axios only handles HTTP requests. Compared to fetch, axios is supported by all browswers.
   + The solution is split into 3 parts, data structure, data retrieval, data computation. 
   + Data Structure: Implementing both drones and packages in a data structure helps with ease of code readability but also potential future additions: e.g. If drone speeds were consistent for each drone but changed depending on the weight of the package(s). This calculation can be done within the drone class upon initializing the drone. Modifying the code for this change would be simple since the computation algorithm takes in speed as an argument.
   + Data Retrieval: This part was a straight forward retrieval of the data. Upon successfully retrieving both sets of data, it would be parsed and then passed down to data computation.
   + Data Computation: Each package will have an array of drones and the total time it takes to delivery this package. The packages will then select the drone that delivers the package in the shortest time possible as per the instructions. For this section I believe that as opposed to selecting the fastest time for delivery, choosing the best possible combination of drones to packages that yields the most number of packages deliveryed withing the deadlines is more appealing. This will require much more to compute but potentially may be a better approach.
- Why did you implement it this way?
   + I envisioned the solution to live in a backend server where when requesting for this data, which lives on potentially 2 seperate servers (hence 2 API calls), to be requested, aquired, then computed and the resulting data would be sent back however format it needs to be in. Since the data computation could only be run after aquiring both sets of data, javascript promises were utilized to ensure that before the data was retrieved, computation would not run. 
   + The computation file on the otherhand, is resuable for other uses, such as existing data in the database, or test computation for potential drones and package delivery.
- Let's assume we need to handle dispatching thousands of jobs per second to thousands of drivers. Would the solution you've implemented still work? Why or why not? What would you modify? Feel free to describe a completely different solution than the one you've developed.
   + I would run a benchmark on the computation, data parsing, and the axios request. If the bottleneck is in the computation, which I suspect would be the case since the runtime is O(n*m) in the calculateDeliveryAllPackages function, then refactoring the computation would be best. If refactoring is not possible, then my next solution will pair with the solution for, if the request for data is the bottleneck, which would be to request and compute the data before it's requested. Setting driver routes is not something that changes immediately or regularly once set, so at approximately three times day(arbitrarily), the data could be retrieved and computed before it is requested. The bottleneck should not be in the data parsing, since it is linear time, and any sort of algorithm for data computation will at fastest be linear.
