import React, { useState } from "react";
import {
  createResource,
  createService,
  getBookableSlots,
  createBooking,
} from "./apiClient";

const Feature = () => {
  const [carType, setCarType] = useState("");
  const [paintJob, setPaintJob] = useState("");
  const [additionalService, setAdditionalService] = useState("");
  const [date, setDate] = useState("");
  const [slots, setSlots] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [resourceId, setResourceId] = useState(null);
  const [serviceId, setServiceId] = useState(null);
  const [locationId] = useState("YOUR_LOCATION_ID"); // Replace with actual location ID

  const handleCarTypeConfirm = async () => {
    const resource = await createResource(carType);
    setResourceId(resource.id);
  };

  const handleServiceCreation = async () => {
    const service = await createService(
      `${paintJob} + ${additionalService}`,
      "PT1H", // 1-hour duration
      "PT1H"
    );
    setServiceId(service.id);
  };

  const fetchBookableSlots = async () => {
    const from = `${date}T08:00:00+00:00`; // Adjust time as needed
    const to = `${date}T18:00:00+00:00`;
    const availableSlots = await getBookableSlots(
      serviceId,
      locationId,
      from,
      to
    );
    setSlots(availableSlots.data);
  };

  const handleBooking = async () => {
    if (selectedSlot) {
      const booking = await createBooking(
        locationId,
        serviceId,
        selectedSlot.starts_at,
        selectedSlot.ends_at
      );
      alert(`Booking confirmed! Booking ID: ${booking.id}`);
    }
  };

  return (
    <div>
      <h1>Car Painting Service Booking</h1>
      <div>
        <label>Car Type: </label>
        <input
          type="text"
          value={carType}
          onChange={(e) => setCarType(e.target.value)}
        />
        <button onClick={handleCarTypeConfirm}>Confirm Car Type</button>
      </div>
      {resourceId && (
        <div>
          <label>Paint Job: </label>
          <input
            type="text"
            value={paintJob}
            onChange={(e) => setPaintJob(e.target.value)}
          />
          <label>Additional Service: </label>
          <input
            type="text"
            value={additionalService}
            onChange={(e) => setAdditionalService(e.target.value)}
          />
          <button onClick={handleServiceCreation}>Next</button>
        </div>
      )}
      {serviceId && (
        <div>
          <label>Select Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
          <button onClick={fetchBookableSlots}>Get Available Slots</button>
        </div>
      )}
      {slots.length > 0 && (
        <div>
          <h3>Available Slots</h3>
          <ul>
            {slots.map((slot) => (
              <li key={slot.starts_at}>
                <button onClick={() => setSelectedSlot(slot)}>
                  {slot.starts_at} - {slot.ends_at}
                </button>
              </li>
            ))}
          </ul>
          <button onClick={handleBooking}>Submit Booking</button>
        </div>
      )}
    </div>
  );
};

export default Feature;
