const express = require('express');
const router = express.Router();
const db = require('../database'); 

const calculateDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371; 
    const toRadians = (degrees) => degrees * (Math.PI / 180);

    const dLat = toRadians(lat2 - lat1);
    const dLon = toRadians(lon2 - lon1);

    const a = 
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
};

router.get('/listSchools', async (req, res) => {
    const { latitude, longitude } = req.query;

    if (!latitude || !longitude || isNaN(latitude) || isNaN(longitude)) {
        return res.status(400).json({ error: "Valid latitude and longitude are required for query parameters" });
    }

    try {
        
        const [rows] = await db.execute('SELECT * FROM schools');

        
        const sortedSchools = rows.map((school) => ({
            ...school,
            distance: calculateDistance(Number(latitude), Number(longitude), school.latitude, school.longitude)
        })).sort((a, b) => a.distance - b.distance);

        res.status(200).json(sortedSchools);
    } catch (error) {
        console.error("Error listing schools:", error);
        res.status(500).json({ error: "Internal server error." });
    }
});

module.exports = router;
