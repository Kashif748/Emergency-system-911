export class RegxConst {
  static readonly PHONE_REGEX = /(^\+971(?:2|3|4|6|7|9|50|51|52|54|55|56|58)[0-9]{7})|(^\+9719[0-9]{2})$/;
  static readonly EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  static readonly USER_NAME_REGEX = /^[a-zA-Z0-9]([.](?![.])|[a-zA-Z0-9]){3,29}[a-zA-Z0-9]$/;
  static readonly EMIRATES_ID_REGEX = /^\d{15}$/;
  static readonly PASSWORD_REGEX = /^(((?=.*[a-z])(?=.*[A-Z]))|((?=.*[a-z])(?=.*[0-9]))|((?=.*[A-Z])(?=.*[0-9])))(?=.{8,})./;
  static readonly ARABIC_CHARS_REGEX =  /^[\u0600-\u06FF0-9\s\#\$\%\&\(\)\_\-\/\\.;:,\[\]]*$/;
  static readonly ENGLISH_CHARS_REGEX = /^[a-zA-Z0-9\s\#\$\%\&\(\)\_\-\/\\.;:,\[\]]*$/;
  static NUMBER_ONLY_REGEX = /^\d+$/;
  static readonly URL = /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=]+$/;
}
