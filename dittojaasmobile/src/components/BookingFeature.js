import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'https://eu-central-1.hapio.net/v1/',
  headers: {
    Authorization: 'Bearer sQSlkdPSjBf8A4H5WtjQxbG4kDvR7U0OPkqPcnHUab7a0880',
  },
});

// Function to create a staff resource
const createStaffResource = async (staffName) => {
  try {
    const response = await apiClient.post('resources', {
      name: staffName,
      max_simultaneous_bookings: 1,
      enabled: true,
    });
    console.log(`Staff resource created: ${staffName}`, response.data);
    return response.data; // Returns resource (staff) object
  } catch (error) {
    console.error(`Error creating staff resource "${staffName}":`, error);
    throw error;
  }
};

// Function to create services categorized by category
const createServicesForCategory = async (category, services) => {
  try {
    const serviceResponses = await Promise.all(
      services.map((service) =>
        apiClient.post('services', {
          ...service,
          name: `${service.name} (${category})`, // Service name with category
          price: String(service.prices[category]).toFixed(2), // Ensure price is numeric for the selected category
        })
      )
    );

    console.log(`Services created for category "${category}":`, serviceResponses.map((res) => res.data));
    return serviceResponses.map((res) => res.data); // Returns array of service objects
  } catch (error) {
    console.error(`Error creating services for category "${category}":`, error);
    throw error;
  }
};

// Function to associate staff resource with services
const associateStaffWithService = async (serviceId, staffId) => {
  try {
    const response = await apiClient.put(`services/${serviceId}/resources/${staffId}`);
    console.log(`Associated staff ${staffId} with service ${serviceId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error associating staff ${staffId} with service ${serviceId}:`, error);
    throw error;
  }
};

// Function to create recurring schedules for staff (resource)
const createRecurringSchedule = async (staffId, schedule) => {
  try {
    const response = await apiClient.post(`resources/${staffId}/recurring-schedules`, schedule);
    console.log(`Recurring schedule created for staff ${staffId}:`, response.data);
    return response.data;
  } catch (error) {
    console.error(`Error creating recurring schedule for staff ${staffId}:`, error);
    throw error;
  }
};

const BookingFeature = async () => {
  try {
    // Staff details
    const staffName = 'John Doe'; // Example staff name

    // Categories (to be treated as different types of vehicles or services)
    const categories = ['Mini_A', 'Mini_B', 'Sedan_A', 'Sedan_B', 'SUV_A', 'SUV_B', 'MPV_A', 'MPV_B', 'Add_Cat', 'Add_KS'];

    // Services for staff
    const services = [
      {
        name: 'Kansai Pro Clear',
        type: 'fixed',
        duration: 'PT2H',
        bookable_interval: 'PT1H',
        buffer_time_after: 'PT30M',
        booking_window_start: 'PT1H',
        booking_window_end: 'P30D',
        cancelation_threshold: 'PT12H',
        enabled: true,
        prices: {
          Mini_A: '1200.00',
          Mini_B: '1300.00',
          Sedan_A: '1500.00',
          Sedan_B: '1700.00',
          SUV_A: '1700.00',
          SUV_B: '2000.00',
          MPV_A: '1700.00',
          MPV_B: '2000.00',
          Add_Cat: '900.00',
          Add_KS: '1000.00',
        },
      },
      {
        name: 'Kansai High Solid',
        type: 'fixed',
        duration: 'PT3H',
        bookable_interval: 'PT1H',
        buffer_time_after: 'PT45M',
        booking_window_start: 'PT1H',
        booking_window_end: 'P30D',
        cancelation_threshold: 'PT12H',
        enabled: true,
        prices: {
          Mini_A: '1450.00',
          Mini_B: '1550.00',
          Sedan_A: '1750.00',
          Sedan_B: '1950.00',
          SUV_A: '2000.00',
          SUV_B: '2300.00',
          MPV_A: '2000.00',
          MPV_B: '2300.00',
          Add_Cat: '900.00',
          Add_KS: '1000.00',
        },
      },
      {
        name: 'Kansai High Solid Super Premium',
        type: 'fixed',
        duration: 'PT3H',
        bookable_interval: 'PT1H',
        buffer_time_after: 'PT45M',
        booking_window_start: 'PT1H',
        booking_window_end: 'P30D',
        cancelation_threshold: 'PT12H',
        enabled: true,
        prices: {
          Mini_A: '1650.00',
          Mini_B: '1750.00',
          Sedan_A: '1950.00',
          Sedan_B: '2150.00',
          SUV_A: '2200.00',
          SUV_B: '2500.00',
          MPV_A: '2200.00',
          MPV_B: '2500.00',
          Add_Cat: '900.00',
          Add_KS: '1000.00',
        },
      },
    ];

    // Recurring schedule for staff (example schedule)
    const recurringSchedule = {
      start_date: '2024-12-15', // Set to desired start date
      frequency: 'weekly', // Could be 'daily', 'weekly', etc.
      weekdays: ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'], // Example working days
      start_time: '09:00:00', // Staff's work start time
      end_time: '17:00:00', // Staff's work end time
    };

    // Step 1: Create staff resource
    const staffResource = await createStaffResource(staffName);

    // Step 2: Create services for each category
    const servicePromises = categories.map((category) => createServicesForCategory(category, services));
    const allServicesByCategory = await Promise.all(servicePromises);

    // Step 3: Associate staff with services
    const associationPromises = [];
    categories.forEach((category, index) => {
      const services = allServicesByCategory[index];

      services.forEach((service) => {
        associationPromises.push(associateStaffWithService(service.id, staffResource.id));
      });
    });
    await Promise.all(associationPromises);

    // Step 4: Add recurring schedules for staff
    const schedulePromises = [createRecurringSchedule(staffResource.id, recurringSchedule)];
    await Promise.all(schedulePromises);

    return {
      staffResource,
      services: allServicesByCategory.flat(),
    };
  } catch (error) {
    console.error('Error in booking feature:', error);
    throw error;
  }
};

export default BookingFeature;
