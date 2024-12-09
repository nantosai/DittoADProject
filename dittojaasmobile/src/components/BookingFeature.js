import axios from "axios";

const API_URL = "https://spinkart.neetocal.com/api/external/v1/bookings";
const API_KEY = process.env.REACT_APP_API_KEY;

export const bookAppointment = async (appointmentDetails) => {
  try {
    const response = await axios.post(
      API_URL,
      {
        meeting_slug: "homepage", // Using the slug from the image
        name: appointmentDetails.name,
        email: appointmentDetails.email,
        slot_date: appointmentDetails.slot_date,
        slot_start_time: appointmentDetails.slot_start_time,
        time_zone: appointmentDetails.time_zone,
        form_responses: JSON.stringify(appointmentDetails.form_responses)
      },
      {
        headers: {
          "Content-Type": "application/json",
          "X-Api-Key": API_KEY
        }
      }
    );

    return response.data.confirmation_number;
  } catch (error) {
    console.error("Error booking appointment:", error.response ? error.response.data : error.message);
    throw new Error(error.response ? error.response.data : "There was an error booking your appointment.");
  }
};

// Example usage
const bookingDetails = {
  name: "Eve Smith",
  email: "eve@example.com",
  slot_date: "2024-07-15",
  slot_start_time: "01:30 PM",
  time_zone: "Asia/Kolkata",
  form_responses: {
    introduction: "Hi I am Eve",
    languages: ["Python", "Java"],
    platform: "LinkedIn"
  }
};

// Call the function
bookAppointment(bookingDetails)
  .then(confirmationNumber => {
    console.log("Booking confirmed:", confirmationNumber);
  })
  .catch(error => {
    console.error("Booking failed:", error);
  });
