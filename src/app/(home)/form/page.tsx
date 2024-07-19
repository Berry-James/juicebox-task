import React from 'react';
import { FormSegment } from './components/FormSegment';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Juicebox | Form",
    description: "Juicebox | Form",
};

/**
 * Page for the 'form' segment
 * 
 * @returns React Component 
 */
const FormPage = () => <FormSegment />

export default FormPage;