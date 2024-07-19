export function killTimelineRef(timelineRef: React.MutableRefObject<gsap.core.Timeline | null>) {

    if(timelineRef.current) {
        timelineRef.current.kill();
    }

}