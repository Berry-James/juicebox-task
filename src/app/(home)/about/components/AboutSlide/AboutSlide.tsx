'use client';

import React, { useContext, useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { AboutContext } from '../context/AboutContext';
import { IAboutSlideProps } from './AboutSlide.types';
import { killTimelineRef } from '@/utils/gsap/killTimelineRef';

/**
 * A single slide for use within the Swiper component on the 'About' page
 * @see {About}
 * 
 * @param props.slideIndex          Index of this slide within the greater array of slides
 * @param props.bodyText            Text to be rendered within the slide 
 * @returns 
 */
export const AboutSlide = ({ slideIndex, bodyText }: IAboutSlideProps) => {

    // CONTEXT
    const { activeSlideIndex } = useContext(AboutContext);

    // REFS
    /**
     * Animation timeline
     */
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    /**
     * Ref of bodyText heading element
     */
    const bodyTextRef = useRef<HTMLHeadingElement | null>(null);

    // HOOKS
    /**
     * Animate slide text whenever activeSlideIndex === slideIndex (aka this slide is visible)
     */
    useGSAP(() => {

        // Kill active timeline anim
        killTimelineRef(timelineRef);

        // If this slide is NOT currently active, return
        if(activeSlideIndex !== slideIndex) {
            return
        }
        
        // Create timeline instance
        timelineRef.current = gsap.timeline({
            paused: true
        });

        // If body text exists, animate it
        if(bodyTextRef.current) {

            bodyTextRef.current.childNodes.forEach(char => {

                if(!char.nodeValue) { return }

                const trimmed = char.nodeValue.trim();

                let wordIndex = 0;
                const words = [];

                for(let i = 0; i < trimmed.length; i++) {
                    
                    const el = document.createElement('h4');
                    el.style.opacity = '0.5';

                    if(i === 0) {
                        const word = document.createElement('span');
                        word.style.display = 'inline-flex';
                        words[wordIndex] = word;
                    }

                    // if space - start new word
                    if(trimmed[i] === ' ') {
                        wordIndex++;
                        const wordEl = document.createElement('span');
                        wordEl.style.display = 'inline-flex';
                        words[wordIndex] = wordEl;

                        el.innerHTML = "\u00A0"
                    } else {
                        el.innerText = trimmed[i];
                    }
                    words[wordIndex].appendChild(el);

                }

                if(bodyTextRef.current?.parentNode) {
                    words.forEach(word => {

                        // Append node
                        bodyTextRef.current?.parentNode?.appendChild(word);

                        // Colour
                        if(word && timelineRef.current) {
                            const q = gsap.utils.selector(word);
                            timelineRef.current.to(q('h4'), { opacity: 1, duration: .1 })
                        }
                    });

                    bodyTextRef.current.parentNode.removeChild(bodyTextRef.current);
                }

            })
        
        }
        gsap.to(
            timelineRef.current, 
            {
                time:timelineRef.current.duration(), 
                duration:timelineRef.current.duration(), 
                ease:"power3.inOut", delay:1
            }
        );

        // PLAY timeline
        timelineRef.current.play();

    }, [activeSlideIndex]);

    return (
        <article 
            className='w-full flex items-center justify-center px-4 flex-wrap'
            role='article'
        >
            <h4
                className='text-center max-w-96'
                ref={bodyTextRef}
            >
                { bodyText }
            </h4>
        </article>
    )

}