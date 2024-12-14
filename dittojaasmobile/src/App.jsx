import React, { useState } from "react";
import BookingFeature from "./components/BookingFeature";

function App() {
  const [isBooking, setIsBooking] = useState(false);
  const [staffResources, setStaffResources] = useState([]);
  const [services, setServices] = useState([]);
  const [error, setError] = useState(null);

  const handleBookAppointment = async () => {
    setIsBooking(true);
    setError(null);
    try {
      const { staffResource, services: fetchedServices } =
        await BookingFeature();
      setStaffResources([staffResource]);
      setServices(fetchedServices);
    } catch (err) {
      setError(err);
      console.error("Booking failed:", err);
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white py-6">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <h1 className="text-4xl font-bold">Jenderam Autoworks</h1>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="text-center">
          <button
            onClick={handleBookAppointment}
            disabled={isBooking}
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out disabled:opacity-50"
          >
            {isBooking ? "Loading..." : "Book Appointment"}
          </button>

          {error && (
            <div className="text-red-500 mt-4 p-4 bg-red-50 rounded-lg">
              Error: {error.message}
            </div>
          )}

          {services.length > 0 && (
            <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {services.map((service) => (
                <div
                  key={service.id}
                  className="bg-white shadow-lg rounded-lg p-6"
                >
                  <h3 className="font-bold text-lg mb-2">{service.name}</h3>
                  <p className="text-gray-600">{service.description}</p>
                  <p className="text-green-600 font-bold mt-2">
                    RM {service.price}
                  </p>
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
