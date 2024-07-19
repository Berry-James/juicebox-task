'use client';

import React, { useContext, useMemo, useRef } from 'react';
import { Swiper, SwiperSlide, SwiperClass } from 'swiper/react';
import { A11y, Pagination } from 'swiper/modules';
import { ABOUT_SWIPER_CONTENT } from './About.static';
import {  CubeContext } from '../../components/Cube/context/CubeContext';
import { useRouter } from 'next/navigation';
import { PAGE_ROUTES } from '@/static/pageRoutes';
import { AboutContext, AboutContextProvider } from './context/AboutContext';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { cubeSizeEnum } from '../../components/Cube/context/CubeContext.types';
import { useNavbar } from '@/components/common/Navbar/Navbar';
import { Button } from '@/components/common/Button/Button';
import { fixCubeSize } from '@/utils/gsap/fixCubeSize';
import { NavbarBackButton } from '@/components/common/Navbar/NavbarButtons/NavbarBackButton/NavbarBackButton';
import { NavbarRefreshButton } from '@/components/common/Navbar/NavbarButtons/NavbarRefreshButton/NavbarRefreshButton';
import { AboutSlide } from './AboutSlide/AboutSlide';
import { killTimelineRef } from '@/utils/gsap/killTimelineRef';
import 'swiper/css';
import 'swiper/css/pagination';
import { CUBE_SIZES_DICT } from '../../components/Cube/Cube.static';

/**
 * Content for the 'About' page
 * Wraps page content with the AboutContext provider
 * 
 * @returns React Component
 */
export const About = () => (

    <AboutContextProvider>
        <AboutContent />
    </AboutContextProvider>

)

/**
 * Inner content for the 'About' component
 * @see {About}
 * 
 * @returns React Component
 */
const AboutContent = () => {

    // ROUTER
    const router = useRouter();

    // CONTEXT
    const { swiper, activeSlideIndex, handleSetSwiper, handleSetActiveSlideIndex } = useContext(AboutContext);
    const { cubeRef } = useContext(CubeContext);
    const { handleSetNavbarActions } = useNavbar();

    // REFS
    /**
     * Store gsap timeline
     */
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    /**
     * Ref for carousel/swiper component
     */
    const carouselContainerRef = useRef<HTMLDivElement | null>(null);

    /**
     * Ref for bottom button
     */
    const buttonRef = useRef<HTMLButtonElement | null>(null);

    /**
     * Ref for bottom button inner text
     */
    const buttonTextRef = useRef<HTMLSpanElement | null>(null);

    // CALLBACKS

    /**
     * Updates swiper instance in context and sets navbar actions
     * 
     * @param newSwiper             Up to date swiper instance
     */
    const handleOnSwiper = (newSwiper: SwiperClass) => {
        handleSetSwiper(newSwiper);

        handleSetNavbarActions({
            left: <NavbarBackButton onClick={handleAnimateBack} />,
            right: <NavbarRefreshButton onClick={() => newSwiper.slideTo(0)} />
        })
    }

    /**
     * Updates swiper slide on click, or animates to next page if on final slide
     * 
     * @returns void
     */
    const handleNextStep = () => {

        // If on last slide, start animation/redirect process
        if(activeSlideIndex + 1 === ABOUT_SWIPER_CONTENT.length) {
            return handleAnimateForward();
        }

        // Otherwise, proceed to next slide
        if(swiper) {
            swiper.slideNext();
        }

    }

    /**
     * Updates activeSlideIndex in context and defines navbar left/back button onClick event
     * 
     * @param swiper            Current swiper instance
     */
    const handleSlideChange = (swiper: SwiperClass) => {

        if(swiper) {
            handleSetActiveSlideIndex(swiper.activeIndex);
        }

        const onClick = () => swiper.activeIndex === 0 ? handleAnimateBack() : swiper.slidePrev();

        // Update navbar action
        handleSetNavbarActions({
            left: <NavbarBackButton onClick={onClick} />
        })

    }

    // ANIMATIONS
    /**
     * On load animation
     */
    const { contextSafe } = useGSAP(() => {

        // Kill current animation
        killTimelineRef(timelineRef);

        // Enforce sizing constraints on cube element
        fixCubeSize(cubeRef, cubeSizeEnum.medium);

        // Create timeline
        timelineRef.current = gsap.timeline({
            paused: true
        });

        // FADE in container
        carouselContainerRef.current && timelineRef.current.to(carouselContainerRef.current, { opacity: 1 }, 0);

        // TRANSLATE and FADE in button text
        buttonTextRef.current && timelineRef.current.to(buttonTextRef.current, { transform: 'translateX(0)', opacity: 1 }, 0);
        
        // PLAY timeline
        timelineRef.current.play();

    }, []);

    /**
     * On Back a page animation
     */
    const handleAnimateBack = contextSafe(() => {

        // Kill timeline
        killTimelineRef(timelineRef);

        // Create timeline
        timelineRef.current = gsap.timeline({
            paused: true,
            onComplete: () => {
                fixCubeSize(cubeRef, cubeSizeEnum.large);
                router.push(PAGE_ROUTES.root);
            }
        });

        // FADE out carousel container
        carouselContainerRef.current && timelineRef.current.to(carouselContainerRef.current, { opacity: 0 }, 0);

        // FADE and TRANSLATE button text
        buttonTextRef.current && timelineRef.current.to(buttonTextRef.current, { transform: 'translateX(-25%)', opacity: 0 }, 0);

        // RESIZE cube
        cubeRef.current && timelineRef.current.to(cubeRef.current, { ...CUBE_SIZES_DICT[cubeSizeEnum.large] });

        // PLAY timeline
        timelineRef.current.play();

    });

    /**
     * On forward a page animation
     */
    const handleAnimateForward = contextSafe(() => {

        // Kill active timeline
        killTimelineRef(timelineRef);

        // TIMELINE
        timelineRef.current = gsap.timeline({
            paused: true,
            onComplete: () => {
                fixCubeSize(cubeRef, cubeSizeEnum.small);
                router.push(PAGE_ROUTES.form.root);
            }
        });

        // FADE out container
        carouselContainerRef.current && timelineRef.current.to(carouselContainerRef.current, { opacity: 0 }, 0);

        // COLOUR button
        buttonRef.current && timelineRef.current.to(buttonRef.current, { backgroundColor: 'transparent', outlineColor: 'transparent' }, 0);

        // TRANSLATE and FADE button text
        buttonTextRef.current && timelineRef.current.to(buttonTextRef.current, { transform: 'translateX(25%)', opacity: 0 }, 0);

        // RESIZE cube
        cubeRef.current && timelineRef.current.to(cubeRef.current, { width: CUBE_SIZES_DICT[cubeSizeEnum.small].width, height: CUBE_SIZES_DICT[cubeSizeEnum.small].height });

        // PLAY timeline
        timelineRef.current.play();
    })

    // COMPUTED
    /**
     * Determine if swiper is on final slide
     */
    const isFinalSlide = useMemo(() => activeSlideIndex === ABOUT_SWIPER_CONTENT.length - 1, [activeSlideIndex]);

    return (
        <section 
            className='h-full w-screen relative grid grid-rows-[1fr_max-content] justify-center md:pb-48 pb-4'
        >
            <div 
                className='w-screen opacity-0 pt-8 pb-4 md:py-0'
                ref={carouselContainerRef}
            >

                {/* SWIPER CAROUSEL */}
                <Swiper
                    pagination
                    modules={[Pagination, A11y]} 
                    onSlideChange={handleSlideChange}
                    onSwiper={handleOnSwiper}   
                    className='h-full md:max-h-48'
                >
                    {
                        ABOUT_SWIPER_CONTENT.map(( slide, slideIndex ) => (
                            <SwiperSlide key={slideIndex}>
                               <AboutSlide {...slide} slideIndex={slideIndex} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>

            {/* CONTINUE BUTTON */}
            <div className='px-4 flex justify-center'>
                <Button 
                    className={`w-full max-w-96 ${isFinalSlide ? 'secondary' : ''}`}
                    onClick={handleNextStep}
                    ref={buttonRef}
                >
                    <span
                        className='-translate-x-1/4 opacity-0'
                        ref={buttonTextRef}
                    >
                        { isFinalSlide ? 'Get Started' : 'Continue' }
                    </span>
                </Button>
            </div>
            
        </section>
       
    )

}