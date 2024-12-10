const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const addSchoolRoutes = require('./routes/addSchool');
const listSchoolRoutes = require('./routes/listSchools');

dotenv.config();

const app = express();
app.use(bodyParser.json()); 

// Route Registration
app.use(addSchoolRoutes);
app.use(listSchoolRoutes);

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
