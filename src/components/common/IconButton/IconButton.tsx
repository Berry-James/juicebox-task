import React, { ForwardedRef, forwardRef } from 'react';
import { IconButtonProps, IconButtonSize } from './IconButton.types';

/**
 * Custom icon button component.
 * Designed for use with square-ish icons, but will take other elements too
 * 
 * @implements {IconButtonProps}
 * 
 * @returns React Component
 */
export const IconButton = forwardRef(function IconButton(props: IconButtonProps, ref: ForwardedRef<HTMLButtonElement>) {

    return (
        <button
            {...props}
            ref={ref}
            className={`rounded-full p-1 flex items-center justify-center min-h-4 border-none bg-white/5 ${props?.className} ${getClassNameBySizeProp(props?.size)}`}
        >
            { props.children }
        </button>
    )

});

/**
 * Generates tailwind classes based on size prop given
 * 
 * @param sizeProp          A size
 * 
 * @returns A classlist to size the button with
 */
function getClassNameBySizeProp(sizeProp: IconButtonSize | undefined) {

    switch(sizeProp) {
        case 'sm': {
            return 'w-4 h-4'
        }
        case 'md': {
            return 'w-8 h-8'
        }
        case 'lg': {
            return 'w-12 h-12'
        }
        case 'xl': {
            return 'w-16 h-16'
        }
        default: {
            return 'w-12 h-12'
        }
    }

}