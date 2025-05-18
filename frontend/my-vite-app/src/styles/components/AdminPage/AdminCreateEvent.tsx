import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventApi } from '../../../api/event';
import styles from './AdminCreateEvent.module.scss';
import PrimaryButton from '../Button/PrimaryButton';

export default function AdminCreateEvent() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    startTime: '',
    endTime: '',
    numberSeats: 0,
    maxSeats: 0,
    location: '',
    organizerId: 1 
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'numberSeats' || name === 'maxSeats' 
        ? parseInt(value) 
        : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setLoading(true);
      await eventApi.createEvent(formData);
      navigate('/');
    } catch (err) {
      setError('Failed to create event');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1>Создать новое мероприятие</h1>
      
      {error && <div className={styles.error}>{error}</div>}

      <form onSubmit={handleSubmit}>
        <div className={styles.formGroup}>
          <label>Название:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Описание:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Дата и время начала:</label>
          <input
            type="datetime-local"
            name="startTime"
            value={formData.startTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Дата и время окончания:</label>
          <input
            type="datetime-local"
            name="endTime"
            value={formData.endTime}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.formGroup}>
          <label>Место проведения:</label>
          <input
            type="text"
            name="location"
            value={formData.location}
            onChange={handleChange}
          />
        </div>

        <div className={styles.formGroup}>
          <label>Количество мест:</label>
          <input
            type="number"
            name="maxSeats"
            value={formData.maxSeats}
            onChange={handleChange}
            min="1"
            required
          />
        </div>

        <PrimaryButton 
          type="submit" 
          text={loading ? 'Создание...' : 'Создать мероприятие'} 
          disabled={loading}
        />
      </form>
    </div>
  );
}