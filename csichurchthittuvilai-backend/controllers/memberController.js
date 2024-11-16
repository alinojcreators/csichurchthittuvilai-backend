const Member = require('../models/member');

// Get all members
exports.getMembers = async (req, res) => {
  try {
    const members = await Member.find();
    res.json(members);
  } catch (err) {
    res.status(500).send(err);
  }
};
// Get members by Family ID
exports.getMembersByFamilyId = async (req, res) => {
  console.log(req.body,"dlkkdk")
  const { familyId } = req.params;

  try {
    const members = await Member.find({ familyId });
    res.status(200).json(members);
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};
// Create a new member
exports.createMember = async (req, res) => {
  const member = new Member(req.body);
  try {
    const newMember = await member.save();
    res.json(newMember);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Update a member
exports.updateMember = async (req, res) => {
  try {
    const updatedMember = await Member.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedMember);
  } catch (err) {
    res.status(500).send(err);
  }
};

// Delete a member
exports.deleteMember = async (req, res) => {
  try {
    await Member.findByIdAndDelete(req.params.id);
    res.json({ message: 'Member deleted' });
  } catch (err) {
    res.status(500).send(err);
  }
};
