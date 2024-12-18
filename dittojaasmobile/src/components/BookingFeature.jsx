import React, { useState, useEffect } from 'react';
import { createLocation, createService, fetchBookableSlots, createBooking } from './apiClient';
import { TextField, Button, Box, Typography, CircularProgress, Checkbox, FormControlLabel } from '@mui/material';

const carTypes = [
  { name: "Mini A (Kancil, Viva, & DL)", paintJobs: { "Kansai Pro Clear": 1200, "Nippon High Solid": 1450, "Kansai High Shield Super Premium": 1650 } },
  { name: "Mini B (Myvi, ATOS, DLL)", paintJobs: { "Kansai Pro Clear": 1300, "Nippon High Solid": 1550, "Kansai High Shield Super Premium": 1750 } },
  { name: "Sedan A (Persona, Baja, & DL)", paintJobs: { "Kansai Pro Clear": 1500, "Nippon High Solid": 1750, "Kansai High Shield Super Premium": 1900 } },
  { name: "Sedan B (Mercedes, Camry & DL)", paintJobs: { "Kansai Pro Clear": 1700, "Nippon High Solid": 1950, "Kansai High Shield Super Premium": 2150 } },
  { name: "SUV A (Kembara, Ativa & DL)", paintJobs: { "Kansai Pro Clear": 1700, "Nippon High Solid": 2000, "Kansai High Shield Super Premium": 2200 } },
  { name: "SUV B (Harrier & DL)", paintJobs: { "Kansai Pro Clear": 2000, "Nippon High Solid": 2300, "Kansai High Shield Super Premium": 2500 } },
  { name: "MPV A (Alza, Avanza & DLL)", paintJobs: { "Kansai Pro Clear": 1700, "Nippon High Solid": 2000, "Kansai High Shield Super Premium": 2200 } },
  { name: "MPV B (Vellfire, Alphard & DLL)", paintJobs: { "Kansai Pro Clear": 2000, "Nippon High Solid": 2300, "Kansai High Shield Super Premium": 2500 } }
];

const additionalServices = [
  { name: "Cat Crystal", priceRange: ["200.000", "500.000"] },
  { name: "Cat Pearl", priceRange: ["200.000", "500.000"] },
  { name: "Cat Special Effect", priceRange: ["300.000", "600.000"] },
  { name: "Cat Silver", priceRange: ["400.000", "400.000"] },
  { name: "Simen", priceRange: ["100.000", "300.000"] },
  { name: "Ketuk", priceRange: ["150.000", "500.000"] }
];

const BookingFeature = () => {
  const [locationId, setLocationId] = useState(null);
  const [serviceId, setServiceId] = useState(null); 
  const [selectedCarType, setSelectedCarType] = useState(null); 
  const [selectedPaintJob, setSelectedPaintJob] = useState(null);
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [bookingDate, setBookingDate] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);
  const [showBookingForm, setShowBookingForm] = useState(false);

  // Create Location
  useEffect(() => {
    const createLocationAsync = async () => {
      try {
        const createdLocationId = await createLocation('Perfect Health - Kuala Lumpur');
        setLocationId(createdLocationId);  // Corrected this line
      } catch (err) {
        setError('Error creating location');
      }
    };
  
    createLocationAsync();
  }, []);
  
  // Handle selecting a paint job
  const handleSelectPaintJob = (carType, paintJob) => {
    setSelectedCarType(carType);
    setSelectedPaintJob(paintJob);
  };

  // Handle selecting additional services
  const handleSelectAdditionalService = (serviceName, price) => {
    setSelectedAdditionalServices(prevState => {
      const updatedServices = [...prevState];
      const serviceIndex = updatedServices.findIndex(service => service.name === serviceName);

      if (serviceIndex > -1) {
        updatedServices.splice(serviceIndex, 1);  // Remove if already selected
      } else {
        updatedServices.push({ name: serviceName, price: parseFloat(price) });
      }

      return updatedServices;
    });
  };

  // Confirm Service (Create Service and Trigger Slot Fetching)
  const handleConfirmService = async () => {
    if (!selectedCarType || !selectedPaintJob || selectedAdditionalServices.length === 0) {
      setError('Please select a car type, a paint job, and at least one additional service');
      return;
    }

    setLoading(true);
    try {
      // Calculate total price including additional services
      const paintJobPrice = selectedCarType.paintJobs[selectedPaintJob];
      const additionalServiceTotal = selectedAdditionalServices.reduce((acc, service) => acc + service.price, 0);
      const totalPrice = paintJobPrice + additionalServiceTotal;

      // Create service with the calculated price
      const service = await createService(selectedPaintJob, totalPrice.toFixed(3));  // Ensure price is formatted
      setServiceId(service.id);  // Corrected: Ensure serviceId is updated with the correct service
      setShowBookingForm(true);
      setError(null);
      setAvailableSlots([]); // Clear previous available slots

      // Check that locationId is available before fetching slots
      if (locationId && service.id && bookingDate) {
        await fetchSlots(bookingDate);  // Fetch slots immediately after service creation
      } else {
        setError('Location or service not created yet');
      }
    } catch (err) {
      setError('Error creating service');
    } finally {
      setLoading(false);
    }
  };

  // Fetch available slots based on selected date
  const fetchSlots = async (date) => {
    if (!serviceId || !locationId) {
      setError('Service or location not created yet');
      return;
    }
  
    setLoading(true);
    try {
      const formattedFrom = `${date}T08:00:00+08:00`;
      const formattedTo = `${date}T17:00:00+08:00`;
  
      const slots = await fetchBookableSlots(locationId, serviceId, formattedFrom, formattedTo);
      setAvailableSlots(slots || []);
    } catch (err) {
      setError('Error fetching available slots');
      setAvailableSlots([]);
    } finally {
      setLoading(false);
    }
  };
  

  // Handle confirming booking
  const handleConfirmBooking = async () => {
    if (!selectedSlot) {
      setError('Please select a time slot');
      return;
    }

    try {
      const response = await createBooking(locationId, serviceId, selectedSlot.starts_at, selectedSlot.ends_at);
      setBookingConfirmed(true);
      setError(null);
      console.log('Booking Response:', response);
    } catch (err) {
      setError('Error creating booking');
    }
  };

  return (
    <div>
      <Typography variant="h4" gutterBottom>Booking Feature</Typography>

      {/* Step 1: Car Type and Paint Job Selection */}
      {!showBookingForm && (
        <>
          <Typography variant="h6">Select a Car Type and Paint Job</Typography>
          <Box style={{ marginTop: '20px' }}>
            {carTypes.map((carType) => (
              <Box key={carType.name}>
                <Typography variant="h6">{carType.name}</Typography>
                {Object.keys(carType.paintJobs).map((paintJob) => (
                  <Button
                    key={paintJob}
                    variant="outlined"
                    onClick={() => handleSelectPaintJob(carType, paintJob)}
                    style={{ margin: '5px' }}
                  >
                    {paintJob} - ${carType.paintJobs[paintJob].toFixed(3)}
                  </Button>
                ))}
              </Box>
            ))}
          </Box>

          <Typography variant="h6" style={{ marginTop: '20px' }}>Select Additional Services</Typography>
          <Box style={{ marginTop: '20px' }}>
            {additionalServices.map((service) => (
              <FormControlLabel
                key={service.name}
                control={
                  <Checkbox
                    onChange={(e) => handleSelectAdditionalService(service.name, service.priceRange[0])}
                    name={service.name}
                    color="primary"
                  />
                }
                label={`${service.name} - ${service.priceRange[0]} - ${service.priceRange[1]}`}
              />
            ))}
          </Box>

          <Button
            variant="contained"
            color="primary"
            onClick={handleConfirmService}
            style={{ marginTop: '20px' }}
            disabled={loading || !selectedCarType || !selectedPaintJob || selectedAdditionalServices.length === 0}
          >
            {loading ? <CircularProgress size={24} /> : 'Next'}
          </Button>
        </>
      )}

      {/* Step 2: Booking Form */}
      {showBookingForm && (
        <>
          <TextField
            label="Booking Date"
            type="date"
            value={bookingDate}
            onChange={(e) => setBookingDate(e.target.value)}
            InputLabelProps={{ shrink: true }}
            fullWidth
            style={{ marginTop: '20px' }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={() => fetchSlots(bookingDate)}
            style={{ marginTop: '20px' }}
            disabled={loading || !bookingDate}
          >
            {loading ? <CircularProgress size={24} /> : 'Fetch Available Slots'}
          </Button>

          {/* Step 3: Select Slot */}
          {availableSlots.length > 0 && (
            <Box style={{ marginTop: '20px' }}>
              <Typography variant="h6">Available Slots</Typography>
              {availableSlots.map((slot) => (
                <Button
                  key={slot.starts_at}
                  variant="outlined"
                  onClick={() => setSelectedSlot(slot)}
                  style={{ margin: '5px' }}
                >
                  {new Date(slot.starts_at).toLocaleString()} - {new Date(slot.ends_at).toLocaleString()}
                </Button>
              ))}
            </Box>
          )}

          {/* Step 4: Confirm Booking */}
          {selectedSlot && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleConfirmBooking}
              style={{ marginTop: '20px' }}
            >
              Confirm Booking
            </Button>
          )}
        </>
      )}

      {/* Show Error or Success Messages */}
      {error && <Typography variant="body1" color="error">{error}</Typography>}
      {bookingConfirmed && <Typography variant="h6" color="primary">Booking Confirmed!</Typography>}
    </div>
  );
};

export default BookingFeature;
