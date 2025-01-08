const express = require('express');

const router = express.Router();

// Create a new whiteboard
router.post('/', async (req, res) => {
    const { name, data } = req.body;

    res.status(201).json({ message: 'Whiteboard Created', name:name, data:data });
});

// Get all whiteboards
router.get('/', async (req, res) => {
    res.status(200).json({ message: 'All Whiteboards' });
});

// Get a specific whiteboard by ID
router.get('/:id', async (req, res) => {
    res.status(200).json({message : `Whiteboard Received with id: ${req.params.id}`});
});

// Update a whiteboard
router.put('/:id', async (req, res) => {
    const { name, data } = req.body;
    res.status(200).json({message : `Whiteboard updated with id: ${req.params.id}`, name:name, data:data});
});

// Delete a whiteboard
router.delete('/:id', async (req, res) => {
    res.status(200).json({message : `Whiteboard Deleted with id: ${req.params.id}`});
});

module.exports = router;