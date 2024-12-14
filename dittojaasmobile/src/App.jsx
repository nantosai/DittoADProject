import React, { useState } from 'react';
import BookingFeature from './components/BookingFeature';

function App() {
  const [isBooking, setIsBooking] = useState(false);
  const [staffResources, setStaffResources] = useState([]); // For staff
  const [services, setServices] = useState([]); // For services grouped by category
  const [error, setError] = useState(null);

  const handleBookAppointment = async () => {
    setIsBooking(true);
    try {
      const { staffResource, services: fetchedServices } = await BookingFeature();
      setStaffResources([staffResource]); // Setting only the staff resource
      setServices(fetchedServices); // Setting all services for display
    } catch (err) {
      setError(err);
      console.error("Booking failed:", err);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6 text-center">
        <h1 className="text-4xl font-bold">Jenderam Autoworks</h1>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <button 
            onClick={handleBookAppointment}
            disabled={isBooking}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
          >
            {isBooking ? 'Booking...' : 'Book Appointment'}
          </button>

          {error && (
            <div className="text-red-500 mt-4">
              Error: {error.message}
            </div>
          )}

          {staffResources.length > 0 && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Staff</h2>
              {staffResources.map((staff) => (
                <div key={staff.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                  <p className="font-bold">{staff.name}</p>
                </div>
              ))}
            </div>
          )}

          {services.length > 0 && (
            <div className="mt-6">
              <h2 className="text-2xl font-semibold mb-4">Services</h2>
              {/* Display services categorized by category */}
              {services.reduce((categories, service) => {
                const category = service.name.split('(')[1].split(')')[0]; // Extract category from service name
                if (!categories[category]) {
                  categories[category] = [];
                }
                categories[category].push(service);
                return categories;
              }, {}).map((category, index) => (
                <div key={index} className="mb-6">
                  <h3 className="text-xl font-semibold mb-2">{category}</h3>
                  {category.map((service) => (
                    <div key={service.id} className="bg-white shadow-md rounded-lg p-4 mb-4">
                      <p className="font-bold">{service.name}</p>
                      <p>Price: {service.price}</p>
                      <p>Duration: {service.duration}</p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
