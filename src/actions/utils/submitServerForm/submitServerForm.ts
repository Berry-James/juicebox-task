'use server';
import { AnyObject, ObjectSchema, ValidationError } from "yup";
import { SubmitServerFormPayload } from "./submitServerForm.types";

export async function submitServerForm(
    prevState: SubmitServerFormPayload,
    formData: FormData, 
    schema: ObjectSchema<AnyObject>,
) {

    await new Promise((resolve) => setTimeout(resolve, 500));

    // Construct generic payload to return
    const payload: SubmitServerFormPayload = {
        success: true,
    }

    try {

        if(
            !formData || 
            !(formData instanceof FormData)
        ) {
            throw new Error('No Form Data')
        }

        // Convert formdata to object
        const formObject = Object.fromEntries(formData);

        // If we have a schema, validate against it
        if(schema) {
            try {
                // Validate formObject against our schema
                // If successful, carry on
                // If error, transform the error from Yup and return it
                await schema.validate(formObject, { abortEarly: false });
            } catch (err) {

                payload.validationErrors = {};
                payload.success = false;

                // Loop through errors and format for return
                (err as ValidationError).inner.forEach(innerError => {

                    // If no path found, impossible to determine where validation error should sit, so we return
                    if(!innerError.path) {
                        return
                    } 

                    // Otherwise, append validation error to our payload
                    payload.validationErrors![innerError.path] = {
                        message: innerError.message
                    }
                });
            }

        }

    } catch (err) {
        payload.error = (err as Error)?.message
        payload.success = false;
    }

    return payload;
    
}