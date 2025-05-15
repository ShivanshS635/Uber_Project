const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const app = express();
const cookie = require('cookie-parser'); 
const cors = require('cors');
const connectToDb = require('./database/db');
const userRoutes = require('./routes/user.routes');
const captainRoutes = require('./routes/captain.routes');
const mapRoutes = require('./routes/maps.routes');
const rideRoutes = require('./routes/ride.routes');

connectToDb();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookie());

app.get('/' , (req , res)=>{
    res.send("Hellooo world");
})

app.use('/users' , userRoutes);
app.use('/captains' , captainRoutes);
app.use('/maps' , mapRoutes);
app.use('/rides' , rideRoutes);


module.exports = app;