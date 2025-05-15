const express = require('express');
const router = express.Router();
const mapController = require('../controllers/maps.controller');
const authMiddleware = require('../middlewares/auth.middleware');
const {query} = require('express-validator');
const { getCoordinates } = require('../controllers/maps.controller');

// coordinates fetching route
router.get('/get-coordinates' ,
    query('address').isString().isLength({min : 3}),
    authMiddleware.authUser , 
    mapController.getCoordinates
);

// distance and time fetching route
router.get('/get-distance-time' , 
    query('origin').isString().isLength({min : 3}),
    query('destination').isString().isLength({min : 3}),
    authMiddleware.authUser , 
    mapController.getDistanceTime
);

// rout to get suggestions for address
router.get('/get-suggestions' , 
    query('input').isString().isLength({min : 3}),
    authMiddleware.authUser , 
    mapController.getAutoCompleteSuggestions
);


module.exports = router;