import { AbstractControl } from '@angular/forms';
import { NameCheckService } from '../services/name-check.service';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export function nameExistsValidator(service: NameCheckService) {
  return (control: AbstractControl) => {
    if (!control.value) return of(null);
    return service.checkNameExists(control.value).pipe(
      map((exists) => (exists ? { nameExists: true } : null)),
      catchError(() => of(null))
    );
  };
}
