import axios from './axios';

const API_URL = '/api/v1/event';

export const eventApi = {
  getAllEvents: async () => {
    try {
      const response = await axios.get(API_URL);
      return response.data;
    } catch (error) {
      console.error('Error fetching events:', error);
      throw error;
    }
  },

  createEvent: async (eventData: {
    name: string;
    description: string;
    startTime: string;
    endTime: string;
    numberSeats: number;
    maxSeats: number;
    location: string;
    organizerId: number;
  }) => {
    try {
      const response = await axios.post(API_URL, eventData);
      return response.data;
    } catch (error) {
      console.error('Error creating event:', error);
      throw error;
    }
  }
};