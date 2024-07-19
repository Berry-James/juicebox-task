export type SubmitServerFormPayload = {
    success: boolean;
    error?: string;
    validationErrors?: SubmitServerFormValidationErrors;
    message?: string;
}

export type SubmitServerFormValidationErrors = Record<PropertyKey, { message: string }>