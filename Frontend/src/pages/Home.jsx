import React, { useEffect } from 'react'
import { useState } from 'react'
import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { useRef } from 'react'
import 'remixicon/fonts/remixicon.css'
import LocationSearchPanel from '../components/LocationSearchPanel'
import VehiclePanel from '../components/VehiclePanel'
import ConfirmRide from '../components/ConfirmRide'
import WaitingForDriver from '../components/WaitingForDriver' 
import LookingForDriver from '../components/LookingForDriver' 
import axios from 'axios'
import { SocketContext } from '../context/SocketContext'
import { useContext } from 'react'
import { UserDataContext } from '../context/UserContext'
import { useNavigate } from 'react-router-dom'
import LiveTracking from '../components/LiveTracking'

const Home = () => {
  const [pickup, setPickup] = useState('')
  const [destination, setDestination] = useState('')
  const [panelOpen, setPanelOpen] = useState(false)
  const [vehiclePanel, setVehiclePanel] = useState(false)
  const [confirmRidePanel, setConfirmRidePanel] = useState(false)
  const [waitingForDriver, setWaitingForDriver] = useState(false)
  const [vehicleFound, setVehicleFound] = useState(false)
  const [pickupSuggestions, setPickupSuggestions] = useState([])
  const [destinationSuggestions, setDestinationSuggestions] = useState([])
  const [activeField, setActiveField] = useState(null)
  const [fare, setFare] = useState({})
  const [vehicleType, setVehicleType] = useState(null)
  const [ride, setRide] = useState(null)

  const panelRef = useRef(null)
  const panelCloseRef = useRef(null)
  const vehiclePanelRef = useRef(null)
  const confirmRidePanelRef = useRef(null)
  const waitingForDriverRef = useRef(null)
  const vehicleFoundRef = useRef(null)

  const { socket } = useContext(SocketContext)
  const { user } = useContext(UserDataContext)
  const navigate = useNavigate()

  useEffect(() => {
    socket.emit("join", { userType: "user", userId: user?._id })
  }, [user])

  socket.on('ride-confirmed', ride => {
    setVehicleFound(false)
    setWaitingForDriver(true)
    setRide(ride)
  })

  socket.on('ride-started', ride => {
    setWaitingForDriver(false)
    navigate('/riding', { state: { ride } }) 
  })

  const handlePickupChange = async (e) => {
    const value = e.target.value;
    setPickup(value);

    if (value.length < 3) {
      setPickupSuggestions([]);
      return;
    }

    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setPickupSuggestions(response.data)
    } catch(error) {
        console.error(error);
    }
  }

  const handleDestinationChange = async (e) => {
    const value = e.target.value;
    setDestination(value);

    if (value.length < 3) {
      setDestinationSuggestions([]);
      return
    }
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, {
        params: { input: e.target.value },
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      })
      setDestinationSuggestions(response.data)
    } catch(error) {
        console.error(error);
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()
  }

  // Animations
  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        height: '70%',
        padding: 24,
        ease: "power3.out"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 1,
        duration: 0.3
      })
    } else {
      gsap.to(panelRef.current, {
        height: '0%',
        padding: 0,
        ease: "power3.in"
      })
      gsap.to(panelCloseRef.current, {
        opacity: 0,
        duration: 0.2
      })
    }
  }, [panelOpen]) 

  useGSAP(() => {
    gsap.to(vehiclePanelRef.current, {
      y: vehiclePanel ? 0 : "100%",
      ease: "back.out(0.7)",
      duration: 0.5
    })
  }, [vehiclePanel])

  useGSAP(() => {
    gsap.to(confirmRidePanelRef.current, {
      y: confirmRidePanel ? 0 : "100%",
      ease: "back.out(0.7)",
      duration: 0.5
    })
  }, [confirmRidePanel])

  useGSAP(() => {
    gsap.to(waitingForDriverRef.current, {
      y: waitingForDriver ? 0 : "100%",
      ease: "back.out(0.7)",
      duration: 0.5
    })
  }, [waitingForDriver])

  useGSAP(() => {
    gsap.to(vehicleFoundRef.current, {
      y: vehicleFound ? 0 : "100%",
      ease: "back.out(0.7)",
      duration: 0.5
    })
  }, [vehicleFound])

  async function findTrip() {
    setVehiclePanel(true)
    setPanelOpen(false)
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`, {
      params: { pickup, destination },
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
    setFare(response.data)
  }

  async function createRide() {
    const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`, {
      pickup,
      destination,
      vehicleType
    }, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`
      }
    })
  }

  return (
    <div className='h-screen relative overflow-hidden bg-gray-100'>
      {/* Map Background */}
      <div className='h-screen w-screen absolute inset-0 z-0'>
        <LiveTracking />
      </div>

      {/* App Header */}
      <div className='absolute top-0 left-0 right-0 z-10 pt-4 px-4'>
        <div className='flex justify-between items-center'>
          <img 
            className='w-16 h-auto' 
            src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" 
            alt="Uber Logo"
          />
          <div className='bg-white p-2 rounded-full shadow-md'>
            <i className="ri-user-line text-xl"></i>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className='flex flex-col justify-end h-screen relative z-10'>
        {/* Location Input Panel */}
        <div className={`bg-white rounded-t-3xl p-6 transition-all duration-300 ${panelOpen ? 'shadow-lg' : ''}`}>
          <div className='flex justify-between items-center mb-4'>
            <h4 className='text-2xl font-bold text-gray-900'>Where to?</h4>
            <button 
              ref={panelCloseRef}
              onClick={() => setPanelOpen(false)}
              className='opacity-0 text-gray-500 hover:text-gray-700 transition-colors'
            >
              <i className="ri-close-line text-2xl"></i>
            </button>
          </div>

          <form onSubmit={submitHandler} className='space-y-3'>
            <div className='relative'>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 rounded-full bg-gray-800"></div>
              <input
                onClick={() => {
                  setPanelOpen(true)
                  setActiveField('pickup')
                }}
                value={pickup}
                onChange={handlePickupChange}
                className='bg-gray-100 px-10 py-3 text-lg rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black'
                type="text"
                placeholder='Enter pickup location'
              />
            </div>

            <div className='relative'>
              <div className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 rounded-full bg-gray-300"></div>
              <input
                onClick={() => {
                  setPanelOpen(true)
                  setActiveField('destination')
                }}
                value={destination}
                onChange={handleDestinationChange}
                className='bg-gray-100 px-10 py-3 text-lg rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-black'
                type="text"
                placeholder='Where to?' 
              />
            </div>

            <button 
              onClick={findTrip}
              disabled={!pickup || !destination}
              className={`w-full py-3 rounded-lg font-medium text-lg transition-colors ${pickup && destination ? 'bg-black text-white hover:bg-gray-900' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
            >
              Find Trip
            </button>
          </form>
        </div>

        {/* Search Panel */}
        <div ref={panelRef} className='bg-white overflow-hidden h-0'>
          <LocationSearchPanel
            suggestions={activeField === 'pickup' ? pickupSuggestions : destinationSuggestions}
            setPanelOpen={setPanelOpen}
            setVehiclePanel={setVehiclePanel}
            setPickup={setPickup}
            setDestination={setDestination}
            activeField={activeField}
          />
        </div>
      </div>

      {/* Vehicle Selection Panel */}
      <div ref={vehiclePanelRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-white rounded-t-3xl px-6 py-8 shadow-xl'>
        <VehiclePanel
          selectVehicle={setVehicleType}
          fare={fare}
          setConfirmRidePanel={setConfirmRidePanel}
          setVehiclePanel={setVehiclePanel}
        />
      </div>
      
      {/* Confirm Ride Panel */}
      <div ref={confirmRidePanelRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-white rounded-t-3xl px-6 py-8 shadow-xl'>
        <ConfirmRide
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setConfirmRidePanel={setConfirmRidePanel} 
          setVehicleFound={setVehicleFound} 
        />
      </div>

      {/* Looking for Driver Panel */}
      <div ref={vehicleFoundRef} className='fixed w-full z-20 bottom-0 translate-y-full bg-white rounded-t-3xl px-6 py-8 shadow-xl'>
        <LookingForDriver
          createRide={createRide}
          pickup={pickup}
          destination={destination}
          fare={fare}
          vehicleType={vehicleType}
          setVehicleFound={setVehicleFound}
        />
      </div>

      {/* Waiting for Driver Panel */}
      <div ref={waitingForDriverRef} className='fixed w-full z-20 bottom-0 bg-white rounded-t-3xl px-6 py-8 shadow-xl'>
        <WaitingForDriver
          ride={ride}
          setVehicleFound={setVehicleFound}
          setWaitingForDriver={setWaitingForDriver}
          waitingForDriver={waitingForDriver}
        />
      </div>
    </div>
  )
}

export default Home