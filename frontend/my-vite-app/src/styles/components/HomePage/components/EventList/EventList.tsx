import { useState } from 'react';
import EventCard from '../EventCard/EventCard';
import EventModal from '../EventModal/EventModal';
import styles from './EventList.module.scss';

interface EventType {
    title: string;
    date: string;
    fullDate: string;
    category: string;
    description: string;
    imageUrl: string;
    spotsLeft: number;
    location?: string;
    timeline?: any[];
}

interface EventListProps {
    events: EventType[];
}

export default function EventList({ events }: EventListProps) {
    const [selectedEvent, setSelectedEvent] = useState<EventType | null>(null);

    if (!Array.isArray(events)) {
        return <p>Данные о мероприятиях не получены</p>;
    }

    return (
        <div className={styles.container}>
        {events.map((event) => (
            <EventCard
            key={event.title}
            {...event}
            onDetailsClick={() => setSelectedEvent(event)}
            />
        ))}

        {selectedEvent && (
            <EventModal data={selectedEvent} onClose={() => setSelectedEvent(null)} />
        )}
        </div>
    );
}
