'use client';

import React, { useContext, useMemo } from 'react';
import Lottie from 'lottie-react';
import { CubeContext } from './context/CubeContext';
import { usePathname  } from 'next/navigation';
import { PAGE_ROUTES } from '@/static/pageRoutes';
import { getInitialCubeSize } from './utils/getInitialCubeSize';

// ASSETS
import juicebotAnimation from '../../../../assets/animations/juicebot/juicebot.json';

/**
 * Animated lottie cube component
 * Must be wrapped with CubeContextProvider in order to function correctly
 * @see {CubeContextProvider}
 * 
 * @returns React Component
 */
export const Cube = () => {

    // ROUTER
    const pathname = usePathname();

    // CONTEXT
    const { cubeRef, cubeTextRef } = useContext(CubeContext);

    // COMPUTED
    /**
     * Determine initial cube size for style prop on pathname change
     * This is only needed to ensure cube is correctly proportioned on inital render
     */
    const initialCubeSize = useMemo(() => getInitialCubeSize(pathname), [pathname]);

    return (
        <div className={`w-full flex justify-center items-center basis-full py-8`}>
            <div
                className='relative flex justify-center items-center'
            >

                {/* 
                    PLEASE NOTE:

                    I am aware this is not optimal, but the lottie assets I was supplied has a massive amount of padding, 
                    making it impossible to match the designs without forcefully clipping it. 
                    I would assume under other circumstances, it would be the job of the designer supplying the assets to ensure they were sized correctly
                 */}    
                <div
                    className='relative overflow-hidden'
                    ref={cubeRef}
                    style={initialCubeSize}
                >
                    <Lottie
                        animationData={juicebotAnimation}
                        loop={true}
                        className='absolute inset-1/2'
                        style={{
                            // Percentage w/h values to clip the padding from the lottie animation, in order to match design spec
                            height: '140%',
                            width: '140%',
                            transform: 'translate(-50%, -50%)'
                        }}
                    />
                </div>

                {
                    pathname === PAGE_ROUTES.root &&
                    <div
                        className='cube-text w-full h-full absolute top-0 left-0'
                        ref={cubeTextRef}
                    >
                        <span className='opacity-0 text-sm absolute left-[0px] top-[24px]'>WA businesses feel confident about future growth</span>
                        <span className='opacity-0 text-sm absolute right-[0px] top-[80px]'>Human connection drives WA business</span>
                        <span className='opacity-0 text-sm absolute left-[0px] top-[140px]'>Sales measure true success</span>
                        <span className='opacity-0 text-sm absolute right-[0px] top-[180px] text-right'>AI can&apos;t replace creativity</span>
                        <span className='opacity-0 text-sm absolute left-[0px] bottom-[24px] w-56'>The primary barrier to digital transformation is financial investment</span>
                    </div>    
                }

            </div>
        </div>
        
    )

}
