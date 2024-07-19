'use client';

import React, { useContext, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { Button } from '@/components/common/Button/Button';
import { useNavbar } from '@/components/common/Navbar/Navbar';
import { PAGE_ROUTES } from '@/static/pageRoutes';
import { killTimelineRef } from '@/utils/gsap/killTimelineRef';
import { fixCubeSize } from '@/utils/gsap/fixCubeSize';
import { useGSAP } from '@gsap/react';
import { useRouter } from 'next/navigation';
import { CubeContext } from './Cube/context/CubeContext';
import { cubeSizeEnum } from './Cube/context/CubeContext.types';
import { CUBE_SIZES_DICT } from './Cube/Cube.static';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: "Juicebox | Home",
    description: "Juicebox | Home",
};

/**
 * Content for the 'Home'/landing page
 * 
 * @returns React Component
 */
export const Home = () => {
    
    // CONTEXT
    const { cubeRef, cubeTextRef } = useContext(CubeContext);
    const { handleSetNavbarActions } = useNavbar();

    // ROUTER
    const router = useRouter();

    // REFS
    /**
     * Store gsap timeline
     */
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    /**
     * Ref to hero text container
     */
    const containerRef = useRef<HTMLDivElement | null>(null);

    /**
     * Ref to bottom page button
     */
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    /**
     * Ref to bottom page button inner text
     */
    const buttonTextRef = useRef<HTMLSpanElement | null>(null);

    // SIDE EFFECTS
    /**
     * Clear navbar actions
     */
    useEffect(() => {
        handleSetNavbarActions({
            left: null,
            right: null
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    /**
     * Animate in elements on page load
     */
    const { contextSafe } = useGSAP(() => {

        // If we have an existing timeline, kill it and then null it
        killTimelineRef(timelineRef);

        // ASSERT cube sizing
        fixCubeSize(cubeRef, cubeSizeEnum.large);

        // STORE timeline
        timelineRef.current = gsap.timeline({
            paused: true
        });

        // FADE in cube
        cubeRef.current && timelineRef.current.to(cubeRef.current, { opacity: 1 });

        // FADE in hero text
        containerRef.current && timelineRef.current.to(containerRef.current, { opacity: 1 });

        // FADE in cube text sequentially
        if(cubeTextRef.current) {
            const q = gsap.utils.selector(cubeTextRef.current);
            const cubeSpans = q('span');
            for(let i = 0; i < cubeSpans.length; i++) {
                timelineRef.current.to(cubeSpans[i], { opacity: 1, duration: 0.15 })
            }
        } 

        // PLAY timeline
        timelineRef.current.play();

    }, []);

    /**
     * Animate elements to next page positions (About page)
     */
    const handleAnimateForward = contextSafe(() => {
        timelineRef.current = gsap.timeline({
            paused: true,
            onComplete: () => {
                fixCubeSize(cubeRef, cubeSizeEnum.medium)
                router.push(PAGE_ROUTES.about.root);
            }
        });
        
        // FADE out cube text
        cubeTextRef.current && timelineRef.current.to(cubeTextRef.current, { opacity: 0 }, 0);
        
        // FADE out hero text
        containerRef.current && timelineRef.current.to(containerRef.current, { opacity: 0 }, 0);

        // COLOUR button
        buttonRef.current && timelineRef.current.to(buttonRef.current, { backgroundColor: 'transparent', border: '1px solid rgba(255, 255, 255, 0.6)' }, 0);

        // TRANSLATE and FADE button text
        buttonTextRef.current && timelineRef.current.to(buttonTextRef.current, { transform: 'translateX(20%)', opacity: 0 }, 0);

        // RESIZE cube
        cubeRef.current && timelineRef.current.to(cubeRef.current, { ...CUBE_SIZES_DICT[cubeSizeEnum.medium] });

        // PLAY animation
        timelineRef.current.play();
    });

    return (
        <section 
            className='h-full flex flex-col items-center justify-between gap-4 p-4 md:pb-48'
        >

            {/* HERO TEXT */}
            <div 
                className='h-full flex items-center justify-center opacity-0 '
                ref={containerRef}
            >
                <h2 className='text-center'>
                    Compare your thoughts on <span className='bg-clip-text bg-gradient-text' style={{ WebkitTextFillColor: 'transparent' }}>technology</span> with current industry opinions.
                </h2>
            </div>
           
            {/* NEXT PAGE BUTTON */}
            <Button 
                className='primary w-full max-w-96' 
                onClick={handleAnimateForward}
                ref={buttonRef}
            >
                <span
                    ref={buttonTextRef}
                >
                    Get a reality check
                </span>
            </Button>

        </section>
    )

}