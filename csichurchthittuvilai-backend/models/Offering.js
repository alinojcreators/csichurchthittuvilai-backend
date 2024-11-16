const mongoose = require('mongoose');

const offeringSchema = new mongoose.Schema({
  amount: { type: Number, required: true },
  date: { type: Date, required: true },
  memberId: { type: mongoose.Schema.Types.ObjectId, ref: 'Member', required: true }
});

module.exports = mongoose.model('Offering', offeringSchema);