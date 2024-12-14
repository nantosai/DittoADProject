import axios from "axios";

// Create an Axios client
const apiClient = axios.create({
  baseURL: "https://eu-central-1.hapio.net/v1/",
  headers: {
    Authorization: 'Bearer ${import.meta.env.VITE_HAPPY_API_TOKEN}',
  },
});

// Create a resource
const createResource = async (categoryName) => {
  try {
    const response = await apiClient.post("resources", {
      name: categoryName,
      max_simultaneous_bookings: 1,
      enabled: true,
    });
    console.log(`Resource created: ${categoryName}`, response.data);
    return response.data;
  } catch (error) {
    console.error(
      `Error creating resource "${categoryName}":`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Create services for a category
const createServicesForCategory = async (category, services, staffName) => {
  try {
    const serviceResponses = await Promise.all(
      services.map((service) =>
        apiClient.post("services", {
          ...service,
          name: `${service.name} (${category}) by ${staffName}`,
          price: service.prices[category],
        })
      )
    );
    console.log(
      `Services created for category "${category}":`,
      serviceResponses.map((res) => res.data)
    );
    return serviceResponses.map((res) => res.data);
  } catch (error) {
    console.error(
      `Error creating services for category "${category}":`,
      error.response?.data || error.message
    );
    throw error;
  }
};

// Booking feature implementation
const BookingFeature = async () => {
  try {
    // Example staff details
    const staff = { name: "John Doe" };

    // Categories (resources)
    const categories = [
      "Mini_A",
      "Mini_B",
      "Sedan_A",
      "Sedan_B",
      "SUV_A",
      "SUV_B",
      "MPV_A",
      "MPV_B",
      "Add_Cat",
      "Add_KS",
    ];

    // Services for the staff
    const services = [
      {
        name: "Kansai Pro Clear",
        type: "fixed",
        duration: "PT2H",
        bookable_interval: "PT1H",
        buffer_time_after: "PT30M",
        booking_window_start: "PT1H",
        booking_window_end: "P30D",
        cancelation_threshold: "PT12H",
        enabled: true,
        prices: {
          Mini_A: "1200.000",
          Mini_B: "1300.000",
          Sedan_A: "1500.000",
          Sedan_B: "1700.000",
          SUV_A: "1700.000",
          SUV_B: "2000.000",
          MPV_A: "1700.000",
          MPV_B: "2000.000",
          Add_Cat: "900.000",
          Add_KS: "1000.000",
        },
      },
      // Add more services here...
    ];

    // Create resources
    const resourcePromises = categories.map((category) =>
      createResource(category)
    );
    const resources = await Promise.all(resourcePromises);

    // Create services for each resource category
    const servicePromises = categories.map((category) =>
      createServicesForCategory(category, services, staff.name)
    );
    const allServices = await Promise.all(servicePromises);

    return {
      resources,
      services: allServices.flat(),
    };
  } catch (error) {
    console.error(
      "Error in booking feature:",
      error.response?.data || error.message
    );
    throw error;
  }
};

export default BookingFeature;
