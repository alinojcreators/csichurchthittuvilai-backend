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
