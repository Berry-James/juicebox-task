'use client';

import React, { useMemo, useRef } from 'react';
import { IFormInputProps } from './FormInput.types';
import { FieldValues, useFormContext } from 'react-hook-form';
import { IconButton } from '../../IconButton/IconButton';

/**
 * Generic form input component
 * MUST be used with React Hook Form FormContext
 * @see {FormContext}
 * 
 * @implements {IFormInputProps<FieldValues>}
 * 
 * @param props.name            Name/key for the field in the form
 * @param props.rules           (optional) Optional rule list for field
 * @param props.inputProps      (optional) Props to be forwarded to the underlying HTML input element
 * @param props.action          (optional) Action to be mapped to a button at the end of the input
 * @param props.label           (optional) Text label for the field
 * 
 * @returns React Component
 */
export const FormInput = ({ 
    name, 
    rules,
    inputProps, 
    action, 
    label
}: IFormInputProps<FieldValues>) => {

    // FORM
    const { register, formState: { errors } } = useFormContext();

    // Declare field registration externally, as we need access to the ref callback
    const registration = register(name, rules);

    // REFS
    /**
     * Ref to the label tag
     */
    const labelRef = useRef<HTMLLabelElement | null>(null);
    const unsubscribe = useRef<Function | null>(null);

    // COMPUTED
    /**
     * Returns the current error for the field (if there is one)
     */
    const computedFieldErrors: string | null = useMemo(() => {
        return errors?.[name]?.message ? errors?.[name]?.message as string : null
    }, [errors, name]);


    // COMPUTED
    /**
     * Custom ID for the field, used for safely linking label to field
     */
    const fieldId = useMemo(() => `field-${name}`, [name]);


    return (
        <div className='flex flex-col gap-0.5'>

            <div className='flex justify-between items-start'>
                {
                    label ?
                    <label 
                        htmlFor={fieldId}
                        ref={labelRef}
                    >
                        { label }
                    </label>
                    : <div />
                }
                    
                <span
                    className={`text-red-500 text-sm ml-auto ${computedFieldErrors ? 'visible' : 'invisible'}`}
                    role='alert'
                    aria-relevant='all'
                >
                    {computedFieldErrors || '&nbsp;'}
                </span>
            </div>
           
            
            <div className='relative flex items-center border border-white/60 rounded-3xl px-2 py-1 bg-transparent h-[60px]'>
                <input 
                    {...inputProps}
                    // IF only given a placeholder and no label, mark it is label for screenreaders
                    aria-label={!label && inputProps?.placeholder ? inputProps.placeholder : undefined}
                    className={`border-none grow ${inputProps?.className}`}
                    {...register(name, rules)}
                    id={fieldId}
                />
                {
                    action &&
                    <IconButton
                        className='w-8 h-8 p-1'
                        onClick={action.onClick}
                    >
                        { action.icon }
                    </IconButton>
                }
            </div>
        </div>
        
       
    )

}