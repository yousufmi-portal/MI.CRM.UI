import { FormControl } from '@angular/forms';

/**
 * Utility type that maps a plain model to a FormControl-based form structure.
 * Example: FormControls<LoginData> will be { email: FormControl<string>, password: FormControl<string> }
 */
export type FormControls<T> = {
    [K in keyof T]: FormControl<T[K]>;
};
