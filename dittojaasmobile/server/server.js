// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();
// const PORT = 5000;

// // Enable CORS to allow requests from the React frontend
// app.use(cors({
//   origin: 'http://localhost:3000', // Frontend URL (adjust if needed)
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   allowedHeaders: ['Content-Type', 'Authorization'],
//   credentials: true, // Allow cookies if needed
// }));

// // Body parser middleware
// app.use(express.json());

// // MongoDB connection string (replace with your own if needed)
// const mongoURI = 'mongodb+srv://danesh:daneshmuthu@adminjaas.5fxsa.mongodb.net/?retryWrites=true&w=majority&appName=AdminJAAS';
// mongoose.connect(mongoURI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }).then(() => {
//   console.log("MongoDB connected successfully.");
// }).catch((err) => {
//   console.error("MongoDB connection failed:", err);
// });

// // Define Booking schema and model
// const bookingSchema = new mongoose.Schema({
//   carType: String,
//   paintJob: String,
//   additionalServices: [String],
//   totalPrice: Number,
//   appointmentDate: Date,
//   appointmentTime: String,
// });

// const Booking = mongoose.model("Booking", bookingSchema);

// // POST route for creating a new booking
// app.post("/api/bookings", async (req, res) => {
//   const { carType, paintJob, additionalServices, totalPrice, appointmentDate, appointmentTime } = req.body;

//   try {
//     const newBooking = new Booking({
//       carType,
//       paintJob,
//       additionalServices,
//       totalPrice,
//       appointmentDate,
//       appointmentTime,
//     });

//     await newBooking.save();
//     res.status(201).send("Booking created successfully!");
//   } catch (error) {
//     console.error("Error saving booking:", error);
//     res.status(500).send("Failed to save booking. Please try again.");
//   }
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });
