import { PAGE_ROUTES } from "@/static/pageRoutes";
import { CSSProperties } from "react";
import { cubeSizeEnum } from "../context/CubeContext.types";
import { CUBE_SIZES_DICT } from "../Cube.static";

/**
 * Generates a set of CSS rules for the Cube component, based on the current page route
 * 
 * @param pathname             The current pathname
 * @returns                    A set of CSSProperties
 */
export function getInitialCubeSize(pathname: string): CSSProperties {

    let ret: CSSProperties = {};

    if(pathname === PAGE_ROUTES.about.root) {
        ret = {
            ...ret,
            ...CUBE_SIZES_DICT[cubeSizeEnum.medium],
        }
    }

    else if(pathname === PAGE_ROUTES.root) {
        ret = {
            ...ret,
            ...CUBE_SIZES_DICT[cubeSizeEnum.large],
        }
    }

    else if(pathname === PAGE_ROUTES.form.root) {
        ret = {
            ...ret,
            ...CUBE_SIZES_DICT[cubeSizeEnum.small],
        }
    }

    return ret;

}