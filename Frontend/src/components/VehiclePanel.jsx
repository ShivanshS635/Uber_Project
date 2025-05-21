import React from 'react'
import { motion } from 'framer-motion'

const VehiclePanel = ({ setVehiclePanel, setConfirmRidePanel, selectVehicle, fare }) => {
  const vehicleOptions = [
    {
      id: 'car',
      name: 'UberGo',
      capacity: 4,
      eta: '2 min',
      description: 'Everyday rides',
      price: fare.car,
      image: 'https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg',
      typeIcon: 'ri-user-line'
    },
    {
      id: 'moto',
      name: 'Moto',
      capacity: 1,
      eta: '3 min',
      description: 'Affordable motorcycle',
      price: fare.moto,
      image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_638,w_956/v1649231091/assets/2c/7fa194-c954-49b2-9c6d-a3b8601370f5/original/Uber_Moto_Orange_312x208_pixels_Mobile.png',
      typeIcon: 'ri-user-line'
    },
    {
      id: 'auto',
      name: 'Auto',
      capacity: 3,
      eta: '3 min',
      description: 'Hassle-free tuktuks',
      price: fare.auto,
      image: 'https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png',
      typeIcon: 'ri-user-3-line'
    }
  ]

  const handleSelect = (type) => {
    selectVehicle(type)
    setConfirmRidePanel(true)
  }

  return (
    <div className="bg-white rounded-t-3xl pb-8 pt-4 px-5 shadow-2xl">
      {/* Handle bar */}
      <div className="flex justify-center mb-3">
        <div 
          onClick={() => setVehiclePanel(false)}
          className="w-10 h-1 bg-gray-300 rounded-full cursor-pointer"
        ></div>
      </div>

      {/* Header */}
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Choose your ride</h2>
        <p className="text-gray-500">Fares may vary with demand</p>
      </div>

      {/* Vehicle options */}
      <div className="space-y-3">
        {vehicleOptions.map((vehicle) => (
          <motion.div 
            key={vehicle.id}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSelect(vehicle.id)}
            className="flex items-center p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {/* Vehicle image */}
            <div className="w-16 h-16 bg-white rounded-lg flex items-center justify-center mr-4 overflow-hidden">
              <img 
                src={vehicle.image} 
                alt={vehicle.name}
                className="w-full h-full object-contain"
              />
            </div>
            
            {/* Vehicle details */}
            <div className="flex-grow">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900">{vehicle.name}</h3>
                  <div className="flex items-center mt-1 space-x-3">
                    <span className="text-sm text-gray-500 flex items-center">
                      <i className={`${vehicle.typeIcon} mr-1`}></i>
                      {vehicle.capacity}
                    </span>
                    <span className="text-sm text-gray-500 flex items-center">
                      <i className="ri-time-line mr-1"></i>
                      {vehicle.eta}
                    </span>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-gray-900">₹{vehicle.price}</p>
                  <p className="text-xs text-gray-400">{vehicle.description}</p>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Safety footer */}
      <div className="mt-6 pt-4 border-t border-gray-200 flex items-center justify-center">
        <div className="flex items-center bg-blue-50 px-3 py-1 rounded-full">
          <i className="ri-shield-check-line text-blue-500 mr-2"></i>
          <span className="text-sm text-blue-600">Your safety matters</span>
        </div>
      </div>
    </div>
  )
}

export default VehiclePanel