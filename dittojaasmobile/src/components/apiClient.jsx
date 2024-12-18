import axios from 'axios';

// Retrieve the API key from environment variables
const VITE_HAPIO_API_KEY = import.meta.env.VITE_HAPIO_API_KEY;
const BASE_URL = 'https://eu-central-1.hapio.net/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${VITE_HAPIO_API_KEY}`, // Fixed Authorization header
    'Content-Type': 'application/json',
  },
});

// Create a resource (car type)
export const createResource = async (name) => {
  const response = await apiClient.post('/resources', {
    name,
    enabled: true,
  });
  return response.data.id; // Return the resource ID
};

// Create a service
export const createService = async (name, price, type = 'fixed', duration = 'PT1H', bookable_interval = 'PT1H') => {
  try {
    const formattedPrice = parseFloat(price).toFixed(3).toString();

    const response = await apiClient.post('/services', {
      name: name,
      price: formattedPrice,
      type: type,
      duration: duration,
      bookable_interval: bookable_interval,
      buffer_time_after: 'PT10M',
      booking_window_start: 'PT2H',
      booking_window_end: 'P14D',
      cancelation_threshold: 'PT12H',
      enabled: true,
    });

    console.log('Service created:', response.data);
    return response.data.id; // Return the service ID
  } catch (error) {
    console.error('Error creating service:', error.response || error);
    throw error;
  }
};

// Create a location
export const createLocation = async (name) => {
  try {
    const response = await apiClient.post('/locations', {
      name: name,
      time_zone: 'Asia/Kuala_Lumpur',
      resource_selection_strategy: 'equalize',
      enabled: true,
    });

    console.log('Location created:', response.data);
    return response.data.id; // Ensure location ID is returned
  } catch (error) {
    console.error('Error creating location:', error.response || error);
    throw error;
  }
};

// Map service to resource (car type)
export const mapServiceToResource = async (serviceId, resourceId) => {
  try {
    const response = await apiClient.put(`/services/${serviceId}/resources/${resourceId}`);
    console.log('Service mapped to resource:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error mapping service to resource:', error.response || error);
    throw error;
  }
};

// Create a recurring schedule
export const createRecurringSchedule = async (resourceId, locationId, startDate) => {
  console.log("Creating recurring schedule with:", { resourceId, locationId, startDate });
  try {
    const response = await apiClient.post(`/resources/${resourceId}/recurring-schedules`, {
      location_id: locationId,
      start_date: startDate,
    });
    console.log('Recurring Schedule created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating recurring schedule:', error.response || error);
    throw error;
  }
};

// Create schedule blocks for weekdays
export const createScheduleBlock = async (resourceId, recurringScheduleId, weekday, startTime, endTime) => {
  console.log("Creating schedule block with:", { resourceId, recurringScheduleId, weekday, startTime, endTime });
  try {
    const response = await apiClient.post(`/resources/${resourceId}/recurring-schedules/${recurringScheduleId}/schedule-blocks`, {
      weekday: weekday,
      start_time: startTime,
      end_time: endTime,
    });
    console.log('Schedule Block created:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating schedule block:', error.response || error);
    throw error;
  }
};

// Create schedule blocks for all weekdays (Monday to Friday)
export const createScheduleBlocksForAllWeekdays = async (resourceId, recurringScheduleId) => {
  const weekdays = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday'];
  const startTime = '08:00:00';
  const endTime = '17:00:00';

  for (const weekday of weekdays) {
    await createScheduleBlock(resourceId, recurringScheduleId, weekday, startTime, endTime);
  }
};

// Setup schedule function (create recurring schedule and blocks)
export const setupSchedule = async (resourceId, locationId) => {
  const startDate = new Date().toISOString().split('T')[0]; // Today's date in YYYY-MM-DD format

  const recurringSchedule = await createRecurringSchedule(resourceId, locationId, startDate);
  await createScheduleBlocksForAllWeekdays(resourceId, recurringSchedule.id);
};

export const fetchBookableSlots = async (locationId, resourceId, serviceId) => {
  try {
    const response = await apiClient.get('/slots', {
      params: {
        location_id: locationId,
        resource_id: resourceId,
        service_id: serviceId,
      },
    });

    console.log('Bookable slots retrieved:', response.data);
    return response.data; // Return the available slots
  } catch (error) {
    console.error('Error fetching bookable slots:', error.response || error);
    throw error;
  }
};

export const createBooking = async (locationId, serviceId, startsAt, endsAt) => {
  try {
      const response = await fetch('https://your-api-endpoint/booking', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
              location_id: locationId,
              service_id: serviceId,
              starts_at: startsAt,
              ends_at: endsAt,
          }),
      });
      if (!response.ok) {
          throw new Error('Failed to create booking');
      }
      return await response.json();
  } catch (error) {
      console.error('Error in createBooking:', error);
      throw error;
  }
};

// Export the apiClient instance for use in other files
export default apiClient;