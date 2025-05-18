import { useState } from 'react';
import SearchBar from "./components/SearchBar/SearchBar";
import styles from './HomePage.module.scss';
import Star from '../../../assets/Illustration.png';
import EventCard from './components/EventCard/EventCard';
import UnitHack from '../../../assets/Image.jpg'
export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    
    return (
        <div className={styles.container}>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <img className={styles.star} src={Star} alt="star" />
            <h1 className={styles.title}>Мероприятия</h1>
            <EventCard
                title="UNIT.HACK"
                date="20.05.2025"
                category="Хакатон"
                description="UNIT.HACK 2025 — крупнейший межвузовский хакатон для студентов Екатеринбурга."
                imageUrl={UnitHack}
                spotsLeft={12}
            />
        </div>
    )
}