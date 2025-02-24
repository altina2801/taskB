const express = require('express');
const mongodb = require('../rent');
const router = express.Router();
const carsCollection = mongodb.collection('cars');

// Add a Car
router.post('/cars', async (req, res) => {
    const { name, price_per_day, year, color, steering_type, number_of_seats } = req.body;


    if (!name || !price_per_day || !year || !color || !steering_type || !number_of_seats) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        // Insert car into MongoDB
        const result = await mongodb.collection('cars').insertOne({
            name,
            price_per_day,
            year,
            color,
            steering_type,
            number_of_seats
        });

        res.status(201).json({ message: 'Car added successfully', carId: result.insertedId });
    } catch (error) {
        console.error('Error adding car:', error);
        res.status(500).json({ message: 'Error adding car' });
    }
});

// Get Rental Cars with Filters
app.get('/rental-cars', async (req, res) => {
    const { year, color, steering_type, number_of_seats } = req.query;

    const query = {}; 

 
    if (year) query.year = parseInt(year); 
    if (color) query.color = color;
    if (steering_type) query.steering_type = steering_type;
    if (number_of_seats) query.number_of_seats = parseInt(number_of_seats);  

    try {
        // Fetch filtered cars from the database and sort by price (lowest to highest)
        const cars = await mongodb.collection('cars').find(query).sort({ price_per_day: 1 }).toArray();
        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ message: 'Error fetching cars' });
    }
});


module.exports = router;
