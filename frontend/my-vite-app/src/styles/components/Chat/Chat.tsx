import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import type { ChangeEvent } from 'react';
import type { KeyboardEvent } from 'react';
import styles from './Chat.module.scss';
import ChatImg from '../../../assets/chat.jpg';
import Back from '../../../assets/back.svg';
import Send from '../../../assets/send.svg';

export default function Chat() {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');

    const navigate = useNavigate();

    const handleBackClick = () => {
        navigate(-1); 
    };

    const handleSend = () => {
        if (input.trim() === '') return;
        setMessages([...messages, input.trim()]);
        setInput('');
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setInput(e.target.value);
    };

    const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') handleSend();
    };

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <header className={styles.header}>
                    <button onClick={handleBackClick} className={styles.back}>
                        <img className={styles.back_img} src={Back} alt="Назад" /> 
                    </button>
                    <h1 className={styles.title}>
                            Чат с организатором
                    </h1>
                </header>
                <div className={styles.messagesContainer}>
                    {messages.length === 0 ? (
                    <div className={styles.emptyState}>
                        <img
                        src={ChatImg}
                        alt="Empty chat"
                        className={styles.placeholderImage}
                        />
                        <h2 className={styles.subtitle}>
                            Здесь пока ничего нет
                        </h2>
                        <p className={styles.descr}>
                            Напишите сообщение — организатор скоро ответит
                        </p>
                    </div>
                    ) : (
                    messages.map((msg, idx) => (
                        <div key={idx} className={styles.message}>
                        {msg}
                        </div>
                    ))
                    )}
                </div>

                <div className={styles.inputContainer}>
                    <input
                        type="text"
                        value={input}
                        onChange={handleChange}
                        onKeyDown={handleKeyDown}
                        placeholder="Введите сообщение"
                        className={styles.input}
                    />
                    <button 
                        onClick={handleSend} 
                        className={styles.button}
                        disabled={!input.trim()}
                    >
                    <img src={Send} alt="Отправить" className={styles.planeIcon} />
                    </button>
                </div>
            </div>
        </div>
    );
}