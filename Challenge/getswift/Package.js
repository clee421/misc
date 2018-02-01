class Package {
  // id, lat, long, deadline will be a Number
  // package destination is the lat and long, extracted for easier access
  constructor(id, lat, long, deadline) {
    this.id = id;
    this.latitude = lat;
    this.longitude = long;
    this.deadline = deadline;
  }

}

module.exports = Package;