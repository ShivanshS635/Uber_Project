import React from 'react';
import { LoadScript, GoogleMap, Marker, Polyline } from '@react-google-maps/api';
import { useState, useEffect, useContext } from 'react';
import { SocketContext } from '../context/SocketContext';
import { UserDataContext } from '../context/UserContext';
import 'remixicon/fonts/remixicon.css';

const containerStyle = {
  width: '100%',
  height: '100%',
};

const defaultCenter = {
  lat: -3.745,
  lng: -38.523
};

const LiveTracking = ({ ride }) => {
  const [currentPosition, setCurrentPosition] = useState(defaultCenter);
  const [driverPosition, setDriverPosition] = useState(null);
  const [routePath, setRoutePath] = useState([]);
  const [mapLoaded, setMapLoaded] = useState(false);
  const { socket } = useContext(SocketContext);
  const { user } = useContext(UserDataContext);

  // Initialize geolocation tracking
  useEffect(() => {
    if (!navigator.geolocation) {
      console.error("Geolocation is not supported by your browser");
      return;
    }

    const successHandler = (position) => {
      const { latitude, longitude } = position.coords;
      setCurrentPosition({
        lat: latitude,
        lng: longitude
      });

      // Emit position to server if user is a driver
      if (user?.userType === 'driver') {
        socket.emit('position-update', { 
          userId: user._id,
          position: { lat: latitude, lng: longitude }
        });
      }
    };

    const errorHandler = (error) => {
      console.error("Geolocation error:", error);
    };

    // Get initial position
    navigator.geolocation.getCurrentPosition(successHandler, errorHandler, {
      enableHighAccuracy: true,
      timeout: 5000
    });

    // Set up watch for continuous updates
    const watchId = navigator.geolocation.watchPosition(
      successHandler, 
      errorHandler, 
      { 
        enableHighAccuracy: true,
        maximumAge: 1000 
      }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [user]);

  // Listen for driver updates if this is a passenger view
  useEffect(() => {
    if (user?.userType === 'user' && ride?.driverId) {
      socket.on('driver-position', (position) => {
        setDriverPosition(position);
        
        // Simulate route path (in a real app, you'd get this from Directions API)
        if (currentPosition && position) {
          setRoutePath([currentPosition, position]);
        }
      });
    }

    return () => {
      socket.off('driver-position');
    };
  }, [ride, currentPosition]);

  // Custom marker icons - only called after map is loaded
  const getMarkerIcon = () => {
    if (!mapLoaded) return null;
    
    return {
      path: window.google.maps.SymbolPath.CIRCLE,
      fillColor: user?.userType === 'driver' ? '#4285F4' : '#34A853',
      fillOpacity: 1,
      scale: 8,
      strokeColor: 'white',
      strokeWeight: 2
    };
  };

  // Driver marker icon - only called after map is loaded
  const getDriverMarkerIcon = () => {
    if (!mapLoaded) return null;
    
    return {
      url: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
      scaledSize: new window.google.maps.Size(32, 32)
    };
  };

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <LoadScript 
      googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API}
      libraries={['geometry']}
    >
      <GoogleMap
        mapContainerStyle={containerStyle}
        center={currentPosition}
        zoom={15}
        options={{
          disableDefaultUI: true,
          zoomControl: false,
          styles: [
            {
              featureType: "poi",
              elementType: "labels",
              stylers: [{ visibility: "off" }]
            }
          ]
        }}
        onLoad={handleMapLoad}
      >
        {/* User/Driver position marker */}
        {mapLoaded && (
          <>
            <Marker
              position={currentPosition}
              icon={getMarkerIcon()}
            />

            {/* Driver position marker (for passenger view) */}
            {driverPosition && user?.userType === 'user' && (
              <>
                <Marker
                  position={driverPosition}
                  icon={getDriverMarkerIcon()}
                />
                <Polyline
                  path={routePath}
                  options={{
                    strokeColor: '#4285F4',
                    strokeOpacity: 0.7,
                    strokeWeight: 4,
                    geodesic: true
                  }}
                />
              </>
            )}
          </>
        )}
      </GoogleMap>
    </LoadScript>
  );
};

export default LiveTracking;