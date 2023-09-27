
const mongoose = require('mongoose');

const railwayStations = new mongoose.Schema({
  stationName: String,
  keyIdvalue: String
});

const Item = mongoose.model("railwayStations", railwayStations);

module.exports = Item;
