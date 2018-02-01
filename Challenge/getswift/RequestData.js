const axios = require('axios');
const Drone = require('./Drone.js');
const Package = require('./Package.js');

const requestData = function() {
  return Promise.all([retrieveDroneData(), retrievePackageData()])
    .then(function (response){
      const rawDroneData = response[0].data;
      const rawPackageData = response[1].data;

      const droneData = parseDroneData(rawDroneData);
      const packageData = parsePackageData(rawPackageData);

      return {droneData, packageData}
    });
};

const retrieveDroneData = function() {
  return axios.get('https://codetest.kube.getswift.co/drones')
};

const retrievePackageData = function() {
   return axios.get('https://codetest.kube.getswift.co/packages')
};

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

    const tempDrone = new Drone(id, lat, long, packagesArray);
    dronesArray.push(tempDrone);
  }

  return dronesArray;
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

  return packagesArray;
};

module.exports = requestData;