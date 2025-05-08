const express = require('express');
const router = express.Router();
const Inventory = require('../models/bloodinventory');
const fetchAdmin = require('../middleware/fetchadmin');

// Public: Get all inventory
router.get('/', async (req, res) => {
  try {
    const inventory = await Inventory.find();
    res.json(inventory);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Public: Get inventory for a specific hospital
router.get('/:hospitalName', async (req, res) => {
  try {
    const inventory = await Inventory.find({ hospitalName: req.params.hospitalName });
    res.json(inventory);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Admin: Add new inventory item
router.post('/', fetchAdmin, async (req, res) => {
  try {
    const { bloodType, quantity, hospitalName, hospitalLocation } = req.body;
    if (!bloodType || !quantity || !hospitalName || !hospitalLocation) {
      return res.status(400).json({ msg: 'All fields are required' });
    }

    const newItem = new Inventory({ bloodType, quantity, hospitalName, hospitalLocation });
    await newItem.save();
    res.json(newItem);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Admin: Update inventory item
router.put('/:id', fetchAdmin, async (req, res) => {
  try {
    const { bloodType, quantity, hospitalName, hospitalLocation } = req.body;
    const updatedItem = await Inventory.findByIdAndUpdate(
      req.params.id,
      { bloodType, quantity, hospitalName, hospitalLocation },
      { new: true }
    );

    if (!updatedItem) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    res.json(updatedItem);
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

// Admin: Delete inventory item
router.delete('/:id', fetchAdmin, async (req, res) => {
  try {
    const item = await Inventory.findById(req.params.id);
    if (!item) {
      return res.status(404).json({ msg: 'Item not found' });
    }

    await Inventory.findByIdAndDelete(req.params.id);
    res.json({ msg: 'Deleted successfully' });
  } catch (err) {
    res.status(500).send('Server Error');
  }
});

module.exports = router;
