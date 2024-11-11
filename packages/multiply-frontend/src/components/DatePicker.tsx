import React from 'react';
import styles from './InputComponents.module.css'; // CSS Module

interface DatePickerProps {
    id: string;
    label: string;
    value: string;
    onChange: (value: string) => void;
    onBlur: () => void;
    error?: string;
    isTouched?: boolean;
}

const DatePicker: React.FC<DatePickerProps> = ({ id, label, value, onChange, onBlur, error, isTouched }) => {
    return (
        <div>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <input
                type="date"
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                className={`${styles.input} ${isTouched && error ? styles.inputError : ''}`}
            />
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default DatePicker;
