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
      <div className={styles.image_wrapper}>
          <img src={imageUrl} alt={title} className={styles.image} />
          <span className={styles.spots}>{`Осталось мест ${spotsLeft}`}</span>
      </div>

      <div className={styles.content}>
          <h3 className={styles.title}>{title}</h3>
          <div className={styles.date_category}>
              <span className={styles.date}>{date}</span>
              <span className={styles.category}>{category}</span>
          </div>   
          
        <p className={styles.description}>{description}</p>


        <div className={styles.footer}>
          <div className={styles.buttons}>
            <button className={styles.detailsBtn}>Подробнее</button>
            <button className={styles.saveBtn}>Записаться</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
