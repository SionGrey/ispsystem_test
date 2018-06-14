import {Component, OnDestroy} from '@angular/core';
import {IEmojis} from './IEmojis';
import {EmojisService} from './emojis.service';
import {FlagFilterPipe} from './flag-filter.pipe';

@Component({
  selector: 'em-emoji-list',
  moduleId: module.id,
  templateUrl: 'emojis-list.component.html',
})

export class EmojisListComponent {
  pageTitle: string = 'Все';
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
    this.emojisFiltered = new FlagFilterPipe().transform(this.emojis, 'isDeleted', false);
  }

  emLike(elem): void {
    this._emojisService.emojiListWrite.push(elem);
    elem.isFavored = true;
    this.writeItems();
  }
  emDelete(elem): void {
    this._emojisService.emojiListWrite.push(elem);
    elem.isDeleted = true;
    elem.isFavored = false;
    this.flagFilter();
    this.writeItems();
  }
  writeItems (): void {
    localStorage.setItem('emojisSaved', JSON.stringify(this._emojisService.emojiListWrite));
  }
}
