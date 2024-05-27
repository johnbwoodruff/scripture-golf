import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const booksValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const bom = control.get('BOM');
  const dc = control.get('DC');
  const pgp = control.get('PGP');
  const ot = control.get('OT');
  const nt = control.get('NT');

  return !bom?.value && !dc?.value && !pgp?.value && !ot?.value && !nt?.value
    ? { noBooks: true }
    : null;
};
