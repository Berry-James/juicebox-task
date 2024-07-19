import { ReactNode } from "react";
import { RegisterOptions } from "react-hook-form";

/**
 * @interface
 * 
 * @member name             Name/key for the field in the form
 * @member rules            (optional) Optional rule list for field
 * @member inputProps       (optional) Props to be forwarded to the underlying HTML input element
 * @member action           (optional) Action to be mapped to a button at the end of the input
 * @member label            (optional) Text label for the field
 */
export interface IFormInputProps<TFormFields extends Record<PropertyKey, unknown>> {
    name: string;
    rules?: RegisterOptions;
    inputProps?: React.InputHTMLAttributes<HTMLInputElement>
    action?: FormInputAction;
    label?: string;
}

/**
 * @member onClick              Callback when action button is clicked
 * @member icon                 Icon element to be displayed within action
 */
type FormInputAction = {
    onClick: (...args: any) => any | ((...args: any) => Promise<any>);
    icon: ReactNode;
}