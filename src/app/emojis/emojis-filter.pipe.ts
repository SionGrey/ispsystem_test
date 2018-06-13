import {Pipe, PipeTransform} from '@angular/core';
import {IEmojis} from './IEmojis';

@Pipe ({
  name: 'emojisFilter',
})

export class EmojisFilterPipe implements PipeTransform {
  transform(value: IEmojis[], filterBy: string): IEmojis[] {
    filterBy = filterBy ? filterBy = filterBy.toLocaleLowerCase() : null;
    return filterBy ? value.filter ((emoji: IEmojis) =>
      emoji.name.toLocaleLowerCase().indexOf(filterBy) !== -1 ) : value;
  }
}
