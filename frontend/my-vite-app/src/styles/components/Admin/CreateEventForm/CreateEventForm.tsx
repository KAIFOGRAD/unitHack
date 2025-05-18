import React, { useState } from 'react';
import styles from './CreateEventForm.module.scss'

interface TimelineItem {
    time: string;
    title: string;
    description: string;
}

const CreateEventForm: React.FC = () => {
    const [title, setTitle] = useState('');
    const [eventType, setEventType] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [maxSeats, setMaxSeats] = useState(0);
    const [unlimitedSeats, setUnlimitedSeats] = useState(false);
    const [description, setDescription] = useState('');
    const [timeline, setTimeline] = useState<TimelineItem[]>([]);
    const [coverImage, setCoverImage] = useState<File | null>(null);
    const [previewImage, setPreviewImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
        const file = e.target.files[0];
        setCoverImage(file);
        setPreviewImage(URL.createObjectURL(file));
        }
    };

    const addTimelineItem = () => {
        setTimeline([...timeline, { time: '', title: '', description: '' }]);
    };

    const handleTimelineChange = (index: number, field: keyof TimelineItem, value: string) => {
        const newTimeline = [...timeline];
        newTimeline[index][field] = value;
        setTimeline(newTimeline);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log({
        title,
        eventType,
        date,
        location,
        maxSeats: unlimitedSeats ? null : maxSeats,
        description,
        timeline,
        coverImage
        });
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.coverSection}>
            <label className={styles.coverLabel}>
            {previewImage ? (
                <img src={previewImage} alt="Обложка события" className={styles.coverPreview} />
            ) : (
                <div className={styles.coverPlaceholder}>
                <span>Добавьте обложку события</span>
                <span>Она будет отображаться на карточке мероприятия</span>
                </div>
            )}
            <input
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className={styles.coverInput}
            />
            </label>
        </div>

        <div className={styles.formGroup}>
            <label className={styles.label}>
            Название мероприятия
            <input
                type="text"
                placeholder="Введите название, например: «Мастер-класс по UX»"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={styles.input}
                required
            />
            </label>
        </div>

        <div className={styles.formGroup}>
            <label className={styles.label}>
            Тип события
            <select
                value={eventType}
                onChange={(e) => setEventType(e.target.value)}
                className={styles.select}
                required
            >
                <option value="">Выберите тип события</option>
                <option value="workshop">Мастер-класс</option>
                <option value="lecture">Лекция</option>
                <option value="meetup">Митап</option>
                <option value="hackathon">Хакатон</option>
            </select>
            </label>
        </div>

        <div className={styles.formGroup}>
            <label className={styles.label}>
            Дата проведения
            <input
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                className={styles.input}
                required
            />
            </label>
        </div>

        <div className={styles.formGroup}>
            <label className={styles.label}>
            Место проведения
            <input
                type="text"
                placeholder="Где пройдет событие"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={styles.input}
                required
            />
            </label>
        </div>

        <div className={styles.formGroup}>
            <label className={styles.label}>
            Количество мест
            <div className={styles.seatsOptions}>
                <label className={styles.checkboxLabel}>
                <input
                    type="checkbox"
                    checked={unlimitedSeats}
                    onChange={(e) => setUnlimitedSeats(e.target.checked)}
                    className={styles.checkbox}
                />
                Неограниченно
                </label>
                {!unlimitedSeats && (
                <input
                    type="number"
                    value={maxSeats}
                    onChange={(e) => setMaxSeats(Number(e.target.value))}
                    className={styles.numberInput}
                    min="1"
                    required
                />
                )}
            </div>
            </label>
        </div>

        <div className={styles.formGroup}>
            <label className={styles.label}>
            О мероприятии
            <textarea
                placeholder="Расскажите, что ждёт участников"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className={styles.textarea}
                rows={5}
                required
            />
            </label>
        </div>

        <div className={styles.timelineSection}>
            <h3 className={styles.sectionTitle}>Таймлайн</h3>
            {timeline.map((item, index) => (
            <div key={index} className={styles.timelineItem}>
                <input
                type="time"
                value={item.time}
                onChange={(e) => handleTimelineChange(index, 'time', e.target.value)}
                className={styles.timeInput}
                required
                />
                <input
                type="text"
                placeholder="Название этапа"
                value={item.title}
                onChange={(e) => handleTimelineChange(index, 'title', e.target.value)}
                className={styles.timelineInput}
                required
                />
                <textarea
                placeholder="Описание этапа"
                value={item.description}
                onChange={(e) => handleTimelineChange(index, 'description', e.target.value)}
                className={styles.timelineTextarea}
                required
                />
            </div>
            ))}
            <button
            type="button"
            onClick={addTimelineItem}
            className={styles.addTimelineButton}
            >
            Добавить этап
            </button>
        </div>

        <button type="submit" className={styles.submitButton}>
            Создать мероприятие
        </button>
        </form>
    );
};

export default CreateEventForm;