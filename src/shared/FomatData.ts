
import { isNullOrUndefined } from '@/shared/utilities';
import DateTimeFormat from '@/constants/DateTimeFormat';
import moment from 'moment';
const FormatData = {

  displayDate(value: any) {
    return isNullOrUndefined(value)
      ? ''
      : moment(String(value)).format(DateTimeFormat.DATE_DISPLAY);
  },

  displayDateTime(value: any) {
    return isNullOrUndefined(value)
      ? ''
      : moment(String(value)).format(DateTimeFormat.DATE_YYYYMMDDHHmm);
  },

  formatTelphone(data: any) {
    if (isNullOrUndefined(data)) {
      return '';
    }

    if (data.length === 8) {
      return (data.replace(
        /(\d{2})(\d{4})(\d{2})/,
        '$1-$2-$3',
      ));
    }
    if (data.length === 9) {
      return (data.replace(
        /(\d{2})(\d{4})(\d{3})/,
        '$1-$2-$3',
      ));
    }
    if (data.length === 10) {
      return (data.replace(
        /(\d{2})(\d{4})(\d{4})/,
        '$1-$2-$3',
      ));
    }
    return (data.replace(
      /(\d{3})(\d{4})(\d{4})/,
      '$1-$2-$3',
    ));
  },

  formatObjectSelection(data: any) {
    return data.map(({ data1, key2 }: any) => {
      return { text: data1, value: key2 };
    });
  },

  displayAddress(item: any) {
    return (!isNullOrUndefined(item.address1) ? item.address1 : '')
      + (!isNullOrUndefined(item.address2) ? item.address2 : '')
      + (!isNullOrUndefined(item.address3) ? item.address3 : '')
      + (!isNullOrUndefined(item.address4) ? item.address4 : '');
  },
};

export default FormatData;
