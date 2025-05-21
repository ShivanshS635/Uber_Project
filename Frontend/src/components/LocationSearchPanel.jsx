import React from 'react'
import { motion } from 'framer-motion'
import 'remixicon/fonts/remixicon.css'

const LocationSearchPanel = ({ 
  suggestions, 
  setVehiclePanel, 
  setPanelOpen, 
  setPickup, 
  setDestination, 
  activeField 
}) => {

  const handleSuggestionClick = (suggestion) => {
    if (activeField === 'pickup') {
      setPickup(suggestion.description)
    } else if (activeField === 'destination') {
      setDestination(suggestion.description)
    }
    // Removed the automatic panel closing and vehicle panel opening
  }

  return (
    <div className="p-4">
      <h3 className="text-lg font-semibold mb-4">Search Results</h3>

      <div className="space-y-2">
        {suggestions.map((element, index) => (
          <motion.div
            key={index}
            whileTap={{ scale: 0.98 }}
            onClick={() => handleSuggestionClick(element)}
            className="flex items-center p-3 rounded-lg hover:bg-gray-50 active:bg-gray-100 transition-colors cursor-pointer"
          >
            <div className="bg-gray-100 p-2 rounded-full mr-3">
              <i className="ri-map-pin-fill text-blue-500"></i>
            </div>
            <div>
              <h4 className="font-medium">
                {element.structured_formatting?.main_text || element.description}
              </h4>
              <p className="text-xs text-gray-500">
                {element.structured_formatting?.secondary_text || element.description}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Current location button */}
      <motion.div
        whileTap={{ scale: 0.98 }}
        className="flex items-center p-3 mt-4 rounded-lg bg-gray-50 hover:bg-gray-100 active:bg-gray-200 transition-colors cursor-pointer"
        onClick={() => {
          navigator.geolocation.getCurrentPosition((position) => {
            const location = {
              description: 'Current Location',
              structured_formatting: {
                main_text: 'Current Location',
                secondary_text: 'Using your GPS position'
              }
            };
            handleSuggestionClick(location);
          });
        }}
      >
        <div className="bg-blue-100 p-2 rounded-full mr-3">
          <i className="ri-navigation-fill text-blue-500"></i>
        </div>
        <h4 className="font-medium">Use current location</h4>
      </motion.div>
    </div>
  )
}

export default LocationSearchPanel