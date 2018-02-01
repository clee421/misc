  // Get data, make sure data for both packages and drones are retrieved before computing
  // store data into proper data structures
  // compute output
  // var seconds = Math.floor(new Date().getTime() / 1000);

const axios = require('axios');
const Drone = require('./Drone.js');
const Package = require('./Package.js');

axios.get('https://codetest.kube.getswift.co/drones')
  .then(function (response) {
    parseDroneData(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

axios.get('https://codetest.kube.getswift.co/packages')
  .then(function (response) {
    parsePackageData(response.data);
  })
  .catch(function (error) {
    console.log(error);
  });

const parseDroneData = function(data) {
  const dronesArray = [];
  for (let i = 0; i < data.length; i++) {
    const id = data[i]['droneId'];
    const lat = data[i]['location']['latitude'];
    const long = data[i]['location']['longitude'];
    const packages = data[i]['packages'];

    const packagesArray = [];
    for (let j = 0; j < packages.length; j++) {
      const packageId = packages[j]['packageId'];
      const packageLat = packages[j]['destination']['latitude'];
      const packageLong = packages[j]['destination']['longitude'];
      const packageDeadline = packages[j]['deadline'];

      const tempPackage = new Package(packageId, packageLat, packageLong, packageDeadline);
      packagesArray.push(tempPackage);
    }

    const tempDrone = new Drone(id, lat, long, packages);
    dronesArray.push(tempDrone);
  }
  console.log(dronesArray);
};

const parsePackageData = function(data) {
  const packagesArray = [];
  for (let i = 0; i < data.length; i++) {
    const packageId = data[i]['packageId'];
    const packageLat = data[i]['destination']['latitude'];
    const packageLong = data[i]['destination']['longitude'];
    const packageDeadline = data[i]['deadline'];

    const tempPackage = new Package(packageId, packageLat, packageLong, packageDeadline);
    packagesArray.push(tempPackage);
  }
  console.log(packagesArray);
};