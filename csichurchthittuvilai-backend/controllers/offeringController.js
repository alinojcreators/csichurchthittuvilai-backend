const Offering = require('../models/Offering');

// Create a new offering
exports.createOffering = async (req, res) => {
  const { amount, date, memberId } = req.body;

  try {
    const newOffering = new Offering({ amount, date, memberId });
    await newOffering.save();
    res.status(201).json({ message: 'Offering created successfully', offering: newOffering });
  } catch (error) {
    console.error('Error creating offering:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Get all offerings
exports.getOfferings = async (req, res) => {
  try {
    const offerings = await Offering.find().populate('memberId');
    res.status(200).json(offerings);
  } catch (error) {
    console.error('Error fetching offerings:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update an offering
exports.updateOffering = async (req, res) => {
  const { id } = req.params;
  const { amount, date, memberId } = req.body;

  try {
    const updatedOffering = await Offering.findByIdAndUpdate(id, { amount, date, memberId }, { new: true });
    if (!updatedOffering) {
      return res.status(404).json({ message: 'Offering not found' });
    }
    res.status(200).json({ message: 'Offering updated successfully', offering: updatedOffering });
  } catch (error) {
    console.error('Error updating offering:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Delete an offering
exports.deleteOffering = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedOffering = await Offering.findByIdAndDelete(id);
    if (!deletedOffering) {
      return res.status(404).json({ message: 'Offering not found' });
    }
    res.status(200).json({ message: 'Offering deleted successfully' });
  } catch (error) {
    console.error('Error deleting offering:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};