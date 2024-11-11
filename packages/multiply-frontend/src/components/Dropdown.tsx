// src/components/Dropdown.tsx

import React from 'react';
import styles from './InputComponents.module.css'; // CSS Module

interface Option {
    label: string;
    value: any;
}

interface DropdownProps {
    id: string;
    label: string;
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
    options: Option[];
    error?: string;
    isTouched?: boolean;
}

const Dropdown: React.FC<DropdownProps> = ({ id, label, value, onChange, onBlur, options, error, isTouched }) => {
    return (
        <div>
            <label htmlFor={id} className={styles.label}>
                {label}
            </label>
            <select
                id={id}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                onBlur={onBlur}
                className={`${styles.input} ${isTouched && error ? styles.inputError : ''}`}
            >
                <option value="">Select</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.label}
                    </option>
                ))}
            </select>
            {error && <span className={styles.errorMessage}>{error}</span>}
        </div>
    );
};

export default Dropdown;
