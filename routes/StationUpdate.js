// routes/items.js
const express = require('express');
const router = express.Router();
const Item = require('../Modules/railData');

const stationData = [
  "Pettah", 
  "Baseline Road",
  "Cotta Road",
  "Narahenpita",
  "Kirulapana",
  "Nugegoda",
  "Pengiriwatta",
  "Udahamulla",
  "Navinna",
  "Maharagama",
  "Pannipitiya",
  "Kottawa",
  "Makumbura",
  "Hospital-Homagama",
  "Homagama",
  "Panagoda",
  "Godagama",
  "Megoda",
  "Watareka",
  "Padukka",
  "Arukawatta",
  "Angampitiya",
  "Uggalla",
  "Pinnawala",
  "Gammana",
  "Morakele",
  "Waga",
  "Kadugoda",
  "Kosgama",
  "Puwakpitiya",
  "Avissawella"
];

const stationObjects = stationData.map((station, index) => ({
  stationName: station.trim(),
  keyIdvalue: index + 1,
}));



router.post("/addstationList", async (req, res) => {
  try {

    const insertedStations = await Item.insertMany(stationObjects);

    res.status(201).json(insertedStations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal server error' });
  }

});

router.get("/searchStations", async (req, res) => {
  try {
    const stations = await Item.find();
    res.status(200).json(stations);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;


