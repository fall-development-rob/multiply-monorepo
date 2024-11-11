// src/components/InputRenderer.tsx

import React from 'react';
import TextInput from './TextInput';
import NumberInput from './NumberInput';
import Dropdown from './Dropdown';
import RadioGroup from './RadioGroup';
import CheckboxGroup from './CheckboxGroup';
import DatePicker from './DatePicker';

interface Option {
    label: string;
    value: any;
}

interface InputRendererProps {
    question: Question;
    value: any;
    onChange: (value: any) => void;
    onBlur: () => void;
    error?: string;
    isTouched?: boolean;
}

// Reuse the same Question type as in Questionnaire.tsx
type QuestionType = 'text' | 'number' | 'dropdown' | 'radio' | 'checkbox' | 'date';

interface Condition {
    all?: Array<{ questionId: string; value: any }>;
    any?: Array<{ questionId: string; value: any }>;
}

interface Validation {
    required?: boolean;
    min?: number;
    max?: number;
    pattern?: RegExp;
    custom?: (value: any, allAnswers: Record<string, any>) => boolean | Promise<boolean>;
    errorMessage?: string;
    asyncValidation?: (value: any, allAnswers: Record<string, any>) => Promise<string | null>;
}

interface Question {
    id: string;
    text: string;
    type: QuestionType;
    options?: Array<{ label: string; value: any }>; // For dropdowns, radio, checkbox
    validation?: Validation;
    condition?: Condition; // To determine if the question should be asked
    multiple?: boolean; // For checkboxes to allow multiple selections
}

const InputRenderer: React.FC<InputRendererProps> = ({ question, value, onChange, onBlur, error, isTouched }) => {
    switch (question.type) {
        case 'text':
            return (
                <TextInput
                    id={question.id}
                    label={question.text}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={error}
                    isTouched={isTouched}
                />
            );
        case 'number':
            return (
                <NumberInput
                    id={question.id}
                    label={question.text}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={error}
                    isTouched={isTouched}
                />
            );
        case 'dropdown':
            return (
                <Dropdown
                    id={question.id}
                    label={question.text}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    options={question.options || []}
                    error={error}
                    isTouched={isTouched}
                />
            );
        case 'radio':
            return (
                <RadioGroup
                    id={question.id}
                    label={question.text}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    options={question.options || []}
                    error={error}
                    isTouched={isTouched}
                />
            );
        case 'checkbox':
            return (
                <CheckboxGroup
                    id={question.id}
                    label={question.text}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    options={question.options || []}
                    error={error}
                    isTouched={isTouched}
                />
            );
        case 'date':
            return (
                <DatePicker
                    id={question.id}
                    label={question.text}
                    value={value}
                    onChange={onChange}
                    onBlur={onBlur}
                    error={error}
                    isTouched={isTouched}
                />
            );
        default:
            return null;
    }
};

export default InputRenderer;
