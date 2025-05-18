import { Event } from '../EventCard/EventCard';
import EventCard from '../EventCard/EventCard';
import styles from './EventList.module.scss';

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  return (
    <div className={styles.eventList}>
      {events.map((event, index) => (
        <EventCard key={index} {...event} />
      ))}
    </div>
  );
}