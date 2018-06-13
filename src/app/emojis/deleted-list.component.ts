import {Component, OnDestroy} from '@angular/core';
import {IEmojis} from './IEmojis';
import {EmojisService} from './emojis.service';

@Component({
  selector: 'em-deleted-list',
  moduleId: module.id,
  templateUrl: 'deleted-list.component.html',
})

export class DeletedListComponent implements OnDestroy {
  pageTitle: string = 'List of Deleted Emoji';
  imageWidth: number = 25;
  listFilter: string;
  emojis: IEmojis[] = [];

  constructor(private  _emojisService: EmojisService ) {
    if (this._emojisService.emojiListRead.length > 0) {
      this.emojis = this._emojisService.emojiListRead;
    }else {
      this._emojisService.getEmojis().subscribe(() => {
        this.emojis = this._emojisService.emojiListRead;
      });
    }
  }

  emRestore(elem): void {
    elem.isDeleted = false;
    this._emojisService.emojiListWrite.splice(this._emojisService.emojiListWrite.indexOf(elem), 1);
    console.log('restored!');
  }
  ngOnDestroy (): void {
    localStorage.setItem('emojisSaved', JSON.stringify(this._emojisService.emojiListWrite));
  }
}
