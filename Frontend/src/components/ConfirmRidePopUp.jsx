import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import 'remixicon/fonts/remixicon.css';

const ConfirmRidePopUp = ({ ride, setConfirmRidePopupPanel, setRidePopupPanel }) => {
  const [otp, setOtp] = useState('');
  const [distance, setDistance] = useState('2.2 KM');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Calculate actual distance in a real app
  useEffect(() => {
    // This would be replaced with actual distance calculation
    // For now using the static value
    setDistance('2.2 KM');
  }, [ride]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }

    setIsLoading(true);
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
          rideId: ride._id,
          otp: otp
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      if (response.status === 200) {
        setConfirmRidePopupPanel(false);
        setRidePopupPanel(false);
        navigate('/captain-riding', { state: { ride } });
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to confirm ride');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      className="bg-white rounded-t-3xl p-6 pt-4"
    >
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-2xl font-bold">Confirm Ride</h3>
        <button 
          onClick={() => setRidePopupPanel(false)}
          className="p-2 rounded-full hover:bg-gray-100 transition-colors"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>

      {/* Passenger Info */}
      <div className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl mb-6">
        <div className="flex items-center space-x-3">
          <img 
            className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
            src={ride?.user?.profileImage || "https://i.pinimg.com/236x/af/26/28/af26280b0ca305be47df0b799ed1b12b.jpg"} 
            alt="Passenger" 
          />
          <div>
            <h2 className="text-lg font-medium capitalize">
              {ride?.user?.fullname?.firstname} {ride?.user?.fullname?.lastname}
            </h2>
            <p className="text-sm text-gray-600">Passenger</p>
          </div>
        </div>
        <div className="text-right">
          <h5 className="text-lg font-semibold">{distance}</h5>
          <p className="text-sm text-gray-600">Distance</p>
        </div>
      </div>

      {/* Ride Details */}
      <div className="space-y-4 mb-6">
        <div className="flex items-start space-x-4 p-3 bg-gray-50 rounded-lg">
          <div className="mt-1">
            <div className="w-4 h-4 rounded-full bg-blue-500"></div>
            <div className="w-0.5 h-8 bg-gray-300 mx-auto"></div>
            <div className="w-4 h-4 rounded-full bg-red-500"></div>
          </div>
          <div className="flex-1">
            <h3 className="font-medium">{ride?.pickup}</h3>
            <p className="text-sm text-gray-500 mt-1">Pickup location</p>
            <div className="border-t border-gray-200 my-2"></div>
            <h3 className="font-medium">{ride?.destination}</h3>
            <p className="text-sm text-gray-500 mt-1">Drop-off location</p>
          </div>
        </div>

        <div className="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
          <div className="flex items-center space-x-2">
            <i className="ri-money-dollar-circle-line text-lg text-green-500"></i>
            <span>Fare</span>
          </div>
          <div className="font-semibold">
            ₹{ride?.fare?.toFixed(2) || '0.00'} <span className="text-gray-500 text-sm">• Cash</span>
          </div>
        </div>
      </div>

      {/* OTP Form */}
      <form onSubmit={submitHandler} className="space-y-4">
        <div>
          <label htmlFor="otp" className="block text-sm font-medium text-gray-700 mb-1">
            Enter OTP from passenger
          </label>
          <input
            id="otp"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            type="text"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter 4-digit OTP"
            maxLength={4}
          />
          {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
        </div>

        <div className="flex space-x-3">
          <button
            type="submit"
            disabled={isLoading}
            className={`flex-1 py-3 rounded-lg font-medium text-white ${
              isLoading ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'
            } transition-colors`}
          >
            {isLoading ? (
              <span className="flex items-center justify-center">
                <i className="ri-loader-4-line animate-spin mr-2"></i>
                Confirming...
              </span>
            ) : (
              'Confirm Ride'
            )}
          </button>
          
          <button
            type="button"
            onClick={() => {
              setRidePopupPanel(false);
              setConfirmRidePopupPanel(false);
            }}
            className="flex-1 py-3 rounded-lg font-medium text-white bg-red-600 hover:bg-red-700 transition-colors"
          >
            Cancel
          </button>
        </div>
      </form>
    </motion.div>
  );
};

export default ConfirmRidePopUp;