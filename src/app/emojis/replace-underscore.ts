import {Pipe, PipeTransform} from '@angular/core';


@Pipe({
  name : 'replaceUnderscore',
})

export class ReplaceUnderscore implements PipeTransform {
  transform(value) {
    return value.replace(/_/g, ' ');
  }
}
