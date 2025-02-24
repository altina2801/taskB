const express = require('express');
const mongodb = require('../rent');  // Ensure this is the correct path to your MongoDB client
const router = express.Router();
const carsCollection = mongodb.collection('cars');

router.post('/cars', async (req, res) => {
    let cars = req.body;

    // If the request body is not an array, make it an array with one car
    if (!Array.isArray(cars)) {
        cars = [cars]; // Wrap the single car in an array
    }

    // Loop through each car and validate fields
    for (let car of cars) {
        const { name, price_per_day, year, color, steering_type, number_of_seats } = car;
        
        // Check if required fields are missing in any car
        if (!name || !price_per_day || !year || !color || !steering_type || !number_of_seats) {
            return res.status(400).json({ message: 'All fields are required for each car' });
        }
    }

    try {
        // Insert multiple cars (even if there's only one) into MongoDB
        const result = await carsCollection.insertMany(cars);

        // Respond with the number of cars inserted
        res.status(201).json({
            message: `${result.insertedCount} car(s) added successfully`,
            carIds: result.insertedIds
        });
    } catch (error) {
        console.error('Error adding cars:', error);
        res.status(500).json({ message: 'Error adding cars' });
    }
});

router.get('/rental-cars', async (req, res) => {
    const { year, color, steering_type, number_of_seats } = req.query;

    // Build the query object
    const query = {}; 

    if (year) query.year = parseInt(year); 
    if (color) query.color = color;
    if (steering_type) query.steering_type = steering_type;
    if (number_of_seats) query.number_of_seats = parseInt(number_of_seats);  

    try {
        // Fetch filtered cars from the database and sort by price (lowest to highest)
        const cars = await carsCollection.find(query).sort({ price_per_day: 1 }).toArray();

        // Check if no cars were found with the given filters
        if (cars.length === 0) {
            return res.status(404).json({ message: 'Sorry, we do not have any cars matching your request.' });
        }

        res.json(cars);
    } catch (error) {
        console.error('Error fetching cars:', error);
        res.status(500).json({ message: 'Error fetching cars' });
    }
});

module.exports = router;