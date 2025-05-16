import styles from './PrimaryButton.module.scss';

interface PrimaryButtonProps {
    text: string;
    onClick: () => void;
}

export default function PrimaryButton({ text, onClick }: PrimaryButtonProps) {
    return (
        <button className={styles.button} onClick={onClick}>
            {text}
        </button>
    );
}
