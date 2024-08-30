import express from 'express';
import cors from 'cors';
import { countNissansFromCk, cars } from './nissanFromCk.js';

const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());
app.use(express.static('public'));

// Get the count of Nissans with CK registration
app.get('/api/nissansFromCK', (req, res) => {
    res.json({ count: countNissansFromCk() });
});

// Get all cars
app.get('/api/cars', (req, res) => {
    res.json(cars);
});

// Add a new car
app.post('/api/cars', (req, res) => {
    const newCar = req.body;
    cars.push(newCar);
    res.status(201).json(newCar);
});

// Update a car by its registration number
app.put('/api/cars/:reg_number', (req, res) => {
    const index = cars.findIndex(car => car.reg_number === req.params.reg_number);
    if (index !== -1) {
        cars[index] = req.body;
        res.json(req.body);
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
});

// Delete a car by its registration number
app.delete('/api/cars/:reg_number', (req, res) => {
    const index = cars.findIndex(car => car.reg_number === req.params.reg_number);
    if (index !== -1) {
        cars.splice(index, 1);
        res.status(200).json({ message: 'Car deleted' });
    } else {
        res.status(404).json({ message: 'Car not found' });
    }
});


const PORT = process.env.PORT || 3007;
app.listen(PORT, () => {
    console.log(`App starting on port ${PORT}`);
});
