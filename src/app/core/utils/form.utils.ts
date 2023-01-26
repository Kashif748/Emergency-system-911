import { FormArray, FormControl, FormGroup } from '@angular/forms';

export class FormUtils {
  static ForEach(
    form: FormGroup | FormArray | FormControl,
    fn: (fc: FormControl) => void
  ) {
    if (form instanceof FormGroup) {
      this.ForEachInGroup(form, fn);
    } else if (form instanceof FormArray) {
      this.ForEachInArray(form, fn);
    } else {
      fn(form);
    }
  }

  static ForEachInGroup(formGroup: FormGroup, fn: (fc: FormControl) => void) {
    Object.keys(formGroup.controls).forEach((key) => {
      const control = formGroup?.get(key);
      if (control instanceof FormGroup) {
        this.ForEachInGroup(control, fn);
      } else if (control instanceof FormArray) {
        this.ForEachInArray(control, fn);
      } else {
        fn(control as FormControl);
      }
    });
  }

  static ForEachInArray(formArray: FormArray, fn: (fc: FormControl) => void) {
    formArray.controls.forEach((control) => {
      if (control instanceof FormGroup) {
        this.ForEachInGroup(control, fn);
      } else if (control instanceof FormArray) {
        this.ForEachInArray(control, fn);
      } else {
        fn(control as FormControl);
      }
    });
  }
}
