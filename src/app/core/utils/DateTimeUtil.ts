import * as moment from 'moment';
import Diff = moment.unitOfTime.Diff;

export class DateTimeUtil {
  static isDateElapsed(date: any, dateToCompareWith: any = null) {
    if (dateToCompareWith) {
      return moment(dateToCompareWith).isBefore(date);
    }
    const now = moment();
    return moment(date).isBefore(now);
  }

  static getDiffBetweenDates(
    date: any,
    dateToCompare: any = moment(),
    unitOfTime: Diff = 'days'
  ) {
    const firstMomentDate = moment(date);
    const secondMomentDate = dateToCompare ? moment(dateToCompare) : moment();
    return firstMomentDate.diff(secondMomentDate, unitOfTime);
  }

  static format(date: any, format: string = 'YYYY-MM-DD HH:mm a') {
    return moment(date).format(format);
  }

  static getDateInUTCFormat(date: any) {
    return new Date(date).toUTCString();
  }

  static getDateInEmiratesFormat(date: any) {
    return DateTimeUtil.getDateInGMTFormat(date);
  }

  static getUtcFromIncorrectUtC(date: any) {
    const offset = new Date().getTimezoneOffset();
    const offsetH = offset / 60;
    const ddate = new Date(date);
    ddate.setHours(ddate.getHours() + offsetH);
    return ddate;
  }

  // +400 means emirates diff time from utc.
  static getDateInGMTFormat(date: any, gmtDiffFromUTC = '+0400') {
    return new Date(`${date} GMT${gmtDiffFromUTC}`);
  }

  static getTodayDateFormatted(format = 'YYYY-MM-DD') {
    return moment().format(format);
  }

  static getTodayDate() {
    return moment().toDate();
  }

  static getFirstDayOfCurrentMonthFormatted(format = 'YYYY-MM-DD') {
    return moment().startOf('month').format(format);
  }

  static getFirstDayOfCurrentMonth() {
    return moment().startOf('month').toDate();
  }


  static isFirstDateBeforeSecond(firstDate: any, secondDate: any) {
    const momentFirstDate = moment(firstDate);
    const momentSecondDate = moment(secondDate);
    return momentFirstDate.isBefore(momentSecondDate);
  }

  static isFirstDateAfterSecond(firstDate: any, secondDate: any) {
    const momentFirstDate = moment(firstDate);
    const momentSecondDate = moment(secondDate);
    return momentFirstDate.isAfter(momentSecondDate);
  }

}
