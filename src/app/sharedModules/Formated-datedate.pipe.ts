import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment-timezone';
import { environment } from '../../environments/environment';

@Pipe({name: 'formatedDate'})
export class FormatedDatePipe implements PipeTransform {
  transform(value: string, args: string[]): any {
    return moment(value).isValid() ?  moment(value).format(environment.defaultDateFormat) : 'invalid date';
  }
}
