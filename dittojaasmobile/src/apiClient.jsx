import axios from "axios";

const API_BASE_URL = "https://eu-central-1.hapio.net/v1/";
const API_TOKEN = import.meta.env.VITE_HAPIO_API_TOKEN; // Use VITE_ prefix for environment variables

const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    Authorization: `Bearer ${API_TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const createResource = async (name) => {
  const response = await apiClient.post("/resources", {
    name,
    max_simultaneous_bookings: 1,
    enabled: true,
  });
  return response.data;
};

export const createService = async (name, duration, bookableInterval) => {
  const response = await apiClient.post("/services", {
    name,
    duration, // e.g., "PT50M"
    bookable_interval: bookableInterval, // e.g., "PT1H"
    enabled: true,
  });
  return response.data;
};

export const createLocation = async (name, timeZone) => {
  const response = await apiClient.post("/locations", {
    name,
    time_zone: timeZone,
    resource_selection_strategy: "equalize",
    enabled: true,
  });
  return response.data;
};

export const createRecurringSchedule = async (
  resourceId,
  locationId,
  startDate
) => {
  const response = await apiClient.post(
    `/resources/${resourceId}/recurring-schedules`,
    {
      location_id: locationId,
      start_date: startDate,
    }
  );
  return response.data;
};

export const createScheduleBlock = async (
  resourceId,
  scheduleId,
  weekday,
  startTime,
  endTime
) => {
  const response = await apiClient.post(
    `/resources/${resourceId}/recurring-schedules/${scheduleId}/schedule-blocks`,
    {
      weekday,
      start_time: startTime,
      end_time: endTime,
    }
  );
  return response.data;
};

export const getBookableSlots = async (serviceId, locationId, from, to) => {
  const response = await apiClient.get(
    `/services/${serviceId}/bookable-slots`,
    {
      params: {
        location: locationId,
        from,
        to,
      },
    }
  );
  return response.data;
};

export const createBooking = async (
  locationId,
  serviceId,
  startsAt,
  endsAt
) => {
  const response = await apiClient.post("/bookings", {
    location_id: locationId,
    service_id: serviceId,
    starts_at: startsAt,
    ends_at: endsAt,
  });
  return response.data;
};
