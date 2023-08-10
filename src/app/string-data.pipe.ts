import { Pipe, PipeTransform } from '@angular/core';
import { StringDataService } from './string-data.service';

@Pipe({
  name: 'stringData'
})
export class StringDataPipe implements PipeTransform {

  constructor(private stringService: StringDataService) {}

  transform(key: string): string {
    return this.stringService.getString(key);
  }

}
