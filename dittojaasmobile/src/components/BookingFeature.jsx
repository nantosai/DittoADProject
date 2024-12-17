import React, { useState, useEffect } from 'react';
import axios from 'axios';

// Axios client for Hapio API
const apiClient = axios.create({
  baseURL: 'https://eu-central-1.hapio.net/v1/',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_HAPIO_API_KEY}`, // Ensure this is in .env file
  },
});

const BookingFeature = ({ onBookingSuccess }) => {
  const [services, setServices] = useState([]);
  const [selectedCarType, setSelectedCarType] = useState(null);
  const [selectedPaintJob, setSelectedPaintJob] = useState(null);
  const [selectedService, setSelectedService] = useState(null); // Selected service
  const [selectedAdditionalService, setSelectedAdditionalService] = useState(null);
  const [price, setPrice] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [bookableSlots, setBookableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [confirmationMessage, setConfirmationMessage] = useState('');
  const [loading, setLoading] = useState(false);

  // Define year options and month options
  const years = [2024, 2025];
  const months = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  const weekdays = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

  // Define price list
  const priceList = {
    Mini_A: {
      'Kansai Pro Clear': 1200,
      'Nippon High Solid': 1450,
      'Kansai High Shield Super Premium': 1650,
    },
    Mini_B: {
      'Kansai Pro Clear': 1300,
      'Nippon High Solid': 1550,
      'Kansai High Shield Super Premium': 1750,
    },
    Sedan_A: {
      'Kansai Pro Clear': 1500,
      'Nippon High Solid': 1750,
      'Kansai High Shield Super Premium': 1900,
    },
    Sedan_B: {
      'Kansai Pro Clear': 1700,
      'Nippon High Solid': 1950,
      'Kansai High Shield Super Premium': 2150,
    },
    SUV_A: {
      'Kansai Pro Clear': 1700,
      'Nippon High Solid': 2000,
      'Kansai High Shield Super Premium': 2200,
    },
    SUV_B: {
      'Kansai Pro Clear': 2000,
      'Nippon High Solid': 2300,
      'Kansai High Shield Super Premium': 2500,
    },
    MPV_A: {
      'Kansai Pro Clear': 1700,
      'Nippon High Solid': 2000,
      'Kansai High Shield Super Premium': 2200,
    },
    MPV_B: {
      'Kansai Pro Clear': 2000,
      'Nippon High Solid': 2300,
      'Kansai High Shield Super Premium': 2500,
    },
  };

  // Additional services price range (rough estimate)
  const additionalServicePrice = {
    'Cat Crystal': { min: 200, max: 500 },
    'Cat Pearl': { min: 200, max: 500 },
    'Cat Special Effect': { min: 300, max: 600 },
    'Cat Silver': { min: 400, max: 400 },
    'Simen': { min: 100, max: 300 },
    'Ketuk': { min: 150, max: 500 },
    'Gosok Buang Cat Rosak': { min: 300, max: 400 },
  };

  // Fetch available services
  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await apiClient.get('services');
        if (response.data && Array.isArray(response.data.data)) {
          setServices(response.data.data);
        } else {
          console.error('Expected an array, but received:', response.data);
        }
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };
    fetchServices();
  }, []);

  // Calculate the price based on selected car type, paint job, and additional services
  useEffect(() => {
    if (!selectedCarType || !selectedPaintJob) return;

    const basePrice = priceList[selectedCarType][selectedPaintJob];
    let totalPrice = basePrice;

    // Add price for additional service
    if (selectedAdditionalService) {
      const additionalService = additionalServicePrice[selectedAdditionalService];
      const avgPrice = (additionalService.min + additionalService.max) / 2;
      totalPrice += avgPrice;
    }

    setPrice(totalPrice);
  }, [selectedCarType, selectedPaintJob, selectedAdditionalService]);

  // Fetch available slots when service and date are selected
  useEffect(() => {
    const fetchSlots = async () => {
      if (!selectedDate || !selectedCarType || !selectedPaintJob || !selectedService) {
        return;
      }

      try {
        setLoading(true);
        const response = await apiClient.get(
          `services/${selectedService.id}/bookable-slots`,
          {
            params: {
              from: `${selectedDate}T00:00:00+00:00`,
              to: `${selectedDate}T23:59:59+00:00`,
              location: selectedService.location_id,
            },
          }
        );
        setBookableSlots(response.data.data);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.error('Error fetching bookable slots:', error);
      }
    };
    fetchSlots();
  }, [selectedDate, selectedCarType, selectedPaintJob, selectedService]);

  // Handle Year Selection
  const handleYearSelect = (year) => {
    setSelectedYear(year);
    setSelectedMonth(null); // Reset month when year is changed
    setSelectedDate(null); // Reset date when year is changed
  };

  // Handle Month Selection
  const handleMonthSelect = (month) => {
    setSelectedMonth(month);
    setSelectedDate(null); // Reset date when month is changed
  };

  // Get available dates (weekdays only)
  const getAvailableDates = () => {
    if (!selectedYear || !selectedMonth) return [];

    const startDate = new Date(selectedYear, months.indexOf(selectedMonth), 1);
    const endDate = new Date(selectedYear, months.indexOf(selectedMonth) + 1, 0); // Last day of the month

    const availableDates = [];

    // Loop through each date of the month and check if it's a weekday (Monday to Friday)
    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      const day = date.getDay();
      if (day >= 1 && day <= 5) {
        availableDates.push(new Date(date));
      }
    }

    return availableDates;
  };

  // Handle Date Selection
  const handleDateSelect = (date) => {
    setSelectedDate(date);
    setSelectedSlot(null); // Reset selected slot when date is selected
  };

  // Handle Time Slot Selection
  const handleTimeSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  // Handle Booking Confirmation
  const handleBooking = async () => {
    if (!selectedSlot) {
      setConfirmationMessage('Please select a time slot.');
      return;
    }

    try {
      const response = await apiClient.post('bookings', {
        starts_at: selectedSlot.starts_at.toISOString(),
        ends_at: selectedSlot.ends_at.toISOString(),
      });

      setConfirmationMessage(`Booking confirmed! Your booking ID is: ${response.data.id}`);
      onBookingSuccess(response.data.id); // Trigger success callback
    } catch (error) {
      setConfirmationMessage('Failed to confirm booking. Please try again.');
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Book a Service</h1>

      {/* Step 1: Select Year */}
      <div>
        <h2>Select Year:</h2>
        {years.map((year) => (
          <button
            key={year}
            onClick={() => handleYearSelect(year)}
            style={{
              margin: '10px',
              padding: '10px',
              backgroundColor: selectedYear === year ? 'lightblue' : 'white',
            }}
          >
            {year}
          </button>
        ))}
      </div>

      {/* Step 2: Select Month */}
      {selectedYear && (
        <div>
          <h2>Select Month:</h2>
          {months.map((month) => (
            <button
              key={month}
              onClick={() => handleMonthSelect(month)}
              style={{
                margin: '10px',
                padding: '10px',
                backgroundColor: selectedMonth === month ? 'lightblue' : 'white',
              }}
            >
              {month}
            </button>
          ))}
        </div>
      )}

      {/* Step 3: Select Date (Weekdays only) */}
      {selectedMonth && (
        <div>
          <h2>Select Date (Weekdays only):</h2>
          {getAvailableDates().map((date) => (
            <button
              key={date}
              onClick={() => handleDateSelect(date)}
              style={{
                margin: '10px',
                padding: '10px',
                backgroundColor: selectedDate && selectedDate.getDate() === date.getDate() ? 'lightblue' : 'white',
              }}
            >
              {date.toLocaleDateString()}
            </button>
          ))}
        </div>
      )}

      {/* Step 4: Show Services */}
      {selectedDate && (
        <div>
          <h2>Select Service:</h2>
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => setSelectedService(service)}
              style={{
                margin: '10px',
                padding: '10px',
                backgroundColor: selectedService === service ? 'lightblue' : 'white',
              }}
            >
              {service.name}
            </button>
          ))}
        </div>
      )}

      {/* Step 5: Show Available Time Slots */}
      {selectedService && selectedDate && (
        <div>
          <h3>Available Time Slots:</h3>
          <div>
            {loading ? (
              <div>Loading slots...</div>
            ) : (
              bookableSlots.map((slot) => (
                <button
                  key={slot.starts_at}
                  onClick={() => handleTimeSlotSelect(slot)}
                  style={{
                    margin: '10px',
                    padding: '10px',
                    backgroundColor: selectedSlot && selectedSlot.starts_at === slot.starts_at ? 'lightgreen' : 'white',
                  }}
                >
                  {new Date(slot.starts_at).toLocaleTimeString()} - {new Date(slot.ends_at).toLocaleTimeString()}
                </button>
              ))
            )}
          </div>
        </div>
      )}

      {/* Step 6: Submit Booking */}
      {selectedSlot && (
        <div>
          <h2>Confirm Your Booking:</h2>
          <button
            onClick={handleBooking}
            style={{
              padding: '20px',
              background: 'red',
              color: 'white',
              fontSize: '18px',
              width: '200px',
              marginTop: '20px',
            }}
          >
            Submit Booking
          </button>
        </div>
      )}

      {/* Display Confirmation Message */}
      {confirmationMessage && (
        <div style={{ marginTop: '20px', padding: '10px', background: '#f9f9f9', border: '1px solid #ccc' }}>
          <h3>{confirmationMessage}</h3>
        </div>
      )}
    </div>
  );
};

export default BookingFeature;
