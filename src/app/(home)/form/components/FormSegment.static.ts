import * as Yup from 'yup';
import { UserForm } from './FormSegment.types';

// Static array of steps in form
export const FORM_STEPS: { name?: keyof UserForm, label?: string, description: string }[] = [
    {
        name: 'first_name',
        label: 'First Name',
        description: "Let's start with the basics. Type in your first name."
    },
    {
        name: 'email',
        label: 'Email',
        description: "How should we contact you? Type in your email address."
    }
];

// Default values for form
export const FORM_DEFAULTS: UserForm = {
    first_name: '',
    email: ''
};

// Schema for user form
// NOTE: I would normally prefer to keep schemas closer to the function/module where (9/10 times) a POST request is made.  However for this task, I am keeping it here
export const formSchema = Yup.object({
    first_name: Yup.string().typeError('Name is invalid').required('Name is required').max(255, 'Name cannot be greater than 255 characters'),
    email: Yup.string().typeError('Email is invalid').email('Must be a valid email address').required('Email is required')
});