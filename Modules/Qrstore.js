
const mongoose = require('mongoose');

const QRcodes = new mongoose.Schema({
  QRURL: String,
  QRUniqueID: String,
  QRUserID: String,
  BookedDate:String,
  Amount:String,
  TicketCount:String

});

const QR = mongoose.model("QRCodes", QRcodes);

module.exports = QR;
