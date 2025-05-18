import React from 'react';
import styles from './EventModal.module.scss';
import EventCard from '../EventCard/EventCard';

interface EventModalProps {
    data: any | null;
    onClose: () => void;
}

export default function EventModal({ data, onClose }: EventModalProps) {
    if (!data) return null;

    const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target === e.currentTarget) {
        onClose?.();
        }
    };

    return (
        <div className={styles.overlay} onClick={handleOverlayClick}>
        <div className={styles.modal}>
            <EventCard {...data} variant="modal" onClose={onClose} />
        </div>
        </div>
    );
}
