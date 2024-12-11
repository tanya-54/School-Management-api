const express = require('express');
const app = express();
const dotenv = require('dotenv');
const addSchoolRoute = require('./routes/addSchool');
const listSchoolsRoute = require('./routes/listSchools');

dotenv.config();

app.use(express.json());

app.use('/api', addSchoolRoute);
app.use('/api', listSchoolsRoute);

app.get('/', (req, res) => {
    res.send('School Management API is running!');
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
