const express = require('express');
const router = express.Router();
const db = require('../database'); 

router.post('/addSchool', async (req, res) => {
    const { name, address, latitude, longitude } = req.body;

    
    if (!name || !address || typeof latitude !== 'number' || typeof longitude !== 'number') {
        return res.status(400).json({ error: "All fields (name, address, latitude, longitude) are required and must be valid." });
    }

    try {
        const query = 'INSERT INTO schools (name, address, latitude, longitude) VALUES (?, ?, ?, ?)';
        await db.execute(query, [name, address, latitude, longitude]);

        res.status(201).json({ message: "School added successfully." });
    } catch (error) {
        console.error("Error adding school:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;