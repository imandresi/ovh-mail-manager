import { throwError } from "rxjs";

function handleApiError(error: any) {
    if (error.error) {
        return throwError(() => error.error);
    }
    return throwError(() => new Error('An unexpected error occured'));
}

export {
    handleApiError
}