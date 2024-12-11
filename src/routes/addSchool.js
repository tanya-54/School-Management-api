const express = require('express');
const router = express.Router();
const db = require('../database');

router.post('/addSchool', async (req, res) => {
    try {
        const { name, address, latitude, longitude } = req.body;

        if (!name || !address || latitude === undefined || longitude === undefined) {
            return res.status(400).json({ error: 'All fields are required: name, address, latitude, longitude' });
        }

        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        const [result] = await db.execute(query, [name, address, latitude, longitude]);

        res.status(201).json({
            message: 'School added successfully',
            schoolId: result.insertId,
        });
    } catch (error) {
        console.error('Error adding school:', error);
        res.status(500).json({ error: 'An error occurred while adding the school' });
    }
});

module.exports = router;
