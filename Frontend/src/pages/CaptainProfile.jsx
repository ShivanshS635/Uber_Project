import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { CaptainDataContext } from '../context/CaptainContext';
import { Avatar, Button, TextField, Select, MenuItem } from '@mui/material';
import { Lock, DirectionsCar } from '@mui/icons-material';

const CaptainProfile = () => {
  const { captain } = useContext(CaptainDataContext);
  const navigate = useNavigate();
  
  // Password change state
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  
  // Vehicle info state
  const [vehicleData, setVehicleData] = useState({
    vehicleType: captain?.vehicleType || '',
    licensePlate: captain?.licensePlate || '',
    vehicleColor: captain?.vehicleColor || '',
    vehicleYear: captain?.vehicleYear || ''
  });
  
  const [activeSection, setActiveSection] = useState('profile');

  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData(prev => ({ ...prev, [name]: value }));
  };

  const handleVehicleChange = (e) => {
    const { name, value } = e.target;
    setVehicleData(prev => ({ ...prev, [name]: value }));
  };

  const handleUpdatePassword = (e) => {
    e.preventDefault();
    // Add password update logic here
    alert('Password updated successfully!');
  };

  const handleUpdateVehicle = (e) => {
    e.preventDefault();
    // Add vehicle update logic here
    alert('Vehicle information updated successfully!');
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 p-6 text-white">
          <h1 className="text-2xl font-bold">Hi Captain! {captain?.name}</h1>
          <p className="text-blue-100">Manage your account settings</p>
        </div>
        
        {/* Navigation */}
        <div className="flex border-b">
          <button
            onClick={() => setActiveSection('profile')}
            className={`px-6 py-3 font-medium ${activeSection === 'profile' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Profile
          </button>
          <button
            onClick={() => setActiveSection('password')}
            className={`px-6 py-3 font-medium ${activeSection === 'password' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Change Password
          </button>
          <button
            onClick={() => setActiveSection('vehicle')}
            className={`px-6 py-3 font-medium ${activeSection === 'vehicle' ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-600'}`}
          >
            Vehicle Info
          </button>
        </div>
        
        {/* Content */}
        <div className="p-6">
          {activeSection === 'profile' && (
            <div className="flex flex-col md:flex-row items-center gap-6">
              <Avatar 
                src={captain?.profileImage} 
                sx={{ width: 120, height: 120 }}
                className="border-4 border-white shadow-lg"
              />
              <div>
                <h2 className="text-xl font-bold">{captain?.name}</h2>
                <p className="text-gray-600">{captain?.email}</p>
                <p className="text-gray-600">{captain?.phone}</p>
                <div className="mt-2">
                  <p className="font-medium">Vehicle: {captain?.vehicleType}</p>
                  <p>License: {captain?.licensePlate}</p>
                </div>
              </div>
            </div>
          )}
          
          {activeSection === 'password' && (
            <form onSubmit={handleUpdatePassword} className="max-w-md mx-auto">
              <div className="space-y-4">
                <TextField
                  label="Current Password"
                  type="password"
                  name="currentPassword"
                  value={passwordData.currentPassword}
                  onChange={handlePasswordChange}
                  fullWidth
                  required
                />
                <TextField
                  label="New Password"
                  type="password"
                  name="newPassword"
                  value={passwordData.newPassword}
                  onChange={handlePasswordChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Confirm New Password"
                  type="password"
                  name="confirmPassword"
                  value={passwordData.confirmPassword}
                  onChange={handlePasswordChange}
                  fullWidth
                  required
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<Lock />}
                  fullWidth
                >
                  Update Password
                </Button>
              </div>
            </form>
          )}
          
          {activeSection === 'vehicle' && (
            <form onSubmit={handleUpdateVehicle} className="max-w-md mx-auto">
              <div className="space-y-4">
                <Select
                  label="Vehicle Type"
                  name="vehicleType"
                  value={vehicleData.vehicleType}
                  onChange={handleVehicleChange}
                  fullWidth
                  required
                >
                  <MenuItem value="Sedan">Sedan</MenuItem>
                  <MenuItem value="SUV">SUV</MenuItem>
                  <MenuItem value="Van">Van</MenuItem>
                  <MenuItem value="Luxury">Luxury</MenuItem>
                </Select>
                <TextField
                  label="License Plate"
                  name="licensePlate"
                  value={vehicleData.licensePlate}
                  onChange={handleVehicleChange}
                  fullWidth
                  required
                />
                <TextField
                  label="Vehicle Color"
                  name="vehicleColor"
                  value={vehicleData.vehicleColor}
                  onChange={handleVehicleChange}
                  fullWidth
                />
                <TextField
                  label="Vehicle Year"
                  name="vehicleYear"
                  type="number"
                  value={vehicleData.vehicleYear}
                  onChange={handleVehicleChange}
                  fullWidth
                />
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={<DirectionsCar />}
                  fullWidth
                >
                  Update Vehicle Info
                </Button>
              </div>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default CaptainProfile;