import { cubeSizeEnum } from "@/app/(home)/components/Cube/context/CubeContext.types";
import { CUBE_SIZES_DICT } from "@/app/(home)/components/Cube/Cube.static";

export function fixCubeSize(cubeRef: React.MutableRefObject<HTMLDivElement | null>, newCubeSize: cubeSizeEnum) {
    if(cubeRef.current) {
        cubeRef.current.style.width = CUBE_SIZES_DICT[newCubeSize].width;
        cubeRef.current.style.height = CUBE_SIZES_DICT[newCubeSize].height;
        cubeRef.current.style.opacity = '1';
    }
}