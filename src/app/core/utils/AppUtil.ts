import * as Bowser from 'bowser';

export class AppUtil {
  static getArabicNumber(englishNumber) {
    const arabicNumbers = {
      1: '١',
      2: '٢',
      3: '٣',
      4: '٤',
      5: '٥',
      6: '٦',
      7: '٧',
      8: '٨',
      9: '٩',
      0: '٠',
    };

    const numbers = englishNumber.toString().split('');
    let arabicNumber = '';
    for (const num of numbers) {
      arabicNumber += arabicNumbers[num];
    }
    return arabicNumber;
  }

  static formatDecimal(percentage: number, fractionDigits: number = 2) {
    return parseFloat(percentage.toFixed(fractionDigits));
  }

  static async copyToClipBoard(text: string) {
    return new Promise((resolve, reject) => {
      if (typeof navigator.clipboard == 'undefined') {
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        try {
          const successful = document.execCommand('copy');
          document.body.removeChild(textArea);
          resolve();
        } catch (err) {
          document.body.removeChild(textArea);
          reject(err);
        }
      } else {
        navigator.clipboard.writeText(text).then(
          () => {
            resolve();
          },
          (err) => {
            reject(err);
          }
        );
      }
    });
  }

  static getBrowserInfo(): any {
    const browser = Bowser.getParser(window.navigator.userAgent);
    return browser.getBrowser();
  }
  static getUserAgent(): any {
    const browser = Bowser.getParser(window.navigator.userAgent);
    return browser.getResult();
  }

  static randomId(length: number = 10): string {
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let name = '';

    for (let i = 0; i < 10; i++) {
      name += chars.charAt(Math.floor(Math.random() * chars.length));
    }

    return name;
  }
}
