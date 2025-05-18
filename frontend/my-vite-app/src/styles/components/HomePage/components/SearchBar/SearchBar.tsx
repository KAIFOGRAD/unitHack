import styles from './SearchBar.module.scss';
import Search from '../../../../../assets/search.svg'
interface SearchBarProps {
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export default function SearchBar({ searchQuery, setSearchQuery }: SearchBarProps) {
    
    return (
        <div className={styles.searchBar}>
        <input
            type="text"
            placeholder="Поиск мероприятий"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
        />
        <button className={styles.searchButton}>
            <img src={Search} alt="поиск" />
        </button>
        </div>
    );
}