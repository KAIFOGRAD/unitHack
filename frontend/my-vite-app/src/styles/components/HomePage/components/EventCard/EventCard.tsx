import React from 'react';
import styles from './EventCard.module.scss';

interface EventCardProps {
  title: string;
  date: string;
  category: string;
  description: string;
  imageUrl: string;
  spotsLeft: number;
}

const EventCard: React.FC<EventCardProps> = ({
  title,
  date,
  category,
  description,
  imageUrl,
  spotsLeft,
}) => {
  return (
    <div className={styles.card}>
      <img src={imageUrl} alt={title} className={styles.image} />

      <div className={styles.content}>
        <div className={styles.header}>
          <h3 className={styles.title}>{title}</h3>
          <span className={styles.category}>{category}</span>
        </div>

        <p className={styles.date}>{date}</p>
        <p className={styles.description}>{description}</p>

        <div className={styles.footer}>
          <span className={styles.spots}>{`Осталось мест: ${spotsLeft}`}</span>
          <div className={styles.buttons}>
            <button className={styles.detailsBtn}>Подробнее</button>
            <button className={styles.saveBtn}>В мои события</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
