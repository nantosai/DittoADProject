import React, { useState } from "react";
import { bookAppointment } from "./components/BookingFeature";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState(null);
  const [error, setError] = useState("");

  const handleBookAppointment = async () => {
    setLoading(true);
    setError("");
    try {
      // Define the appointment details
      const appointmentDetails = {
        meeting_slug: "homepage",  // Example meeting link
        name: "Eve Smith",  // Example name
        email: "eve@example.com",  // Example email
        slot_date: "2024-12-15",  // Example date in YYYY-MM-DD format
        slot_start_time: "01:30 PM",  // Example time in HH:MM AM/PM format
        time_zone: "Asia/Kolkata",  // Example time zone
        form_responses: JSON.stringify({
          introduction: "Hi, I am Eve.",
          languages: ["Python", "Java"],
          platform: "LinkedIn",
        }), // Example responses to booking form questions
      };

      // Call the function to book the appointment
      const confirmation = await bookAppointment(appointmentDetails);
      setConfirmationNumber(confirmation);
      alert(`Appointment booked! Confirmation: ${confirmation}`);
    } catch (error) {
      console.error("Error booking appointment:", error);
      setError(error.message); // Show the error message from the API response
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to JA Autoworks</h1>
      <p style={styles.text}>
        Schedule your vehicle servicing appointment today!
      </p>
      
      {/* Button to trigger appointment booking */}
      <button
        style={styles.button}
        onClick={handleBookAppointment}
        disabled={loading}  // Disable the button while loading
      >
        {loading ? "Booking..." : "Book Appointment"}
      </button>

      {/* Display confirmation number or error message */}
      {confirmationNumber && (
        <p style={styles.success}>
          Appointment booked successfully! Confirmation number: {confirmationNumber}
        </p>
      )}

      {error && <p style={styles.error}>Error: {error}</p>}
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
  success: {
    marginTop: "20px",
    color: "green",
  },
  error: {
    marginTop: "20px",
    color: "red",
  },
};

export default App;
