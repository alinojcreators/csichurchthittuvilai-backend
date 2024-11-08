// models/Member.js
const mongoose = require('mongoose');

const MemberSchema = new mongoose.Schema({
  familyId: { type: String, required: true },
  name: { type: String, required: true },
  contactNumber: { type: String, required: true },
  email: { type: String, required: true },
  baptismDate: { type: Date },
  communionDate: { type: Date },
  marriageDate: { type: Date },
  birthDate: { type: Date },
  joiningDate: { type: Date },
  otherInfo: { type: String },
});

module.exports = mongoose.model('Member', MemberSchema);
