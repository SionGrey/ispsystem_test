import {Component, OnDestroy} from '@angular/core';
import {IEmojis} from './IEmojis';
import {EmojisService} from './emojis.service';
import {FlagFilterPipe} from './flag-filter.pipe';

@Component({
  selector: 'em-favored-list',
  moduleId: module.id,
  templateUrl: 'favored-list.component.html',
})

export class FavoredListComponent {
  pageTitle: string = 'Любимые';
  imageWidth: number = 25;
  listFilter: string;
  emojis: IEmojis[] = [];
  emojisFiltered: IEmojis[] = [];

  constructor(private  _emojisService: EmojisService ) {
    if (this._emojisService.emojiListRead.length > 0) {
      this.emojis = this._emojisService.emojiListRead;
      this.flagFilter();
    }else {
      this._emojisService.getEmojis().subscribe(() => {
        this.emojis = this._emojisService.emojiListRead;
        this.flagFilter();
      });
    }
  }

  flagFilter(): void {
    this.emojisFiltered = new FlagFilterPipe().transform(this.emojis, 'isFavored', true);
  }

  emRemove(elem): void {
    this._emojisService.emojiListWrite.splice(this._emojisService.emojiListWrite.indexOf(elem), 1);
    elem.isFavored = false;
    this.flagFilter();
    this.writeItems();
  }
  writeItems (): void {
    localStorage.setItem('emojisSaved', JSON.stringify(this._emojisService.emojiListWrite));
  }
}
