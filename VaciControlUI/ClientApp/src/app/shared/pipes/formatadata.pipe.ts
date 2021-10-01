import { Pipe, PipeTransform } from '@angular/core';
import * as moment from 'moment';

@Pipe({
  name: 'formatadata'
})
export class FormatadataPipe implements PipeTransform {

  transform(data: Date): any {
    if(data == null)
      return null;

  return moment(data, 'YYYY-MM-DDTHH:mm:ss').format('DD/MM/YYYY');
  }

}
