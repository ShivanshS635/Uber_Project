import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import 'remixicon/fonts/remixicon.css';

const WaitingForDriver = ({ ride, setWaitingForDriver }) => {
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [driverDistance, setDriverDistance] = useState(null);
  const [showOTP, setShowOTP] = useState(false);

  // Timer effect
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeElapsed(prev => prev + 1);
    }, 1000);

    // Simulate driver distance updates
    const distanceTimer = setInterval(() => {
      if (ride?.captain?.position) {
        // In a real app, you would calculate actual distance here
        setDriverDistance(Math.max(0, (driverDistance || 5) - 0.2));
      }
    }, 10000);

    return () => {
      clearInterval(timer);
      clearInterval(distanceTimer);
    };
  }, [ride, driverDistance]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleCancelRide = () => {
    // Add cancel ride logic here
    setWaitingForDriver(false);
  };

  return (
    <motion.div
      initial={{ y: '100%' }}
      animate={{ y: 0 }}
      exit={{ y: '100%' }}
      transition={{ type: 'spring', damping: 25 }}
      className="bg-white rounded-t-3xl p-6 pt-4 shadow-xl"
    >
      {/* Header with close button */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-bold">Your driver is coming</h3>
        <button 
          onClick={() => setWaitingForDriver(false)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>

      {/* Driver info section */}
      <div className="flex items-center justify-between mb-6 p-4 bg-gray-50 rounded-xl">
        <div className="flex items-center space-x-4">
          <div className="relative">
            <img 
              src={ride?.captain?.profileImage || "https://swyft.pl/wp-content/uploads/2023/05/how-many-people-can-a-uberx-take.jpg"} 
              alt="Driver" 
              className="h-16 w-16 rounded-full object-cover border-2 border-white shadow-sm"
            />
            <div className="absolute -bottom-1 -right-1 bg-green-500 rounded-full p-1 border-2 border-white">
              <i className="ri-user-star-fill text-white text-xs"></i>
            </div>
          </div>
          <div>
            <h2 className="text-lg font-semibold capitalize">
              {ride?.captain?.fullname?.firstname || 'Driver'}
              <span className="ml-2 text-yellow-500">
                <i className="ri-star-fill"></i> 4.9
              </span>
            </h2>
            <p className="text-gray-600">
              {ride?.captain?.vehicle?.make || 'Maruti'} {ride?.captain?.vehicle?.model || 'Alto'}
            </p>
            <p className="text-sm font-medium">
              {ride?.captain?.vehicle?.color || 'White'} • {ride?.captain?.vehicle?.plate || 'DL1AB1234'}
            </p>
          </div>
        </div>
        <button 
          onClick={() => setShowOTP(!showOTP)}
          className="bg-blue-100 text-blue-600 px-3 py-2 rounded-lg font-medium"
        >
          {showOTP ? ride?.otp : 'Show OTP'}
        </button>
      </div>

      {/* Progress indicator */}
      <div className="mb-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">
            {driverDistance !== null ? `${driverDistance.toFixed(1)} km away` : 'Locating driver...'}
          </span>
          <span className="text-sm font-medium text-gray-600">
            {formatTime(timeElapsed)}
          </span>
        </div>
        <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${Math.min(timeElapsed * 5, 100)}%` }}
            transition={{ duration: 1 }}
            className="h-full bg-blue-500 rounded-full"
          />
        </div>
      </div>

      {/* Ride details */}
      <div className="space-y-3 mb-6">
        <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg transition-colors">
          <div className="mt-1">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <div className="w-0.5 h-8 bg-gray-300 mx-auto"></div>
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{ride?.pickup}</h3>
            <p className="text-sm text-gray-500 mt-1">Pickup location</p>
            <div className="border-t border-gray-100 my-2"></div>
            <h3 className="font-medium">{ride?.destination}</h3>
            <p className="text-sm text-gray-500 mt-1">Drop-off location</p>
          </div>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <i className="ri-money-dollar-circle-line text-lg text-green-500"></i>
            <span>Payment</span>
          </div>
          <div className="font-medium">
            ₹{ride?.fare?.toFixed(2) || '0.00'} <span className="text-gray-500 text-sm">• Cash</span>
          </div>
        </div>
      </div>

      {/* Action buttons */}
      <div className="flex space-x-3">
        <button className="flex-1 flex flex-col items-center justify-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <i className="ri-chat-3-line text-xl mb-1"></i>
          <span className="text-xs">Message</span>
        </button>
        <button className="flex-1 flex flex-col items-center justify-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <i className="ri-phone-line text-xl mb-1"></i>
          <span className="text-xs">Call</span>
        </button>
        <button className="flex-1 flex flex-col items-center justify-center p-3 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors">
          <i className="ri-share-line text-xl mb-1"></i>
          <span className="text-xs">Share</span>
        </button>
      </div>

      {/* Cancel ride button */}
      <button 
        onClick={handleCancelRide}
        className="w-full mt-4 py-3 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
      >
        Cancel Ride
      </button>
    </motion.div>
  );
};

export default WaitingForDriver;