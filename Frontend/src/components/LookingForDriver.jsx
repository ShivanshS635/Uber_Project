import React from 'react';
import PropTypes from 'prop-types';

const LookingForDriver = ({ 
  setVehicleFound, 
  pickup, 
  destination, 
  fare, 
  vehicleType,
  estimatedTime,
  onCancel
}) => {
  return (
    <div className="relative bg-white rounded-t-2xl shadow-lg p-6 pt-4 max-w-md mx-auto">
      {/* Header with close/down arrow */}
      <div className="flex justify-between items-center mb-6">
        <button 
          onClick={() => setVehicleFound(false)}
          className="text-gray-500 hover:text-gray-700 focus:outline-none"
          aria-label="Close search"
        >
          <i className="text-3xl ri-arrow-down-wide-line"></i>
        </button>
        <h3 className="text-2xl font-semibold text-gray-800">Looking for a Driver</h3>
        <div className="w-8"></div> {/* Spacer for alignment */}
      </div>

      {/* Loading animation */}
      <div className="flex justify-center mb-6">
        <div className="relative">
          <img 
            className="h-20 w-20 object-cover rounded-full border-2 border-blue-500" 
            src="https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg" 
            alt="Vehicle type illustration" 
          />
          <div className="absolute -bottom-2 -right-2 bg-blue-500 text-white rounded-full p-1 animate-pulse">
            <i className="ri-search-line text-sm"></i>
          </div>
        </div>
      </div>

      {/* Progress indicator */}
      <div className="mb-6">
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div 
            className="h-full bg-blue-500 rounded-full animate-pulse" 
            style={{ width: '60%' }}
          ></div>
        </div>
        <p className="text-center text-sm text-gray-500 mt-2">
          Matching you with the best driver...
        </p>
      </div>

      {/* Trip details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-blue-500 mt-1">
            <i className="ri-map-pin-user-fill text-xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">Pickup Location</h3>
            <p className="text-gray-600">{pickup}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-red-500 mt-1">
            <i className="ri-map-pin-2-fill text-xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">Destination</h3>
            <p className="text-gray-600">{destination}</p>
          </div>
        </div>

        <div className="flex items-start gap-4 p-3 bg-gray-50 rounded-lg">
          <div className="text-green-500 mt-1">
            <i className="ri-currency-line text-xl"></i>
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-800">₹{fare[vehicleType]}</h3>
            <p className="text-gray-600">Estimated fare • Cash payment</p>
            {estimatedTime && (
              <p className="text-gray-600 text-sm mt-1">
                <i className="ri-time-line"></i> {estimatedTime} mins away
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Cancel button */}
      <button
        onClick={onCancel}
        className="w-full py-3 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors focus:outline-none focus:ring-2 focus:ring-red-300"
      >
        Cancel Request
      </button>
    </div>
  );
};

LookingForDriver.propTypes = {
  setVehicleFound: PropTypes.func.isRequired,
  pickup: PropTypes.string.isRequired,
  destination: PropTypes.string.isRequired,
  fare: PropTypes.object.isRequired,
  vehicleType: PropTypes.string.isRequired,
  estimatedTime: PropTypes.number,
  onCancel: PropTypes.func.isRequired
};

export default LookingForDriver;