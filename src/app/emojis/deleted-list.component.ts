import {Component, OnDestroy} from '@angular/core';
import {IEmojis} from './IEmojis';
import {EmojisService} from './emojis.service';
import {FlagFilterPipe} from './flag-filter.pipe';

@Component({
  selector: 'em-deleted-list',
  moduleId: module.id,
  templateUrl: 'deleted-list.component.html',
})

export class DeletedListComponent {
  pageTitle: string = 'Удалённые';
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
    this.emojisFiltered = new FlagFilterPipe().transform(this.emojis, 'isDeleted', true);
  }

  emRestore(elem): void {
    this._emojisService.emojiListWrite.splice(this._emojisService.emojiListWrite.indexOf(elem), 1);
    elem.isDeleted = false;
    this.flagFilter();
    this.writeItems();
  }
  writeItems (): void {
    localStorage.setItem('emojisSaved', JSON.stringify(this._emojisService.emojiListWrite));
  }
}
