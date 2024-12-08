import React from "react";
import axios from "axios";

const App = () => {
  const handleBookAppointment = async () => {
    try {
      const response = await axios.post(
        "https://api.neetocal.com/v1/bookings", // Replace with the actual NeetoCal endpoint
        {
          // Replace with necessary data according to NeetoCal API documentation
          appointment_time: "2024-12-10T10:00:00", // Example: Appointment time
          customer: {
            name: "John Doe", // Example customer name
            email: "johndoe@example.com", // Example customer email
            phone: "+1234567890", // Example customer phone
          },
          service: "Car Servicing", // Example service
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer YOUR_API_KEY`, // Replace with your actual API key
          },
        }
      );
      
      // If the API call is successful, show an alert
      alert("Appointment booked! Confirmation: " + response.data.confirmation_number);
    } catch (error) {
      // If there's an error, log it and show a failure message
      console.error("Error booking appointment:", error);
      alert("There was an error booking your appointment.");
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to JA Autoworks</h1>
      <p style={styles.text}>
        Schedule your vehicle servicing appointment today!
      </p>
      <button style={styles.button} onClick={handleBookAppointment}>
        Book Appointment
      </button>
    </div>
  );
};

const styles = {
  container: {
    textAlign: "center",
    padding: "50px",
    fontFamily: "Arial, sans-serif",
  },
  header: {
    fontSize: "2.5rem",
    color: "#333",
  },
  text: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "20px",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#FFF",
    padding: "10px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
  },
};

export default App;
