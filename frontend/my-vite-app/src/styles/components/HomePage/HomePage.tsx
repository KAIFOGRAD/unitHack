import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SearchBar from './components/SearchBar/SearchBar';
import styles from './HomePage.module.scss';
import Star from '../../../assets/Illustration.png';
import EventList from './components/EventList/EventList';
import EventCard from './components/EventCard/EventCard';
import UnitHack from '../../../assets/unitHack.jpg';
import PrimaryButton from '../Button/PrimaryButton';


const events = [
    {
        title: 'UNIT.HACK',
        date: '20.05.2025',
        fullDate: '20 мая 2025, 12:00–18:00',
        category: 'Хакатон',
        description: 'UNIT.HACK 2025 — крупнейший межвузовский хакатон для студентов Екатеринбурга.',
        imageUrl: UnitHack,
        spotsLeft: 20,
        location: 'Екатеринбург, УрГЭУ',
        timeline: [
            { time: '12:00', title: 'Дистанционный кодинг и загрузка решений', description: 'Разработка проекта, стоп-кодинг и загрузка решений' },
            { time: '15:00', title: 'Проверка решений команд', description: 'Первичная проверка экспертами компаний решений участников' },
            { time: '17:00', title: 'Оценка задач решений и награждение', description: 'Оценка решений перед экспертами компаний и награждение победителей' },
        ]
    },
    {
        title: 'IT-Джем',
        date: '29.06.2025',
        fullDate: '20 мая 2025, 12:00–18:00',
        category: 'Хакатон',
        description:
        'Джем – это мероприятие, похожее на хакатон, где студенты командами пытаются создать MVP за пару дней по определённому кейсу, который раскрывается перед началом джема. Название «ИТ джем» имеет музыкальные корни. Джем-сешн – это импровизация ради получения удовольствия и создания чего-то нового в непринуждённой обстановке',
        imageUrl: UnitHack,
        spotsLeft: 10,
    },
];

export default function HomePage() {

    const navigate = useNavigate();
    const handleCreate = () => {
        navigate('/admin-create-event')
    }

    const [searchQuery, setSearchQuery] = useState('');
    const trimmedQuery = searchQuery.trim().toLowerCase();

    const matchedEvent = events.find((event) =>
        event.title.toLowerCase().includes(trimmedQuery)
    );

    return (
        <div className={styles.container}>
        <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        
                        <PrimaryButton text='Создать мероприятие' onClick={handleCreate} />

        <div className={styles.preview}>
            {trimmedQuery === '' ? (
            <img className={styles.star} src={Star} alt="star" />
            ) : matchedEvent ? (
            <EventCard {...matchedEvent} />
            ) : (
            <p className={styles.notFound}>Ничего не найдено</p>
            )}
        </div>

        <h1 className={styles.title}>Мероприятия</h1>

        <EventList events={events} />
        </div>
    );
}
