'use client';

import React, { createContext, PropsWithChildren, useContext, useRef, useState } from 'react';
import gsap from 'gsap';
import { INavbarContext, NavbarActions } from './Navbar.types';
import { useGSAP } from '@gsap/react';
import { killTimelineRef } from '@/utils/gsap/killTimelineRef';
import { DEFAULT_NAVBAR_ACTIONS } from './Navbar.static';
import { NavbarBranding } from './NavbarBranding/NavbarBranding';

/**
 * Functional context for system Navbar
 * 
 * Navbar exists in the root level layout and will persist across every page.
 * The unfortunate drawback of this method of managing navbar functions, is there is no way to assign them prior to page render.
 * 
 * Were the scale of this project to grow, I would implement default navbar functions (to cover 90% of use cases, like a slide out sidebar for example)
 * 
 * @implements {INavbarContext}
 * 
 * @returns React Context
 */
const NavbarContext = createContext<INavbarContext>({
   navbarActions: DEFAULT_NAVBAR_ACTIONS,
   handleSetNavbarActions: (newNavbarActions: Partial<NavbarActions>) => undefined
});

/**
 * Provider for the Navbar context
 * @see {NavbarContext}
 * 
 * @param props.children                Child components
 * @returns React Component
 */
const NavbarContextProvider = ({ children }: PropsWithChildren) => {

    // STATE
    /**
     * Store the current navbar actions (left/right) in state
     */
    const [navbarActions, setNavbarActions] = useState(DEFAULT_NAVBAR_ACTIONS);

    // CALLBACKS
    /**
     * Updates the navbar actions to the given value
     * 
     * @param newNavbarActions          Updated navbar actions
     * 
     * @returns void
     */
    const handleSetNavbarActions = (newNavbarActions: Partial<NavbarActions>) => setNavbarActions((prevState) => ({ ...prevState, ...newNavbarActions }));

    return (
        <NavbarContext.Provider
            value={{
                navbarActions,
                handleSetNavbarActions
            }}
        >
            <Navbar />
            { children }
        </NavbarContext.Provider>
    )

}

/**
 * The navbar component
 * Controlled externally via the NavbarContext
 * 
 * @returns React Component
 */
const Navbar = () => {

    // CONTEXT
    const { navbarActions } = useContext(NavbarContext);

    // REFS
    /**
     * gsap timeline for actions
     */
    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const navbarLeftActionRef = useRef<HTMLDivElement | null>(null);
    const navbarRightActionRef = useRef<HTMLDivElement | null>(null);

    const { contextSafe } = useGSAP(() => {

        killTimelineRef(timelineRef);

        timelineRef.current = gsap.timeline({
            paused: true
        });

        navbarLeftActionRef.current && timelineRef.current.to(navbarLeftActionRef.current, { opacity: 1 }, 0);
        navbarRightActionRef.current && timelineRef.current.to(navbarRightActionRef.current, { opacity: 1 }, 0);

        timelineRef.current.play();

    }, [navbarActions]);


    return (
        <nav 
            className='w-full h-24 grid grid-cols-[64px_1fr_64px] items-center justify-center place-items-center p-4 select-none'
            role='navigation'
        >

            {/* LEFT ACTION */}
            <div 
                className='opacity-0'
                ref={navbarLeftActionRef}
            >
                { navbarActions.left }
            </div>

            {/* BRANDING */}
            <NavbarBranding />

            {/* RIGHT ACTION */}
            <div 
                className='opacity-0'
                ref={navbarRightActionRef}
            >   
                { navbarActions.right }
            </div>

        </nav>
    )

}

const useNavbar = () => useContext(NavbarContext);

export { NavbarContextProvider, useNavbar }