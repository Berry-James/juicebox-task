import Swiper from "swiper";

/**
 * @interface
 * 
 * @member swiper                               Current instance of swiper
 * @member activeSlideIndex                     Index of currently active swiper slide
 * @member handleSetActiveSlideIndex            Callback to set new active slide index
 * @member handleSetSwiper                      Callback to set swiper instance
 */
export interface IAboutContext {
    swiper: Swiper | null;
    activeSlideIndex: number;
    handleSetActiveSlideIndex: (newActiveSlideIndex: number) => void;
    handleSetSwiper: (newSwiper: Swiper) => void;
}