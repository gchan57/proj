const express = require('express');
const router = express.Router();
const Gig = require('../models/Gig');

// GET all gigs (can be filtered by category or freelancerId)
router.get('/', async (req, res) => {
  try {
    const query = {};
    if (req.query.category && req.query.category !== 'All') {
      query.category = req.query.category;
    }
    if (req.query.freelancerId) {
      query.freelancerId = req.query.freelancerId;
    }
    const gigs = await Gig.find(query);
    res.json(gigs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// GET a single gig by ID
router.get('/:id', async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id);
    if (!gig) return res.status(404).json({ message: 'Gig not found' });
    res.json(gig);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// CREATE a new gig
router.post('/', async (req, res) => {
  const gig = new Gig(req.body);
  try {
    const newGig = await gig.save();
    res.status(201).json(newGig);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// UPDATE a gig
router.patch('/:id', async (req, res) => {
  try {
    const updatedGig = await Gig.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedGig);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// DELETE a gig
router.delete('/:id', async (req, res) => {
  try {
    await Gig.findByIdAndDelete(req.params.id);
    res.json({ message: 'Gig deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;