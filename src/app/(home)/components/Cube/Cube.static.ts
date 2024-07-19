import { CSSProperties } from "react";
import { cubeSizeEnum } from "./context/CubeContext.types";

// Static dictionary of cube size mappings
export const CUBE_SIZES_DICT: Record<cubeSizeEnum, CSSProperties & { width: string; height: string; }> = {
    [cubeSizeEnum.large]: {
        width: '300px',
        height: '300px',
    },
    [cubeSizeEnum.medium]: {
        width: '200px',
        height: '200px'
    },
    [cubeSizeEnum.small]: {
        width: '40px',
        height: '40px'
    }
}
