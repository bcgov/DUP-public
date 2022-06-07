import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';

const encode = encodeURIComponent;
window['encodeURIComponent'] = (component: string) => {
  return encode(component).replace(/[!'()*]/g, (c) => {
    // Also encode !, ', (, ), and *
    return '%' + c.charCodeAt(0).toString(16);
  });
};

@Injectable()
export class Utils {
  constructor() { }

  public encodeString(filename: string, isUrl: boolean): any {
    let safeName;
    if (isUrl) {
      safeName = encode(filename)
        .replace(/\(/g, '%28')
        .replace(/\)/g, '%29')
        .replace(/\\/g, '_')
        .replace(/\//g, '_')
        .replace(/\%2F/g, '_')
        .replace(/ /g, '_');
      return safeName;
    } else {
      safeName = filename.replace(/\(/g, '%28').replace(/\)/g, '%29').replace(/\\/g, '_').replace(/\//g, '_');
      return safeName;
    }

  }

  // converts JS Date (UTC) to time zone offset NGBDate (America/Vancouver if no time zone provided)
  public convertJSDateToZonedNGBDate(jSDate: any, timeZone = 'America/Vancouver'): any {
    if (!jSDate) {
      return null;
    }
    const options = { zone: timeZone };
    const dateTime = DateTime.fromJSDate(new Date(jSDate), options);
    return {
      year: dateTime.get('year'),
      month: dateTime.get('month'),
      day: dateTime.get('day'),
    };
  }

  public convertJSDateToNGBDate(jSDate: Date): any {
    if (!jSDate) {
      return null;
    }
    return {
      year: jSDate.getFullYear(),
      month: jSDate.getMonth() + 1,
      day: jSDate.getDate()
    };
  }

  public convertJSDateToString(jSDate: Date): any {
    if (!jSDate) {
      return null;
    }

    return `${jSDate.getFullYear()}-${jSDate.getMonth() + 1}-${jSDate.getDate()}`;
  }

  public convertFormGroupNGBDateToJSDate(nGBDate, nGBTime = null): any {
    if (!nGBDate) {
      return null;
    }

    if (nGBTime === null) {
      return new Date(nGBDate.year, nGBDate.month - 1, nGBDate.day);
    } else {
      return new Date(nGBDate.year, nGBDate.month - 1, nGBDate.day, nGBTime.hour, nGBTime.minute);
    }
  }
}
