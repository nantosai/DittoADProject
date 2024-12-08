import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DashboardPage = () => {
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');
  const navigate = useNavigate();

  const categories = ['ALL', 'SUV', 'SEDAN', 'MPV', 'MINI'];
  const carCategories = [
    {
      category: 'SUV',
      cards: [
        { imageUrl: '/CategoryA-SUV.png', title: 'Category A', description: 'KEMBARA, ATIVA & DLL' },
        { imageUrl: '/CategoryB-SUV.png', title: 'Category B', description: 'VELLFIRE, ALPHARD & DLL' },
      ],
    },
    {
      category: 'SEDAN',
      cards: [
        { imageUrl: '/CategoryA-SEDAN.png', title: 'Category A', description: 'PERSONA, WAJA & DLL' },
        { imageUrl: '/CategoryB-SEDAN.png', title: 'Category B', description: 'MERC, CAMRY & DLL' },
      ],
    },
    {
      category: 'MPV',
      cards: [
        { imageUrl: '/CategoryA-MPV.png', title: 'Category A', description: 'ALZA, AVANZA & DLL' },
        { imageUrl: '/CategoryB-MPV.png', title: 'Category B', description: 'VELLFIRE, ALPHARD & DLL' },
      ],
    },
    {
      category: 'MINI',
      cards: [
        { imageUrl: '/CategoryA-MINI.png', title: 'Category A', description: 'KANCIL, VIVA & DLL' },
        { imageUrl: '/CategoryB-MINI.png', title: 'Category B', description: 'MYVI, ATOS & DLL' },
      ],
    },
  ];

  const carModels = [
    { name: 'KANSAI PRO CLEAR', price: 1700 },
    { name: 'NIPPON HIGH SOLID', price: 2000 },
    { name: 'KANSAI HIGH SOLID SUPER PREMIUM', price: 2200 },
  ];

  const navigateToCategory = (category) => {
    setSelectedCategory(category);
    navigate(category === 'ALL' ? '/dashboard' : `/dashboard-${category}`);
  };

  const filteredCategories = carCategories
    .filter((category) =>
      selectedCategory === 'ALL' || category.category === selectedCategory
    )
    .map((category) => ({
      ...category,
      cards: category.cards.filter((card) => {
        const searchLower = searchTerm.toLowerCase();
        return (
          !searchTerm ||
          card.title.toLowerCase().includes(searchLower) ||
          card.description.toLowerCase().includes(searchLower)
        );
      }),
    }))
    .filter((category) => category.cards.length > 0);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="max-w-lg w-full bg-white shadow-lg rounded-lg p-6">
        {/* Header */}
        <header className="flex justify-between items-center pb-6 border-b">
          <div className="flex items-center space-x-2">
            <img src="/App-Icon.png" alt="JA logo" className="h-10 rounded-full" />
          </div>
          <div className="flex items-center space-x-4">
            <img src="https://via.placeholder.com/50" alt="Profile" className="w-10 h-10 rounded-full border-2 border-gray-300" />
            <span className="font-semibold">M. Firdaus</span>
          </div>
        </header>

        {/* Welcome Message */}
        <h1 className="text-2xl font-bold mt-4">Welcome to Jenderam Autoworks!</h1>

        {/* Search Bar */}
        <div className="my-4 relative">
          <label htmlFor="search" className="sr-only">Search</label>
          <input
            id="search"
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Hinted Search"
            className="w-full border rounded-full p-2 pl-10 focus:outline-none focus:ring-2 focus:ring-red-500 bg-white"
          />
          <span className="absolute right-3 top-3 text-black-400">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="w-5 h-5">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l5 5m-5-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
        </div>

        {/* Category Tabs */}
        <div className="flex justify-center space-x-2 mb-6">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => navigateToCategory(category)}
              className={`px-4 py-2 rounded-full transition-colors duration-200 ${
                selectedCategory === category ? 'bg-red-500 text-white' : 'bg-gray-200 hover:bg-gray-300'
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Car Cards */}
        {filteredCategories.length > 0 ? (
          filteredCategories.map((car) =>
            car.cards.map((card, idx) => (
              <div key={`${car.category}-${idx}`} className="bg-gray-50 shadow-md rounded-lg p-6 mb-6">
                <h2 className="text-xl font-bold mb-2">{car.category}</h2>
                <img src={card.imageUrl} alt="Car" className="w-full h-48 object-cover rounded mb-4" />
                <h3 className="font-semibold">{card.title}</h3>
                <h4 className="text-gray-600">{card.description}</h4>
                <ul className="mt-4 space-y-2">
                  {carModels.map((model) => (
                    <li key={model.name} className="flex justify-between border-b pb-2">
                      <span>{model.name}</span>
                      <span>RM {model.price}</span>
                    </li>
                  ))}
                </ul>
                <button className="w-full bg-red-500 text-white py-2 rounded-full mt-6 hover:bg-red-600 transition-colors duration-200">
                  Book an Appointment
                </button>
              </div>
            ))
          )
        ) : (
          <div className="text-center text-gray-500">No results found.</div>
        )}

        {/* Pagination */}
        <div className="flex justify-center mt-4 space-x-2">
          {[...Array(5)].map((_, index) => (
            <span key={index} className={`w-2.5 h-2.5 rounded-full ${index === 0 ? 'bg-red-500' : 'bg-gray-300'}`}></span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
