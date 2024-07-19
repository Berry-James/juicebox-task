/**
 * @interface
 * 
 * @member slideIndex           Index of this slide within the greater array of slides
 * @member bodyText             Text to be rendered within the slide
 */
export interface IAboutSlideProps {
    slideIndex: number;
    bodyText: string;
}