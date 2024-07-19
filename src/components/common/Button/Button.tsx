import React, { ForwardedRef, forwardRef } from 'react';
import { IButtonProps } from './Button.types';

export const Button = forwardRef(function Button(props: IButtonProps, ref: ForwardedRef<HTMLButtonElement>) {

    return (
        <button
            {...props}
            ref={ref}
            className={`border border-white/60 rounded-3xl h-[60px] min-h-[60px] flex items-center justify-center ${props?.className || ''}`}
        >
            { props.children }
        </button>
    )

})
