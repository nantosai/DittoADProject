// App.jsx
import React, { useState } from 'react';
import BookingFeature from './components/BookingFeature'; // Import BookingFeature

const App = () => {
  const [bookingSuccess, setBookingSuccess] = useState(null);

  const handleBookingSuccess = (bookingId) => {
    setBookingSuccess(bookingId);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Welcome to the Booking System</h1>

      {/* Show BookingFeature component */}
      <BookingFeature onBookingSuccess={handleBookingSuccess} />

      {/* Display booking success message */}
      {bookingSuccess && (
        <div style={{ marginTop: '20px', padding: '10px', backgroundColor: 'lightgreen', border: '1px solid #ccc' }}>
          <h2>Your booking was successful! Booking ID: {bookingSuccess}</h2>
        </div>
      )}
    </div>
  );
};

export default App;
