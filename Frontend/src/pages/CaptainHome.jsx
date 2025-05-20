import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import CaptainDetails from '../components/CaptainDetails';
import RidePopUp from '../components/RidePopUp';
import { useState, useRef } from 'react';
import { gsap } from 'gsap';
import { useGSAP } from '@gsap/react';
import ConfirmRidePopUp from '../components/ConfirmRidePopUp';
import { useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { CaptainDataContext } from '../context/CaptainContext';
import axios from 'axios';

const CaptainHome = () => {
  const [ridePopupPanel, setRidePopupPanel] = useState(false);
  const ridePopupPanelRef = useRef(null);
  const [confirmRidePopupPanel, setConfirmRidePopupPanel] = useState(false);
  const confirmRidePopupPanelRef = useRef(null);
  const [ride, setRide] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef(null);
  const navigate = useNavigate();

  const { socket } = useContext(SocketContext);
  const { captain } = useContext(CaptainDataContext);

  useEffect(() => {
    if (!captain) return;

    socket.emit('join', {
      userId: captain._id,
      userType: 'captain'
    });

    const updateLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
          socket.emit('update-location-captain', {
            userId: captain._id,
            location: {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            }
          });
        });
      }
    };

    const locationInterval = setInterval(updateLocation, 10000);
    updateLocation();

    return () => {
      clearInterval(locationInterval);
      socket.off('new-ride');
    };
  }, [captain, socket]);

  useEffect(() => {
    const handleNewRide = (data) => {
      console.log('New ride received:', data);
      setRide(data);
      setRidePopupPanel(true);
    };

    socket.on('new-ride', handleNewRide);

    return () => {
      socket.off('new-ride', handleNewRide);
    };
  }, [socket]);

  async function confirmRide() {
    try {
      await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/confirm`, {
        rideId: ride._id,
        captainId: captain._id,
      }, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      setRidePopupPanel(false);
      setConfirmRidePopupPanel(true);
    } catch (error) {
      console.error('Error confirming ride:', error);
    }
  }

  const handleMenuAction = (path) => {
    setMenuOpen(false);
    navigate(path);
  };

  useGSAP(() => {
    gsap.to(ridePopupPanelRef.current, {
      transform: ridePopupPanel ? 'translateY(0)' : 'translateY(100%)'
    });
  }, { dependencies: [ridePopupPanel] });

  useGSAP(() => {
    gsap.to(confirmRidePopupPanelRef.current, {
      transform: confirmRidePopupPanel ? 'translateY(0)' : 'translateY(100%)'
    });
  }, { dependencies: [confirmRidePopupPanel] });

  useGSAP(() => {
    gsap.to(menuRef.current, {
      opacity: menuOpen ? 1 : 0,
      scale: menuOpen ? 1 : 0.8,
      display: menuOpen ? 'block' : 'none',
      duration: 0.2
    });
  }, { dependencies: [menuOpen] });

  return (
    <div className='h-screen relative'>
      {/* Header */}
      <header className='fixed p-6 top-0 flex items-center justify-between w-screen z-30'>
        <img className='w-16' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="Uber Logo" />
        
        {/* Menu Button */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className='h-10 w-10 bg-white flex items-center justify-center rounded-full shadow-md hover:bg-gray-100 transition-colors'
            aria-label="Menu"
          >
            <i className="text-lg font-medium ri-menu-line"></i>
          </button>

          {/* Dropdown Menu */}
          <div
            ref={menuRef}
            className="absolute right-11 top-10 bg-white rounded-lg shadow-xl py-2 w-48 z-40 hidden origin-top-right"
          >
            <button
              onClick={() => handleMenuAction('/captain-profile')}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center transition-colors"
            >
              <i className="ri-user-line mr-2"></i> My Profile
            </button>
            <button
              onClick={() => handleMenuAction('/captains/logout')}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center transition-colors"
            >
              <i className="ri-logout-box-r-line mr-2"></i> Logout
            </button>
            <button
              onClick={() => handleMenuAction('/captain-home')}
              className="w-full text-left px-4 py-2 hover:bg-gray-100 flex items-center transition-colors"
            >
              <i className="ri-home-line mr-2"></i> Home
            </button>
          </div>
        </div>
      </header>

      {/* Map Area */}
      <div className='h-3/5 w-full'>
        <img 
          className='h-full w-full object-cover' 
          src="https://simonpan.com/wp-content/themes/sp_portfolio/assets/uber-challenge.jpg" 
          alt="Map" 
        />
      </div>

      {/* Captain Details */}
      <div className='h-2/5 p-4'>
        <CaptainDetails />
      </div>

      {/* Ride Popup */}
      <div 
        ref={ridePopupPanelRef} 
        className='fixed w-full z-20 bottom-0 translate-y-full bg-white px-3 py-6 pt-12 rounded-t-2xl shadow-lg'
      >
        <RidePopUp
          ride={ride}
          setRidePopupPanel={setRidePopupPanel}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          confirmRide={confirmRide}
        />
      </div>

      {/* Confirm Ride Popup */}
      <div 
        ref={confirmRidePopupPanelRef} 
        className='fixed w-full h-screen z-20 bottom-0 translate-y-full bg-white px-3 py-10 pt-12 rounded-t-2xl shadow-lg'
      >
        <ConfirmRidePopUp
          ride={ride}
          setConfirmRidePopupPanel={setConfirmRidePopupPanel}
          setRidePopupPanel={setRidePopupPanel}
        />
      </div>

      {/* Menu Overlay */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-10 bg-black opacity-30"
          onClick={() => setMenuOpen(false)}
        ></div>
      )}
    </div>
  );
};

export default CaptainHome;