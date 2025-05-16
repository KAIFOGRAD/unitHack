import styles from './EventCard.module.scss'

interface EventCardProps {
    title: string;
    date: string;
    type: string;
    onButtonClick: () => void;
}

export default function EventCard({title, date, type, onButtonClick}: EventCardProps) {
    return(
        <div className={styles.container}>
            <div className={styles.info}>
                <h3 className={styles.title}>{title}</h3>
                <p className={styles.date}>{date}</p>
                <p className={styles.type}>{type}</p>
            </div>
            <button className={styles.button} onClick={onButtonClick}></button>
        </div>
    )
}