'use server';
import * as Yup from 'yup';
import { submitServerForm } from '@/actions/utils/submitServerForm/submitServerForm';

const submitFormActionSchema = Yup.object({
    name: Yup.string().required('Name is required').typeError('Name is malformed'),
    email: Yup.string().email('Must be a valid email address').required('Email is required').typeError('Email is malformed')
})

export const testFormAction = async (prevState: any, formData: FormData) => await submitServerForm(prevState, formData, submitFormActionSchema);