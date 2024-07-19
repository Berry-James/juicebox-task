# Technical Writeup

This document is intended as a short summary/writeup of my experience in completing this task.  It outlines my thought process in regards to project structure, as well as issues I faced.

### Thought Process

###### Design System

I chose to work with Tailwind as a styling framework.  In my experience, it is far more extensible and robust than a purely .css file implementation.  I know that the brief instructed that I use css variables, but I made the conscious decision to avoid that approach and work with a system that forces configuration in a single file (tailwind.config.ts) with a documented method for extending/overriding its built in classes.

###### Routing

Rather than keeping all content on a single page/route, I chose to divide it into 3 sections.  This has the following advantages:

1. Modularising code into smaller chunks
2. Taking advantage of Next.js's build-time optimisation for pages
3. Reducing the size of the initial paint

The disadvantage of taking this approach is the slight delay between pages, however given more time and planning I would pre-render these pages in order to make some of the transitions more seamless.


###### Folder Structure

As of a fairly recent Next.js version, it is now possible to nest components inside the `app` directory.  This is helpful for keeping code specific to a page/layout close to where it is implemented.  For example, I am able to keep all components specific to the `/about` page in a folder titled `components`, nested at the same level as `page.tsx`.

### Issues Faced

There were a number of issues which I faced during the development of this task.

1. The Lottie file provided has a very significant amount of padding surrounding it.  This makes it difficult to position with respect to the designs, without deliberately overflowing content and clipping it out, which presents a maintainability issue (were the animation to be updated, it would need to be resized again).  The asset should be correctly prepared by the designer/supplier of the asset.

2. The figma does not demonstrate how the cube animations should look, whereas the lottie file is animated.  I have left the animation to loop.

3. The cube is shown in the design with a coloured overlay.  As the figma provides no animations for this, I have assumed that this 'Beauty.png' (the image used in the figma file) overlay should be displayed static on top of the cube, with a mask used to clip it.  This is not a good solution, especially working with a lottie file that is compiled into an svg (I don't have easy access to the contents of the SVG).  Doing so would also introduce unecessary processing and overhead for the site - it should be a part of the cube lottie itself.

4. Swiper is limiting with react, as it manages its own activeSlide state internally.  Sure, everything within the Swiper context has access to the necessary values with the useSwiper hook, but this FORCES anything that wants to take advantage of the built in APIs to be nested within the swiper element in the DOM, and be subject to all of its styling.  This doesn't seem like a good package for this circumstance, considering the active slide can be updated with the back arrow button in the top left, which should be a global navbar in a layout or likewise (not nested within the swiper context/arbitrarily rendered on each page, not good for maintainability at all).  Given the opportunity, I would select a package that following the React way of working.

5. The background in the figma is different in every slide.  Is this implying that the background is animated?  I have added a simple animation to the background gradient.

6. The document stresses the importance of accessibility standards, however the design is utilising placeholder text in place of an input label, which is notoriously bad for accessibility (and UX in general).  I would assume the label would move elsewhere (like above the field) after inputting text, but this has not been communicated in the designs.  As a result, I have used aria-label on the input tag, when only a placeholder is present.

7. The document states that there is a lottie animation on the 'Results' page.  The design does not include a unique animation, and I was not supplied a second lottie file.  I have used the original lottie animation here.

8. I can see in the 'Step 2.1' figma screens (there are three screens all called 'Step 2.1', I would assume the last two are meant to read 2.2 and 2.3), half of the text is grey and half is white.  I am assuming this is indicating there is some sort of a swipe animation here?  I feel this highlights the importants of comments and notation in designs, as the developer is entirely unsure otherwise.  I have attempted to implement a text swipe, albeit not the best.

9. The documentation instructs that I should use the 'Lenis' package for smooth scrolling, however in no aspect do the designs indicate there would need to be any sort of page scrolling.  I have not included the package as I don't see its purpose with the design I was given.

10. I was unable to get a smooth enough animation for the text wipe in the About page slides.  I have left my incomplete implementation in as an example of my thought process.