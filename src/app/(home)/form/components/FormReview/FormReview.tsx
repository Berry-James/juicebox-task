import { Button } from '@/components/common/Button/Button';
import React, { useRef } from 'react';
import { useWatch } from 'react-hook-form';
import { IFormReviewProps } from './FormReview.types';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';

/**
 * Review the given details (name/email) and submit
 * 
 * @returns React Component
 */
export const FormReview = ({ textRef }: IFormReviewProps) => {

    // FORM
    /**
     * Watch value of first_name for display in text block
     */
    const nameWatcher = useWatch({
        name: 'first_name'
    });

    // REFS
    /**
     * Store timeline
     */
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    // ANIMATION
    /**
     * Animate in text
     */
    useGSAP(() => {

        timelineRef.current = gsap.timeline({
            paused: true
        });

        textRef.current && timelineRef.current.to(textRef.current, { opacity: 1 }, 0);

        timelineRef.current.play();

    }, []);

    return (
        <article 
            className='h-full flex flex-col justify-between'
        >

            {/* BODY TEXT */}
            <h6 
                className='text-center opacity-0'
                ref={textRef}
            >
                { nameWatcher ? `Thanks, ${nameWatcher}!` : 'Thanks!' } Now, it&apos;s time to get a reality check.
                <br />
                <br />
                This will take 2-3 minutes.
            </h6>

            {/* CONTINUE BUTTON */}
            <Button
                className='secondary w-full'
                type='submit'
            >
                Continue
            </Button>
            
        </article>
    )

}