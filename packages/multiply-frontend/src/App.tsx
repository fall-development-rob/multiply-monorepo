// src/App.tsx

import React from 'react';
import Questionnaire from './components/Questionnaire';

// Define the types for question configuration
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

const App: React.FC = () => {
    const questions: Question[] = [
        {
            id: 'firstName',
            text: 'What is your first name?',
            type: 'text',
            validation: {
                required: true,
            },
        },
        {
          id: 'email',
          text: 'What is your email?',
          type: 'text',
          validation: {
              required: true,
          },
      },
        {
            id: 'age',
            text: 'How old are you?',
            type: 'number',
            validation: {
                required: true,
                min: 18,
                max: 65,
                errorMessage: 'Age must be between 18 and 65.',
            },
        },
        {
            id: 'hasSignificantOther',
            text: 'Do you have a significant other?',
            type: 'radio',
            options: [
                { label: 'Yes', value: true },
                { label: 'No', value: false },
            ],
            validation: { required: true },
        },
        {
            id: 'significantOtherName',
            text: "What is your significant other’s name?",
            type: 'text',
            validation: { required: true },
            condition: {
                all: [
                    { questionId: 'hasSignificantOther', value: true },
                ],
            },
        },
        {
            id: 'lastName',
            text: 'What is your last name?',
            type: 'text',
            validation: { required: true },
        },
        {
            id: 'birthDate',
            text: 'When is your birth date?',
            type: 'date',
            validation: { required: true },
        },
    ];

    const handleComplete = (answers: Record<string, any>) => {
        console.log('Questionnaire completed with answers:', answers);
        alert('Questionnaire completed successfully!');
    };

    return <Questionnaire questions={questions} onComplete={handleComplete} />;
};

export default App;
