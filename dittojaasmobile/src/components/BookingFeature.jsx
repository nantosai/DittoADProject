import React, { useState } from 'react';
import {
  Box,
  Grid,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Checkbox,
  FormGroup,
  FormControlLabel,
  Typography,
  Paper,
  RadioGroup,
  Radio,
} from '@mui/material';
import apiClient from './API';

const carTypes = [
  { name: 'Mini A', paintJobs: { 'Kansai Pro Clear': 1200, 'Nippon High Solid': 1450, 'Kansai High Shield Super Premium': 1650 } },
  { name: 'Mini B', paintJobs: { 'Kansai Pro Clear': 1300, 'Nippon High Solid': 1550, 'Kansai High Shield Super Premium': 1750 } },
  // Add other car types
];

const services = [
  { name: 'Cat Crystal', priceRange: [200, 500] },
  { name: 'Cat Pearl', priceRange: [200, 500] },
  { name: 'Cat Special Effect', priceRange: [300, 600] },
  { name: 'Cat Silver', priceRange: [400, 400] },
  { name: 'Simen', priceRange: [100, 300] },
  { name: 'Ketuk', priceRange: [150, 500] },
];

const BookingFeature = () => {
  const [step, setStep] = useState(1);
  const [carType, setCarType] = useState('');
  const [paintJob, setPaintJob] = useState('');
  const [additionalServices, setAdditionalServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookableSlots, setBookableSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);

  const handleCarTypeChange = (event) => {
    setCarType(event.target.value);
    setPaintJob('');
    setAdditionalServices([]);
    setTotalPrice(0);
  };

  const handlePaintJobChange = (event) => {
    const selectedPaintJob = event.target.value;
    const basePrice = carTypes.find((c) => c.name === carType).paintJobs[selectedPaintJob];
    setPaintJob(selectedPaintJob);
    updateTotal(basePrice, additionalServices);
  };

  const handleAdditionalServiceToggle = (service) => {
    const isSelected = additionalServices.includes(service.name);
    const updatedServices = isSelected
      ? additionalServices.filter((s) => s !== service.name)
      : [...additionalServices, service.name];

    setAdditionalServices(updatedServices);
    updateTotal(
      paintJob ? carTypes.find((c) => c.name === carType).paintJobs[paintJob] : 0,
      updatedServices
    );
  };

  const updateTotal = (basePrice, services) => {
    const servicePrice = services.reduce((sum, name) => {
      const service = services.find((s) => s.name === name);
      return sum + (service ? (service.priceRange[0] + service.priceRange[1]) / 2 : 0);
    }, 0);
    setTotalPrice(basePrice + servicePrice);
  };

  const fetchBookableSlots = async () => {
    try {
      const response = await apiClient.get('/services/{service-id}/bookable-slots', {
        params: {
          location: 'jenderam-autoworks-id',
          from: new Date().toISOString(),
          to: new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toISOString(),
        },
      });
      setBookableSlots(response.data.data);
    } catch (error) {
      console.error('Error fetching slots:', error);
    }
  };

  const handleBooking = async () => {
    try {
      await apiClient.post('/bookings', {
        location_id: 'jenderam-autoworks-id',
        service_id: 'selected-service-id',
        starts_at: selectedSlot.starts_at,
        ends_at: selectedSlot.ends_at,
      });
      alert('Booking Confirmed!');
    } catch (error) {
      console.error('Error creating booking:', error);
    }
  };

  return (
    <Paper sx={{ p: 3 }}>
      {step === 1 && (
        <>
          <Typography variant="h5">Step 1: Select Car Type and Services</Typography>
          <FormControl fullWidth margin="normal">
            <InputLabel>Car Type</InputLabel>
            <Select value={carType} onChange={handleCarTypeChange}>
              {carTypes.map((car) => (
                <MenuItem key={car.name} value={car.name}>
                  {car.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          {carType && (
            <FormControl fullWidth margin="normal">
              <InputLabel>Paint Job</InputLabel>
              <Select value={paintJob} onChange={handlePaintJobChange}>
                {Object.entries(carTypes.find((c) => c.name === carType).paintJobs).map(
                  ([job, price]) => (
                    <MenuItem key={job} value={job}>
                      {job} - RM {price}
                    </MenuItem>
                  )
                )}
              </Select>
            </FormControl>
          )}

          <Typography variant="h6" sx={{ mt: 2 }}>
            Additional Services
          </Typography>
          <FormGroup>
            {services.map((service) => (
              <FormControlLabel
                key={service.name}
                control={
                  <Checkbox
                    onChange={() => handleAdditionalServiceToggle(service)}
                  />
                }
                label={`${service.name} - RM ${service.priceRange[0]} to RM ${service.priceRange[1]}`}
              />
            ))}
          </FormGroup>

          <Typography variant="h6" sx={{ mt: 2 }}>
            Total Price: RM {totalPrice}
          </Typography>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={() => setStep(2)}
            sx={{ mt: 2 }}
          >
            Next
          </Button>
        </>
      )}

      {step === 2 && (
        <>
          <Typography variant="h5">Step 2: Select Date and Time</Typography>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={fetchBookableSlots}
          >
            Fetch Bookable Slots
          </Button>
          <RadioGroup sx={{ mt: 2 }}>
            {bookableSlots.map((slot) => (
              <FormControlLabel
                key={slot.starts_at}
                value={slot.starts_at}
                control={<Radio />}
                label={`${new Date(slot.starts_at).toLocaleString()} - ${new Date(
                  slot.ends_at
                ).toLocaleString()}`}
                onChange={() => setSelectedSlot(slot)}
              />
            ))}
          </RadioGroup>
          <Button
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={() => setStep(3)}
          >
            Next
          </Button>
        </>
      )}

      {step === 3 && (
        <>
          <Typography variant="h5">Step 3: Confirm Booking</Typography>
          <Typography sx={{ mt: 2 }}>
            Total Price: RM {totalPrice}
          </Typography>
          <Typography sx={{ mt: 2 }}>
            Selected Slot: {new Date(selectedSlot?.starts_at).toLocaleString()}
          </Typography>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            sx={{ mt: 2 }}
            onClick={handleBooking}
          >
            Confirm Booking
          </Button>
        </>
      )}
    </Paper>
  );
};

export default BookingFeature;
