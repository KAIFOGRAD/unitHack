import styles from './PrimaryButton.module.scss';

interface PrimaryButtonProps {
    text: string;
    onClick: () => void;
    className?: string;
}

export default function PrimaryButton({ text, onClick, className }: PrimaryButtonProps) {
    return (
        <button  className={`${styles.button} ${className}`} onClick={onClick} >
            {text}
        </button>
    );
}
