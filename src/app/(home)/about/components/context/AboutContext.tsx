import React, { createContext, PropsWithChildren, useContext, useState } from 'react';
import Swiper from 'swiper';
import { IAboutContext } from './AboutContext.types';

/**
 * Functional context for the 'About' page
 * Used for storing/updating instance of swiper API, and tracking index of currently viewed swiper slide
 * @implements {IAboutContext}
 * 
 * @returns React Context
 */
export const AboutContext = createContext<IAboutContext>({
    swiper: null,
    activeSlideIndex: 0,
    handleSetActiveSlideIndex: (newActiveSlideIndex: number) => undefined,
    handleSetSwiper: (newSwiper: Swiper) => undefined,
});

/**
 * Provider for AboutContext
 * @see AboutContext
 * @implements {PropsWithChildren}
 * 
 * @param props.children            Child components
 * @returns React Context Provider
 */
export const AboutContextProvider = ({ children }: PropsWithChildren) => {

    // STATE
    /**
     * Store swiper instance for access outside of Swiper context
     */
    const [swiper, setSwiper] = useState<Swiper | null>(null);

    // CALLBACKS
    /**
     * Must store active slide index as its own state in order to trigger redraws and keep certain components tied statefully to the swiper index.
     * This presents a pretty big React anti pattern, whereby our activeSlideIndex is not tightly coupled to the ACTUAL slide index (not possible in Swiper).
     */
    const [activeSlideIndex, setActiveSlideIndex] = useState(0);

    /**
     * Update the swiper state to the given value
     * 
     * @param newSwiper             Swiper instance
     * @returns void
     */
    const handleSetSwiper = (newSwiper: Swiper) => setSwiper(newSwiper);

    /**
     * Updates the active slide index stat to the given value
     * 
     * @param newActiveSlideIndex       The new active slide index
     * @returns void
     */
    const handleSetActiveSlideIndex = (newActiveSlideIndex: number) => setActiveSlideIndex(newActiveSlideIndex);

    return (
        <AboutContext.Provider
            value={{
                
                // STATE
                swiper,
                activeSlideIndex,
                
                // CALLBACKS
                handleSetSwiper,
                handleSetActiveSlideIndex
            }}
        >
            { children }
        </AboutContext.Provider>
    )

}