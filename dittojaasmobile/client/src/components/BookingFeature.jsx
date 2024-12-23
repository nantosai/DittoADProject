import React, { useState } from 'react';
import axios from 'axios';
import { Button, TextField, FormControl, InputLabel, Select, MenuItem, Checkbox, ListItemText } from '@mui/material';

const BookingFeature = () => {
  const [selectedCarType, setSelectedCarType] = useState('');
  const [selectedPaintJob, setSelectedPaintJob] = useState('');
  const [selectedAdditionalServices, setSelectedAdditionalServices] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [bookingStatus, setBookingStatus] = useState('');

  const priceList = [
    { name: "Mini A (Kancil, Viva, & DL)", paintJobs: { "Kansai Pro Clear": 1200, "Nippon High Solid": 1450, "Kansai High Shield Super Premium": 1650 } },
    { name: "Mini B (Myvi, ATOS, DLL)", paintJobs: { "Kansai Pro Clear": 1300, "Nippon High Solid": 1550, "Kansai High Shield Super Premium": 1750 } },
    { name: "Sedan A (Persona, Baja, & DL)", paintJobs: { "Kansai Pro Clear": 1500, "Nippon High Solid": 1750, "Kansai High Shield Super Premium": 1900 } },
    { name: "Sedan B (Mercedes, Camry & DL)", paintJobs: { "Kansai Pro Clear": 1700, "Nippon High Solid": 1950, "Kansai High Shield Super Premium": 2150 } },
    { name: "SUV A (Kembara, Ativa & DL)", paintJobs: { "Kansai Pro Clear": 1700, "Nippon High Solid": 2000, "Kansai High Shield Super Premium": 2200 } },
    { name: "SUV B (Harrier & DL)", paintJobs: { "Kansai Pro Clear": 2000, "Nippon High Solid": 2300, "Kansai High Shield Super Premium": 2500 } },
    { name: "MPV A (Alza, Avanza & DLL)", paintJobs: { "Kansai Pro Clear": 1700, "Nippon High Solid": 2000, "Kansai High Shield Super Premium": 2200 } },
    { name: "MPV B (Vellfire, Alphard & DLL)", paintJobs: { "Kansai Pro Clear": 2000, "Nippon High Solid": 2300, "Kansai High Shield Super Premium": 2500 } }
  ];

  const handleCarTypeChange = (event) => {
    setSelectedCarType(event.target.value);
    updatePrice();
  };

  const handlePaintJobChange = (event) => {
    setSelectedPaintJob(event.target.value);
    updatePrice();
  };

  const handleAdditionalServicesChange = (event) => {
    setSelectedAdditionalServices(event.target.value);
    updatePrice();
  };

  const updatePrice = () => {
    const carType = priceList.find(item => item.name === selectedCarType);
    if (carType && selectedPaintJob) {
      const paintJobPrice = carType.paintJobs[selectedPaintJob];
      const additionalServiceCost = selectedAdditionalServices.length * 100; // Example cost for additional services
      const total = paintJobPrice + additionalServiceCost;
      setTotalPrice(total);
    }
  };

  const handleBooking = async () => {
    const bookingData = {
      carType: selectedCarType,
      paintJob: selectedPaintJob,
      additionalServices: selectedAdditionalServices,
      totalPrice,
      appointmentDate: selectedDate,
      appointmentTime: selectedTime,
    };

    try {
      const response = await axios.post('http://localhost:5000/api/bookings', bookingData);
      setBookingStatus("Booking confirmed! " + response.data);
    } catch (error) {
      setBookingStatus("Failed to save booking. Please try again.");
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div>
      <FormControl fullWidth>
        <InputLabel>Car Type</InputLabel>
        <Select value={selectedCarType} onChange={handleCarTypeChange}>
          {priceList.map((car, index) => (
            <MenuItem key={index} value={car.name}>{car.name}</MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Paint Job</InputLabel>
        <Select value={selectedPaintJob} onChange={handlePaintJobChange}>
          {selectedCarType && priceList.find(item => item.name === selectedCarType)?.paintJobs && 
            Object.keys(priceList.find(item => item.name === selectedCarType).paintJobs).map((paintJob, index) => (
              <MenuItem key={index} value={paintJob}>{paintJob}</MenuItem>
            ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Additional Services</InputLabel>
        <Select
          multiple
          value={selectedAdditionalServices}
          onChange={handleAdditionalServicesChange}
          renderValue={(selected) => selected.join(', ')}
        >
          {['Polish', 'Interior Cleaning', 'Engine Detailing'].map((service, index) => (
            <MenuItem key={index} value={service}>
              <Checkbox checked={selectedAdditionalServices.indexOf(service) > -1} />
              <ListItemText primary={service} />
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div>
        <p>Total Price: {totalPrice}</p>
        <TextField
          label="Appointment Date"
          type="date"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
          fullWidth
        />
      </div>

      <div>
        <TextField
          label="Appointment Time"
          type="time"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
          fullWidth
        />
      </div>

      <Button onClick={handleBooking} variant="contained">Confirm Booking</Button>

      {bookingStatus && <p>{bookingStatus}</p>}
    </div>
  );
};

export default BookingFeature;
