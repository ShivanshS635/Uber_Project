import React, { useState } from 'react';
import axios from 'axios';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/users/forgot-password`, { email });
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || 'Something went wrong.');
    }
  };

  return (
    <div className='p-6 max-w-md mx-auto'>
      <h2 className='text-xl font-bold mb-4'>Forgot Password</h2>
      <form onSubmit={handleForgotPassword}>
        <input
          type='email'
          placeholder='Enter your email'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className='w-full border px-3 py-2 rounded mb-4'
          required
        />
        <button className='w-full bg-blue-600 text-white py-2 rounded'>Send Reset Link</button>
      </form>
      {message && <p className='mt-4 text-sm text-green-600'>{message}</p>}
    </div>
  );
};

export default ForgotPassword;