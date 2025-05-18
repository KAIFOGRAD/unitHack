    import { useState } from 'react';
    import styles from './About.module.scss';

    export default function About() {
    const [isEditing, setIsEditing] = useState(false);
    const [aboutText, setAboutText] = useState(
            `Добавьте информацию о себе`
    );

    const handleSave = () => {
    setIsEditing(false);
    };

    return (
    <section className={styles.aboutMe}>
        <div className={styles.aboutHeader}>
        <h3>About me</h3>
        {!isEditing && (
            <button className={styles.editButton} onClick={() => setIsEditing(true)}>
            Edit
            </button>
        )}
        </div>

        {isEditing ? (
        <>
            <textarea
            value={aboutText}
            onChange={(e) => setAboutText(e.target.value)}
            className={styles.textarea}
            rows={6}
            />
            <div className={styles.buttonGroup}>
            <button className={styles.button} onClick={handleSave}>Save</button>
            <button className={styles.button} onClick={() => setIsEditing(false)}>Cancel</button>
            </div>
        </>
        ) : (
        <p className={styles.aboutText}>{aboutText}</p>
        )}
    </section>
    );
}
