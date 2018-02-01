const computeData = function(data) {
  const DEPO_LOCATION = {lat: -37.816681, long: 144.963832}
  
  // array of class Drone
  const droneDataArray = data['droneData'];

  // array of class Package
  const packageDataArray = data['packageData']

  const packageDeliveryArray = calculateDeliveryAllPackages(droneDataArray, packageDataArray, DEPO_LOCATION);

  const calculateAssignments = calculateDroneAssignments(packageDeliveryArray);

  // console.log(calculateAssignments);
  return calculateAssignments;
};

// This method was only used to test for duplicates
// There are no duplicate drones
// There are no duplicate packages
const checkDuplicate = function(dataArray) {
  const packageIdArray = [];
  for (let i = 0; i < dataArray.length; i++) {
    if (packageIdArray.includes(dataArray[i].id)) {
      return true;
    } else {
      packageIdArray.push(dataArray[i].id);
    }
  }
  return false;
};

const calculateDistance = function(pointA, pointB) {
  const lat1 = pointA.lat;
  const lon1 = pointA.long;
  const lat2 = pointB.lat;
  const lon2 = pointB.long;
  	
  const R = 6371; // Radius of the earth in km
  const dLat = deg2rad(lat2 - lat1);  // deg2rad below
  const dLon = deg2rad(lon2 - lon1); 
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
    Math.sin(dLon / 2) * Math.sin(dLon / 2); 
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a)); 
  const d = R * c; // Distance in km
  return d;
};

const deg2rad = function(deg) {
  return deg * (Math.PI / 180);
};

const calculateTime = function(kmph, km) {
  return(km / kmph) * 3600 // 3600 sec in 1hr
};

const calculateTravelTime = function(kmph, pointA, pointB) {
  const distance = calculateDistance(pointA, pointB);
  return calculateTime(kmph, distance);
};

// Maps the array to an object for constant lookup time
const dataMap = function(dataArray) {
  const datamap = {};

  for (let i = 0; i < dataArray.length; i++) {
    datamap[dataArray[i].id] = dataArray[i];
  }
  return datamap;
};

// Format
// packageDeliveryArray = [
//   {packageID: [
//     {droneID: deliveryTime},
//     {droneID: deliveryTime},
//     ...
//   ]},
//   {packageID: [
//     {droneID: deliveryTime},
//     {droneID: deliveryTime},
//     ...
//   ]},
//   ...
// ]
const calculateDeliveryAllPackages = function(droneArray, packageArray, DEPO_LOCATION) {
  // calculate this once and then just pass it to the calculateDelivery functin
  // calculating this dataMap each call on calculateDelivery is expensive
  const packageMap = dataMap(packageArray);
  const packageDeliveryArray = [];

  for (let i = 0; i < packageArray.length; i++) {
    const packageDeliveryTimeOfDrones = [];

    // Calculate the delivery time of each drone for this package
    for (let j = 0; j < droneArray.length; j++) {
      const droneID = droneArray[j].id;
      const droneTime = calculateDelivery(droneArray[j], packageArray[i], packageMap, DEPO_LOCATION);

      // Drone is only applicable for package delivery if the delivery time does not
      // exceed the deadline
      if (droneTime < packageArray[i].deadline) {
        packageDeliveryTimeOfDrones.push({[droneID]: droneTime})
      }
    }

    packageDeliveryArray.push({[packageArray[i].id]: packageDeliveryTimeOfDrones}) 
  }

  return packageDeliveryArray;
};

const calculateDelivery = function(aDrone, aPackage, packageMap, DEPO_LOCATION) {
  const DRONE_SPEED = 50; // km/h

  // if a drone has a package, it has to deliver that first, then return to depo
  // otherwise, drone will return to depo, then delivery package
  // there will be 4 locations, currentLocation, packageLocation, depoLocation, deliveryLcoation
  // drones will travel in the above order: current -> pacakge -> depo -> delivery
  let totalTravelTime = 0;

  let currentLocation = {lat: aDrone.latitude, long: aDrone.longitude};

  // This will run once, but it's set up for drones potentially that can carry more packages
  // or won't run if there are no packages and currentLocation does not change
  for (let i = 0; i < aDrone.packages.length; i++) {
    const lat = aDrone.packages[i].latitude;
    const long = aDrone.packages[i].longitude;
    const packageLocation = {lat, long};

    totalTravelTime += calculateTravelTime(DRONE_SPEED, currentLocation, packageLocation);

    // change currentLocation for next iteration
    currentLocation = packageLocation;
  }

  totalTravelTime += calculateTravelTime(DRONE_SPEED, currentLocation, DEPO_LOCATION);

  const deliveryLcoation = {lat: aPackage.latitude, long: aPackage.longitude};
  totalTravelTime += calculateTravelTime(DRONE_SPEED, DEPO_LOCATION, deliveryLcoation);

  const currentTime = Math.floor(new Date().getTime() / 1000);

  // Need current time + travel time to check if deadline can be met
  return currentTime + totalTravelTime;
};

const renderPackageDelivery = function(packageDeliveryArray) {
  for (let i = 0; i < packageDeliveryArray.length; i++) {
    console.log(packageDeliveryArray[i]);
  }
};

// Format
// {
//   assignments: [{droneId: 1593, packageId: 1029438}, {droneId: 1251, packageId: 1029439}]
//   unassignedPackageIds: [109533, 109350, 109353]
// }
const calculateDroneAssignments = function(packageDeliveryArray) {
  const assignments = [];
  const unassignedPackageIds = [];
  const seenDrones = {};

  for (let i = 0; i < packageDeliveryArray.length; i++) {
    for (let packageID in packageDeliveryArray[i]) {
      let minDroneId = null;
      let minDroneTime = null;

      const droneTimeArray = packageDeliveryArray[i][packageID]
      for (let j = 0; j < droneTimeArray.length; j++) {
        for (let droneID in droneTimeArray[j]) {

          const currentDroneTime = droneTimeArray[j][droneID];
          if (minDroneTime === null) { // drone not assigned yet
            if (!(seenDrones[droneID]) || currentDroneTime < minDroneTime) {
              minDroneId = droneID;
              minDroneTime = currentDroneTime;
              seenDrones[droneID] = true;
            }
          }
        }
      }

      if (minDroneId === null) {
        unassignedPackageIds.push(Number(packageID));
      } else {
        assignments.push({droneId: Number(minDroneId), packageId: Number(packageID)})
      }
    } // for (let packageID in packageDeliveryArray[i])
  } // for (let i = 0; i < packageDeliveryArray; i++)
  return {assignments, unassignedPackageIds}
};

module.exports = computeData;