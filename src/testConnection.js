const db = require('./database');
const dotenv = require('dotenv');

async function testDatabaseConnection() {
    try {
        const [rows] = await db.execute('SELECT 1 + 1 AS result');
        console.log('Database connected successfully! Test result:', rows[0].result);
    } catch (error) {
        console.error('Database connection failed:', error);
    }
}

testDatabaseConnection();
