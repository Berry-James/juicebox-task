import { IconButton } from '@/components/common/IconButton/IconButton';
import React, { ForwardedRef, forwardRef } from 'react';
import Image from 'next/image';

// ICONS
import RefreshIcon from '../../../../../assets/icons/refresh_icon.svg';
import { IconButtonProps } from '@/components/common/IconButton/IconButton.types';

export const NavbarRefreshButton = forwardRef(function NavbarRefreshButton(props: IconButtonProps, ref: ForwardedRef<HTMLButtonElement>) {

    return (
        <IconButton
            {...props}
            ref={ref}
        >   
            <Image 
                src={RefreshIcon}
                alt='Back'
            />
        </IconButton>
    )

})