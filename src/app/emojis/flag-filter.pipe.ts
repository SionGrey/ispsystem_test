import { Injectable, Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'flag'
})

@Injectable()
export class FlagFilterPipe implements PipeTransform {
  transform(items: any[], flag: string, value: boolean): any[] {
    if (!items) {
      return [];
    }
    return items.filter(it => it[flag] === value);
  }
}
