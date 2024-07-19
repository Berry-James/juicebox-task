import React, { PropsWithChildren } from 'react';
import { Cube } from './components/Cube/Cube';
import { CubeContextProvider } from './components/Cube/context/CubeContext';

/**
 * Layout shared amongst all pages in the (home) route group
 * 
 * The cube component/context is injected here, this has been done for several reasons:
 * 1. Ensure cube does not lose animation state inbetween pages (as this layout will persist between all page changes in (home) route group)
 * 2. Avoid re-drawing cube when not necessary (i.e. client navigation)
 * 3. Provide access to the cubeRef for animating cube in ALL child components
 * 
 * By instantiating this context inside a layout, we can also guarantee cubeRef is always assigned as the layout is rendered before the page content
 * 
 * @param props.children            Page contents
 * @returns                         Next.js page layout
 */
const HomeLayout = ({ children }: PropsWithChildren) => {

    return (
        <main className='grid h-[calc(100vh-96px)] grid-rows-[max-content_1fr]'>
            <CubeContextProvider>
                <Cube />
                {children}
            </CubeContextProvider>
        </main>
    )

}

export default HomeLayout