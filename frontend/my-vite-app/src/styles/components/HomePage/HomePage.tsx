import { useState } from 'react';
import SearchBar from "./components/SearchBar/SearchBar";
import styles from './HomePage.module.scss'
import Star from '../../../assets/Illustration.png'
export default function HomePage() {
    const [searchQuery, setSearchQuery] = useState('');
    return (
        <div className={styles.container}>
            <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
            <img className={styles.star} src={Star} alt="star" />
        </div>
    )
}