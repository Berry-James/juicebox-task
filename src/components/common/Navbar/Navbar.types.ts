import { ReactNode } from "react"

export interface INavbarContext {
    navbarActions: NavbarActions;
    handleSetNavbarActions: (newNavbarActions: Partial<NavbarActions>) => void;
}

export type NavbarActions = {
    left: ReactNode | null;
    right: ReactNode | null;
}
