import {AbstractControl, ValidationErrors} from '@angular/forms';
import {RegxConst} from '@core/constant/RegxConst';

export class GenericValidators {
  /**
   * Check for only arabic characters
   * @param control AbstractControl
   */
  static arabic(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if(value){
      return RegxConst.ARABIC_CHARS_REGEX.test(value ?? '') ? null : {arabic: true};

    } else{
      return null;
    }
  }

  /**
   * Check for only english characters
   * @param control AbstractControl
   */
  static english(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    if(value){
      return RegxConst.ENGLISH_CHARS_REGEX.test(value ?? '') ? null : {english: true};


    }else{
      return null;
    }
  }
}
