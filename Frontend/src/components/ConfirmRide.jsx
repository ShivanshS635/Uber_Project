import React from 'react'
import { motion } from 'framer-motion'

const ConfirmRide = ({ 
  setConfirmRidePanel, 
  setVehicleFound, 
  createRide, 
  pickup, 
  destination, 
  fare, 
  vehicleType 
}) => {
  
  const vehicleImages = {
    car: 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg',
    moto: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
    auto: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png'
  }

  const handleConfirm = () => {
    setVehicleFound(true)
    setConfirmRidePanel(false)
    createRide()
  }

  return (
    <div className="bg-white rounded-t-3xl pb-8 pt-4 px-5 shadow-2xl max-h-[70vh] overflow-y-auto">
      {/* Handle bar */}
      <div className="flex justify-center mb-3">
        <div 
          onClick={() => setConfirmRidePanel(false)}
          className="w-10 h-1 bg-gray-300 rounded-full cursor-pointer"
        ></div>
      </div>

      {/* Header */}
      <div className="mb-6 text-center">
        <h2 className="text-2xl font-bold text-gray-900">Confirm your ride</h2>
        <p className="text-gray-500">Review your trip details</p>
      </div>

      {/* Vehicle image */}
      <div className="flex justify-center mb-6">
        <div className="w-24 h-24 bg-gray-100 rounded-lg flex items-center justify-center p-2">
          <img 
            src={vehicleImages[vehicleType]} 
            alt={vehicleType} 
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      {/* Trip details */}
      <div className="space-y-4 mb-8">
        <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
          <div className="mt-1">
            <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
              <i className="ri-map-pin-user-fill text-white text-xs"></i>
            </div>
            <div className="w-0.5 h-10 bg-gray-300 mx-auto"></div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Pickup location</h3>
            <p className="text-gray-600 mt-1">{pickup}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
          <div className="mt-1">
            <div className="w-5 h-5 rounded-full bg-red-500 flex items-center justify-center">
              <i className="ri-map-pin-2-fill text-white text-xs"></i>
            </div>
          </div>
          <div>
            <h3 className="font-medium text-gray-900">Destination</h3>
            <p className="text-gray-600 mt-1">{destination}</p>
          </div>
        </div>

        <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center">
              <i className="ri-currency-line text-gray-600"></i>
            </div>
            <div>
              <h3 className="font-medium text-gray-900">Payment</h3>
              <p className="text-gray-600 text-sm">Cash</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-500">Total fare</p>
            <p className="font-bold text-lg">₹{fare[vehicleType]}</p>
          </div>
        </div>
      </div>

      {/* Confirm button */}
      <motion.button
        whileTap={{ scale: 0.98 }}
        onClick={handleConfirm}
        className="w-full bg-black text-white font-semibold py-4 rounded-xl shadow-md hover:bg-gray-800 transition-colors"
      >
        Confirm UberGo
      </motion.button>

      {/* Safety note */}
      <div className="mt-4 text-center text-xs text-gray-500">
        <i className="ri-shield-check-line text-blue-500 mr-1"></i>
        Your safety is our priority
      </div>
    </div>
  )
}

export default ConfirmRide