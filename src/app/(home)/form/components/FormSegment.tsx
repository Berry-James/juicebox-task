'use client';
import React, { useContext, useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import gsap from 'gsap';
import { FormInput } from '@/components/common/Form/FormInput/FormInput';
import { FormProvider, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { FormReview } from './FormReview/FormReview';
import { useGSAP } from '@gsap/react';
import { useNavbar } from '@/components/common/Navbar/Navbar';
import { useRouter } from 'next/navigation';
import { PAGE_ROUTES } from '@/static/pageRoutes';
import { fixCubeSize } from '@/utils/gsap/fixCubeSize';
import { killTimelineRef } from '@/utils/gsap/killTimelineRef';
import { CubeContext } from '../../components/Cube/context/CubeContext';
import { cubeSizeEnum } from '../../components/Cube/context/CubeContext.types';
import { FORM_DEFAULTS, FORM_STEPS, formSchema } from './FormSegment.static';
import { UserForm } from './FormSegment.types';
import { NavbarBackButton } from '@/components/common/Navbar/NavbarButtons/NavbarBackButton/NavbarBackButton';
import { NavbarRefreshButton } from '@/components/common/Navbar/NavbarButtons/NavbarRefreshButton/NavbarRefreshButton';
import { CUBE_SIZES_DICT } from '../../components/Cube/Cube.static';

// ICONS
import ArrowDownIcon from '../../../../assets/icons/arrow_down.svg';

/**
 * Primary component for the 'Form' page
 * Handles form submission and component animations/rendering
 * 
 * @returns React Component
 */
export const FormSegment = () => {

    // ROUTER
    const router = useRouter();

    // CONTEXT
    const { cubeRef } = useContext(CubeContext);
    const { handleSetNavbarActions } = useNavbar();

    // STATE
    /**
     * Index of the currently active field within FORM_STEPS
     */
    const [activeFieldIndex, setActiveFieldIndex] = useState(0);

    /**
     * Whether or not the 'Review' screen should be displayed
     */
    const [isReviewing, setIsReviewing] = useState(false);

    // REFS
    /**
     * Store gsap timeline
     */
    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    /**
     * Ref to description text
     */
    const descriptionTextRef = useRef<HTMLHeadingElement | null>(null);

    /**
     * Ref to the final step (review)
     */
    const formReviewRef = useRef<HTMLHeadingElement | null>(null);

    // FORM
    /**
     * HookForm instance
     */
    const formMethods = useForm<UserForm>({
        defaultValues: FORM_DEFAULTS,
        resolver: yupResolver(formSchema)
    })

    /**
     * Callback fired when form is submitted
     * 
     * @todo -> I have not been supplied a screen/process after the form is submitted
     */
    const handleSubmitForm = formMethods.handleSubmit((values) => {
        console.table(values);
    });

    /**
     * Sets the active field to the next one in line, or the review step if no fields left
     * 
     * @returns void
     */
    const handleGoNextField = async () => {

        const activeField = FORM_STEPS[activeFieldIndex];

        // TODO -> put logic to submit form here
        if(!activeField.name) {
            return
        }
        
        // Validate field
        const isFieldValid = await formMethods.trigger(activeField.name, { shouldFocus: true });

        // If field not valid, break here
        if(!isFieldValid) { return }

        // Animate out text
        const tl = gsap.timeline({
            onComplete: () => {
                // If final field, set isReviewing to true
                if(activeFieldIndex + 1 === FORM_STEPS.length) {
                    return setIsReviewing(true);
                }

                // Otherwise, update to next field
                setActiveFieldIndex((prevState) => prevState + 1);       
                
                descriptionTextRef.current && gsap.to(descriptionTextRef.current, { opacity: 1 })
            }
        });

       descriptionTextRef.current && tl.to(descriptionTextRef.current, { opacity: 0 }, 0);

        
    }

    // SIDE EFFECTS
    /**
     * Update navbar actions on page load
     */
    useEffect(() => {
        handleSetNavbarActions({
            left: <NavbarBackButton onClick={handleAnimateBack} />,
            right: <NavbarRefreshButton onClick={handleAnimateBack} />
        });
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [activeFieldIndex, isReviewing]);
    
    // ANIMATIONS
    /**
     * Animate in content on page load
     */
    const { contextSafe } = useGSAP(() => {

        // Clear timeline
        killTimelineRef(timelineRef);
        
        // Ensure cube is the correct size
        fixCubeSize(cubeRef, cubeSizeEnum.small);

        // TIMELINE
        timelineRef.current = gsap.timeline({
            paused: true
        });

        // FADE in form section
        descriptionTextRef.current && timelineRef.current.to(descriptionTextRef.current, { opacity: 1 }, 0);

        // PLAY timeline
        timelineRef.current.play();

    }, [isReviewing]);

    /**
     * Animates out components and redirects page back to about
     */
    const handleAnimateBack = contextSafe(() => {

        // Kill timeline
        killTimelineRef(timelineRef);

        // Create new timeline
        timelineRef.current = gsap.timeline({
            paused: true,
            onComplete: () => {
                if(activeFieldIndex === 0) {
                    router.push(PAGE_ROUTES.about.root);
                } else if (isReviewing) {
                    setIsReviewing(false);
                } else {
                    setActiveFieldIndex((prevState) => prevState - 1);
                    descriptionTextRef.current && gsap.to(descriptionTextRef.current, { opacity: 1 })
                }
            }
        });

        // FADE out description text
        descriptionTextRef.current && timelineRef.current.to(descriptionTextRef.current, { opacity: 0 }, 0);

        // RESIZE cube component
        if(activeFieldIndex === 0 && cubeRef.current) {
            timelineRef.current.to(cubeRef.current, { ...CUBE_SIZES_DICT[cubeSizeEnum.medium] });
        }

        // FADE out review component
        if(isReviewing && formReviewRef.current) {
            timelineRef.current.to(formReviewRef.current, { opacity: 0 }, 0);
        }

        // PLAY timeline
        timelineRef.current.play();

    });

    return (
        <section
            className='p-4 md:pb-48 h-full'
        >
            <FormProvider {...formMethods}>
                <form
                    onSubmit={handleSubmitForm}
                    className='flex flex-col justify-between items-center h-full'
                >
                    {
                        isReviewing ? 
                        <FormReview textRef={formReviewRef} />
                        :
                        FORM_STEPS[activeFieldIndex].name &&
                        <>

                            {/* FIELD DESCRIPTION */}
                            <h6 
                                className='text-center opacity-0'
                                ref={descriptionTextRef}
                            >
                                {FORM_STEPS[activeFieldIndex].description}
                            </h6>

                            {/* FORM FIELD */}
                            <div className='md:w-96 max-w-96 w-full'>
                                <FormInput 
                                    name={FORM_STEPS[activeFieldIndex].name}
                                    inputProps={{
                                        placeholder: FORM_STEPS[activeFieldIndex].label,
                                        autoFocus: true,
                                        "aria-required": true,
                                        type: 'text'
                                    }}
                                    action={{
                                        onClick: handleGoNextField,
                                        icon: (
                                            <Image 
                                                src={ArrowDownIcon}
                                                alt='Arrow pointing down'
                                                width={12}
                                                height={12}
                                            />
                                        )  
                                    }}
                                />
                            </div>
                            
                        </>
                        
                    }
                </form>
            </FormProvider>
        </section>
        
    )

}