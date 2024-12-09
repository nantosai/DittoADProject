import React, { useState } from "react";
import { bookAppointment } from "./components/BookingFeature";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [confirmationNumber, setConfirmationNumber] = useState(null);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleBookAppointment = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.date || !formData.time) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);
    setError("");
    try {
      const appointmentDetails = {
        meeting_slug: "homepage",
        name: formData.name,
        email: formData.email,
        slot_date: formData.date,
        slot_start_time: formData.time,
        time_zone: Intl.DateTimeFormat().resolvedOptions().timeZone,
        form_responses: JSON.stringify({
          introduction: `Hi, I am ${formData.name}.`,
          service_type: "Vehicle Service",
        }),
      };

      const confirmation = await bookAppointment(appointmentDetails);
      setConfirmationNumber(confirmation);
      setFormData({ name: "", email: "", date: "", time: "" });
    } catch (error) {
      console.error("Error booking appointment:", error);
      setError(error.message);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome to JA Autoworks</h1>
      <p style={styles.text}>
        Schedule your vehicle servicing appointment today!
      </p>

      <form onSubmit={handleBookAppointment} style={styles.form}>
        <input
          type="text"
          name="name"
          placeholder="Your Name"
          value={formData.name}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="email"
          name="email"
          placeholder="Your Email"
          value={formData.email}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="date"
          name="date"
          value={formData.date}
          onChange={handleInputChange}
          style={styles.input}
        />
        <input
          type="time"
          name="time"
          value={formData.time}
          onChange={handleInputChange}
          style={styles.input}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Booking..." : "Book Appointment"}
        </button>
      </form>

      {confirmationNumber && (
        <p style={styles.success}>
          Appointment booked successfully! Confirmation number:{" "}
          {confirmationNumber}
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
    maxWidth: "600px",
    margin: "0 auto",
  },
  header: {
    fontSize: "2.5rem",
    color: "#333",
    marginBottom: "20px",
  },
  text: {
    fontSize: "1.2rem",
    color: "#666",
    marginBottom: "30px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "20px",
  },
  input: {
    padding: "10px",
    fontSize: "1rem",
    borderRadius: "5px",
    border: "1px solid #ddd",
  },
  button: {
    backgroundColor: "#007BFF",
    color: "#FFF",
    padding: "12px 20px",
    border: "none",
    borderRadius: "5px",
    fontSize: "1rem",
    cursor: "pointer",
    marginTop: "10px",
  },
  success: {
    marginTop: "20px",
    color: "green",
    fontWeight: "bold",
  },
  error: {
    marginTop: "20px",
    color: "red",
    fontWeight: "bold",
  },
};

export default App;
