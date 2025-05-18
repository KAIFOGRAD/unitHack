import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './EventCard.module.scss';
import InfoSvg from '../../../../../assets/info.svg';
import CalendarSvg from '../../../../../assets/calendar-mini.svg';
import GeoSvg from '../../../../../assets/geo.svg';
import SpotsSvg from '../../../../../assets/spots.svg';
import CloseSvg from '../../../../../assets/close.svg';




interface TimelineItem {
  time: string;
  title: string;
  description: string;
}

interface EventCardProps {
  title: string;
  date: string;
  fullDate: string;
  category: string;
  description: string;
  imageUrl: string;
  spotsLeft: number;
  location?: string;
  timeline?: TimelineItem[];
  variant?: 'default' | 'modal';
  onClose?: () => void;
  onDetailsClick?: () => void;
}

const EventCard: React.FC<EventCardProps> = ({
    title,
    date,
    fullDate,
    category,
    description,
    imageUrl,
    spotsLeft,
    location,
    timeline,
    variant = 'default',
    onClose,
    onDetailsClick
}) => {

  const navigate = useNavigate()
  const handleChat = () => {
    navigate('/chat')
}
  return (
    <div className={`${styles.card} ${styles[variant]}`}>
      

      <div className={styles.image_wrapper}>
        <img src={imageUrl} alt={title} className={styles.image} />
        {variant === 'default' && (
          <span className={styles.spots}>
            {spotsLeft > 0 ? `Осталось мест ${spotsLeft}` : 'Все места заняты'}
          </span>
        )}
        {variant === 'modal' && (
          <span className={styles.close_button}>
            <button className={styles.button_close} onClick={onClose}>
              <img src={CloseSvg} alt="" />
            </button>
          </span>
        )}
      </div>

      <div className={styles.content}>
        <h3 className={`${styles.title} ${styles.modal_title}`}>{title}</h3>
          {variant === 'modal' && (
          <>
            <div className={styles.infoColumn}>
              <div className={styles.infoRow}>
                <img src={InfoSvg} alt="" />
                <span className={styles.category}>{category}</span>
              </div>
              <div className={styles.infoRow}>
                <img src={CalendarSvg} alt="" />
                <span className={styles.date}>{fullDate}</span>
              </div>
              
              {location && (
                <div className={styles.infoRow}>
                  <img src={GeoSvg} alt="" />
                  <span className={styles.location}>{location}</span>
                </div>
              )}
              <div className={styles.infoRow}>
                  <img src={SpotsSvg} alt="" />
                  <span className={styles.spots_left}>Количество свободных мест: <span className={styles.spots_count}>{spotsLeft}</span></span>
                </div>
            </div>
            </>
            )}

        {variant === 'modal' && (
          <button className={styles.chatBtn}  onClick={handleChat}>Чат мероприятия</button>
        )}

          <section className={styles.descriptionSection}>
            {variant === 'modal' && (
              <h4 className={styles.description_title}>О мероприятии</h4>
            )}
            <p className={styles.description}>{description}</p>
          </section>


        {variant === 'modal' && timeline && (
          <section className={styles.timeline}>
            <h4 className={styles.description_title}>Таймлайн</h4>
            {timeline.map((item, i) => (
              <div key={i} className={styles.timelineItem}>
                <span className={styles.time}>{item.time}</span>
                <div className={styles.right_container}>
                  <h4 className={styles.rigth_title}>{item.title}</h4>
                  <p className={styles.right_descr}>{item.description}</p>
                </div>
              </div>
            ))}
          </section>
        )}

        <div className={styles.footer}>
          {variant === 'default' ? (
            <div className={styles.buttons}>
              <button className={styles.detailsBtn} onClick={onDetailsClick}>Подробнее</button>
              <button className={styles.saveBtn}>Записаться</button>
            </div>
          ) : (
            <button className={styles.registerBtn}>Записаться</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventCard;
