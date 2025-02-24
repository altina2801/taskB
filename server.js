const express = require('express');
const dotenv = require('dotenv');
dotenv.config();

const app = express();
app.use(express.json());


const authRoutes = require('./routes/authRoutes');
const carRoutes = require('./routes/carRoutes');

app.use(authRoutes);
app.use(carRoutes);

// Start Server
app.listen(3000, () => {
    console.log('Server running on port 3000');
});
