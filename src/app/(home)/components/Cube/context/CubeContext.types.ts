import { MutableRefObject } from "react";

/**
 * @enum
 * 
 * @member small
 * @member medium
 * @member large
 */
export enum cubeSizeEnum {
    small,
    medium,
    large
}

/**
 * @interface
 * 
 * @member cubeRef          Ref to cube element
 * @member cubeTextRef      Ref to cube overlay text element
 */
export interface ICubeContext {
    cubeRef: MutableRefObject<HTMLDivElement | null>;
    cubeTextRef: MutableRefObject<HTMLDivElement | null>;
}