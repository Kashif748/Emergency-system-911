export class TextUtils {
  public static readonly OBFUSCATE_TEXT = '******';
  public static readonly OBFUSCATE_I18N_NAME = {
    nameAr: TextUtils.OBFUSCATE_TEXT,
    nameEn: TextUtils.OBFUSCATE_TEXT,
  };

  public static IsEmptyOrWhiteSpaces(str) {
    return typeof str === 'string' && (str?.match(/^\s*$/) || [])?.length > 0;
  }
}
