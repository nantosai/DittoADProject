import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('MINI');
  const navigate = useNavigate();

  const categories = ['ALL', 'SUV', 'SEDAN', 'MPV', 'MINI'];
  const carDetails = {
    category: 'MINI',
    imageUrl: '/CategoryA-MINI.png', // Replace this with your actual car image URL
    models: [
      { name: 'KANSAI PRO CLEAR', price: 1700 },
      { name: 'NIPPON HIGH SOLID', price: 2000 },
      { name: 'KANSAI HIGH SOLID SUPER PREMIUM', price: 2200 },
    ],
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <header className="flex justify-between items-center pb-6 border-b">
          <div className="flex items-center space-x-2">
            <img src="/App-Icon.png" alt="JA logo" className="h-10 rounded-full" />
          </div>
          
          <div className="flex items-center space-x-4">
            <img
              src="https://via.placeholder.com/50"
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-gray-300"
            />
            <span className="font-semibold">M. Firdaus</span>
          </div>   
        </header>
        
        <div>
          <h1 className="text-2xl font-bold">Welcome to Jenderam Autoworks!</h1>
        </div>

        {/* Search Bar */}
        <div className="my-4 relative">
          <input
            type="text"
            placeholder="Hinted search text"
            className="w-full border rounded-full p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
          />
          <span className="absolute right-3 top-3 text-black-400">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              className="w-5 h-5"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 15l5 5m-5-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </span>
        </div>

      {/* Category Tabs */}
         <div className="flex justify-center space-x-2 mb-6">
        {categories.map((category) => (
            <button
            key={category}
            onClick={() => {
                setSelectedCategory(category);

                // Use correct if-else statements for navigation
                if (category === 'ALL') {
                  navigate('/dashboard');
                  } else if (category === 'SUV') {
                  navigate('/dashboard-SUV');
                  } else if (category === 'SEDAN') {
                  navigate('/dashboard-SEDAN');
                  } else if (category === 'MPV') {
                  navigate('/dashboard-MPV');
                  } else if (category === 'MINI') {
                  navigate('/dashboard-MINI');
                 }
            }}
            className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                selectedCategory === category
                ? 'bg-red-500 text-white'
                : 'bg-gray-200 hover:bg-gray-300'
            }`}
            >
            {category}
            </button>
        ))}
        </div>

        {/* Car Card - Category A*/}
        <div className="bg-gray-50 shadow-md rounded-lg p-6 relative">
          <h2 className="text-xl font-bold mb-2">{carDetails.category}</h2>
          <img
            src={carDetails.imageUrl}
            alt="Car"
            className="w-full h-48 object-cover rounded mb-4"
          />
          <div>
            <h3 className="font-semibold">Category A</h3>
            <h4 className="text-gray-600">KANCIL, VIVA & DLL</h4>
            <ul className="mt-4 space-y-2">
              {carDetails.models.map((model) => (
                <li
                  key={model.name}
                  className="flex justify-between border-b pb-2"
                >
                  <span>{model.name}</span>
                  <span>RM {model.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <button className="w-full bg-red-500 text-white py-2 rounded-full mt-6 hover:bg-red-600 transition-colors duration-200">
            Book an Appointment
          </button>
        </div>
        <br></br>

        {/* Car Card - Category B*/}
        <div className="bg-gray-50 shadow-md rounded-lg p-6 relative">
          <h2 className="text-xl font-bold mb-2">{carDetails.category}</h2>
          <img
            src={'/CategoryB-MINI.png'}
            alt="Car"
            className="w-full h-48 object-cover rounded mb-4"
          />
          <div>
            <h3 className="font-semibold">Category B</h3>
            <h4 className="text-gray-600">MYVI, ATOS & DLL</h4>
            <ul className="mt-4 space-y-2">
              {carDetails.models.map((model) => (
                <li
                  key={model.name}
                  className="flex justify-between border-b pb-2"
                >
                  <span>{model.name}</span>
                  <span>RM {model.price}</span>
                </li>
              ))}
            </ul>
          </div>
          <button className="w-full bg-red-500 text-white py-2 rounded-full mt-6 hover:bg-red-600 transition-colors duration-200">
            Book an Appointment
          </button>
        </div>

        {/* Pagination Indicator */}
        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(5)].map((_, index) => (
            <span
              key={index}
              className={`w-2.5 h-2.5 rounded-full ${
                index === 4 ? 'bg-red-500' : 'bg-gray-300'
              }`}
            ></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
