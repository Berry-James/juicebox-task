'use client';

import React, { createContext, PropsWithChildren, useRef } from 'react';
import { ICubeContext } from './CubeContext.types';

/**
 * Functional context for the lottie (cube) animation
 * @implements {ICubeContext}
 * 
 * @returns React Context
 */
export const CubeContext = createContext<ICubeContext>({
    cubeRef: { current: null },
    cubeTextRef: { current: null } 
});

/**
 * Provider for the CubeContext React Context
 * @see {CubeContext}
 * @implements {PropsWithChildren}
 * 
 * @param props.children            Child components
 * @returns React Context Provider
 */
export const CubeContextProvider = ({ children }: PropsWithChildren) => {

    // REFS
    /**
     * Ref to cube animation
     */
    const cubeRef = useRef<HTMLDivElement | null>(null);

    /**
     * Ref to cube overlay text (for home page)
     */
    const cubeTextRef = useRef<HTMLDivElement | null>(null);
  
    return (
        <CubeContext.Provider
            value={{
                cubeRef,
                cubeTextRef
            }}
        >
            { children }
        </CubeContext.Provider>
    )

}
