import {RegxConst} from '@core/constant/RegxConst';

export class ValidateUtil {


  static isValidMail(email: string) {
    return RegxConst.EMAIL_REGEX.test(email);
  }
}
