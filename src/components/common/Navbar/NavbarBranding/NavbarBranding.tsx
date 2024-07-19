'use client';

import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import React, { useRef } from 'react';

/**
 * Animated branding for the navbar component
 * Has hover over effect
 * 
 * @returns React Component
 */
export const NavbarBranding = () => {

    // ANIMATION
    const { contextSafe } = useGSAP();

    /**
     * gsap timeline for branding animation
     */
    const brandingTimelineRef = useRef<gsap.core.Timeline | null>(null);

    /**
     * Ref for the branding wrapper
     */
    const brandingRef = useRef<HTMLHeadingElement | null>(null);

    /**
     * Animate branding in/out depending on mouse enter/exit event
     */
    const animateBranding = contextSafe((direction: 'in' | 'out') => {

        // if first time animating, create timeline
        if(!brandingTimelineRef.current) {

            brandingTimelineRef.current = gsap.timeline({
                paused: true
            });

            if(brandingRef.current) {

                // Determine characters that will remain
                const remainingCharIndexes = [0, 5];

                // Define gsap selector for text
                const selector = gsap.utils.selector(brandingRef.current);
    
                // Convert nodelist to array and loop
                gsap.utils.toArray(selector('h1')).forEach((char, charIndex) => {
    
                    if(char && brandingTimelineRef.current) {
    
                        // If character will remain after animation
                        if(remainingCharIndexes.includes(charIndex)) {
                            
                            // Move the 'b' letter over
                            if(charIndex === 5) {
                                brandingTimelineRef.current.to(char, { translateX: '-52px', ease: 'elastic.inOut(1,1)' }, 0);
                            }

                        } 
                        // Otherwise, slide letters off to the side
                        else {
                            brandingTimelineRef.current.to(char, { transform: 'translateX(-500%)', opacity: 0, ease: 'elastic.inOut(1,1)' }, 0);
                        }
    
                    }
    
                })
    
            }
        }
        
        direction === 'in' ? brandingTimelineRef.current.play() : brandingTimelineRef.current.reverse();

    });

    return (
            <div
                className='inline-flex cursor-default'
                ref={brandingRef}
                onMouseEnter={() => animateBranding('in')}
                onMouseLeave={() => animateBranding('out')}
            >

                {/* BRANDING LETTERS */}
                {
                    Array.from('juicebox').map((char, charIndex) => (
                        <h1 key={`${char}-${charIndex}`} className='font-branding'>{ char }</h1>
                    ))
                }
                
            </div>
    )

}