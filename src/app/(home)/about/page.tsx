import React from 'react';
import { About } from './components/About';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Juicebox | About",
    description: "Juicebox | About",
};

/**
 * The About Page
 * @see {PAGE_ROUTES.about.root}
 * 
 * @returns React Component
 */
const AboutPage = () => <About />

export default AboutPage;