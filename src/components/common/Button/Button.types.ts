import { PropsWithChildren } from "react";

export interface IButtonProps extends PropsWithChildren, React.DetailedHTMLProps<React.ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement> {
    // TODO -> Implement further custom props here in future (like start/end icons)
}