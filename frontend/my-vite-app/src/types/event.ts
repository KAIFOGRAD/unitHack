export interface Event {
  id: number;
  name: string;
  description: string;
  startTime: string;
  endTime: string;
  location?: string;
  numberSeats: number;
  maxSeats: number;
  organizerId: number;
}

export interface EventCardProps {
  title: string;
  description: string;
  date: string;
  fullDate: string;
  location?: string;
  spotsLeft: number;
  imageUrl?: string;
  category?: string;
  timeline?: Array<{
    time: string;
    title: string;
    description: string;
  }>;
}