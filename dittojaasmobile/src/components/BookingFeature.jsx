import React, { useState, useEffect } from "react";
import axios from "axios";

// Axios client for Hapio API
const apiClient = axios.create({
  baseURL: "https://eu-central-1.hapio.net/v1/",
  headers: {
    'Authorization': `Bearer ${import.meta.env.VITE_HAPIO_API_KEY}`,
  },
});

const BookingFeature = () => {
  const locationAddress = "No12, Kedai IKS Jenderam Hulu, Jenderam Hulu, 43800 Dengkil, Selangor";
  const [locationId, setLocationId] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [bookableSlots, setBookableSlots] = useState([]);
  const [resources, setResources] = useState([]); // Track car resources

  // States for user selections
  const [selectedCar, setSelectedCar] = useState(null);
  const [selectedPaintJob, setSelectedPaintJob] = useState(null);
  const [selectedYear, setSelectedYear] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [totalPrice, setTotalPrice] = useState(0);
  const [bookingConfirmed, setBookingConfirmed] = useState(false);

  const currentYear = new Date().getFullYear();
  const years = [currentYear, currentYear + 1];
  const months = Array.from({ length: 12 }, (_, i) => i + 1);
  const dates = Array.from({ length: 31 }, (_, i) => i + 1);

  const carTypes = [
    { name: "Mini A", paintJobs: { "Kansai Pro Clear": 1200, "Nippon High Solid": 1450 } },
    { name: "Mini B", paintJobs: { "Kansai Pro Clear": 1300, "Nippon High Solid": 1550 } },
    { name: "Sedan A", paintJobs: { "Kansai Pro Clear": 1500, "Nippon High Solid": 1750 } },
    { name: "SUV A", paintJobs: { "Kansai Pro Clear": 1700, "Nippon High Solid": 2000 } },
  ];

  // Create Location
  useEffect(() => {
    const createLocationAndResources = async () => {
      try {
        const locationResponse = await apiClient.post("/locations", {
          name: "Jenderam Hulu Car Service",
          address: locationAddress,
          coordinates: { latitude: 2.9942, longitude: 101.6971 },
          time_zone: "Asia/Kuala_Lumpur",
          resource_selection_strategy: "equalize",
          enabled: true,
        });

        setLocationId(locationResponse.data.id);

        // Create car resources and link services
        await createResourcesAndServices(locationResponse.data.id);
      } catch (error) {
        console.error("Error creating location:", error);
      }
    };

    createLocationAndResources();
  }, []);

  // Create Resources and Services
  const createResourcesAndServices = async (locationId) => {
    try {
      const createdResources = [];
      for (const car of carTypes) {
        const resourceResponse = await apiClient.post("/resources", {
          location_id: locationId,
          name: car.name,
          enabled: true,
        });

        console.log("Resource Created:", resourceResponse.data);
        createdResources.push(resourceResponse.data);

        // Create a recurring schedule for each resource
        await createRecurringSchedule(resourceResponse.data.id, locationId);
      }
      setResources(createdResources);
    } catch (error) {
      console.error("Error creating resources/services:", error);
    }
  };

  const createRecurringSchedule = async (resourceId, locationId) => {
    try {
      const scheduleResponse = await apiClient.post(
        `/resources/${resourceId}/recurring-schedules`,
        { location_id: locationId, start_date: "2024-01-01" }
      );

      const scheduleId = scheduleResponse.data.id;

      // Create schedule blocks for weekdays and Saturdays
      const weekdays = ["monday", "tuesday", "wednesday", "thursday", "friday", "saturday"];
      for (const day of weekdays) {
        await apiClient.post(
          `/resources/${resourceId}/recurring-schedules/${scheduleId}/schedule-blocks`,
          { weekday: day, start_time: "08:00:00", end_time: "12:00:00" }
        );
      }
      console.log("Recurring schedule created for resource:", resourceId);
    } catch (error) {
      console.error("Error creating recurring schedule:", error);
    }
  };

  // Fetch Available Time Slots
  useEffect(() => {
    if (!selectedYear || !selectedMonth || !selectedDate || !serviceId || !locationId) return;

    const fetchSlots = async () => {
      try {
        const response = await apiClient.get(`/services/${serviceId}/bookable-slots`, {
          params: {
            from: `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}T08:00:00`,
            to: `${selectedYear}-${String(selectedMonth).padStart(2, "0")}-${String(selectedDate).padStart(2, "0")}T12:00:00`,
            location: locationId,
          },
        });
        console.log("Bookable Slots:", response.data);
        setBookableSlots(response.data.data || []);
      } catch (error) {
        console.error("Error fetching bookable slots:", error);
      }
    };

    fetchSlots();
  }, [selectedYear, selectedMonth, selectedDate, serviceId, locationId]);

  const handleBookingSubmit = async () => {
    if (!selectedSlot) {
      alert("Please select a time slot.");
      return;
    }

    try {
      const bookingData = {
        location_id: locationId,
        service_id: serviceId,
        starts_at: selectedSlot.starts_at,
        ends_at: selectedSlot.ends_at,
      };

      await apiClient.post("/bookings", bookingData);
      setBookingConfirmed(true);
      alert("Booking confirmed!");
    } catch (error) {
      console.error("Error creating booking:", error);
      alert("Failed to confirm booking.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Car Service Booking</h1>

      {/* Date Selection */}
      <div>
        <h2>Select Date</h2>
        <select value={selectedYear} onChange={(e) => setSelectedYear(e.target.value)}>
          <option value="">Year</option>
          {years.map((y) => <option key={y} value={y}>{y}</option>)}
        </select>

        <select value={selectedMonth} onChange={(e) => setSelectedMonth(e.target.value)}>
          <option value="">Month</option>
          {months.map((m) => <option key={m} value={m}>{m}</option>)}
        </select>

        <select value={selectedDate} onChange={(e) => setSelectedDate(e.target.value)}>
          <option value="">Date</option>
          {dates.map((d) => <option key={d} value={d}>{d}</option>)}
        </select>
      </div>

      {/* Car Type Selection */}
      <h2>Select Car Type</h2>
      {carTypes.map((car) => (
        <button key={car.name} onClick={() => setSelectedCar(car)}>
          {car.name}
        </button>
      ))}

      {/* Time Slot Selection */}
      <h2>Select Time Slot</h2>
      {bookableSlots.length > 0 ? (
        bookableSlots.map((slot) => (
          <button key={slot.starts_at} onClick={() => setSelectedSlot(slot)}>
            {new Date(slot.starts_at).toLocaleTimeString()} - {new Date(slot.ends_at).toLocaleTimeString()}
          </button>
        ))
      ) : (
        <p>No available slots</p>
      )}

      <button onClick={handleBookingSubmit} style={{ marginTop: "20px", padding: "10px 20px" }}>
        Submit Booking
      </button>

      {bookingConfirmed && <p>Booking Confirmed!</p>}
    </div>
  );
};

export default BookingFeature;
