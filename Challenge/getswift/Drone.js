class Drone {
  // id, lat, long will be a Number
  // drone location is the lat and long, extracted for easier access
  // packages will be an array of objects
  constructor(id, lat, long, packages) {
    this.id = id;
    this.latitude = lat;
    this.longitude = long;
    this.packages = packages;
  }

}

module.exports = Drone;