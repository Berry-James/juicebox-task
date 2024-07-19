import { IconButton } from '@/components/common/IconButton/IconButton';
import React, { ForwardedRef, forwardRef } from 'react';
import Image from 'next/image';

// ICONS
import ArrowBackIcon from '../../../../../assets/icons/arrow_back.svg';
import { IconButtonProps } from '@/components/common/IconButton/IconButton.types';

/**
 * Generic back button for the Navbar component.
 * Automatically uses the back arrow icon
 * 
 * @see {Navbar}
 * 
 * @returns React Component
 */
export const NavbarBackButton = forwardRef(function NavbarBackButton(props: IconButtonProps, ref: ForwardedRef<HTMLButtonElement>) {

    return (
        <IconButton
            {...props}
            ref={ref}
        >   
            <Image 
                src={ArrowBackIcon}
                alt='Back'
            />
        </IconButton>
    )

})