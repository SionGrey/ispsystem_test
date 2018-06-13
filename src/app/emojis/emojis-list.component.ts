import {Component, OnDestroy} from '@angular/core';
import {IEmojis} from './IEmojis';
import {EmojisService} from './emojis.service';

@Component({
  selector: 'em-emoji-list',
  moduleId: module.id,
  templateUrl: 'emojis-list.component.html',
})

export class EmojisListComponent implements OnDestroy {
  pageTitle: string = 'Все';
  imageWidth: number = 25;
  listFilter: string;
  errorMessage: string;
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

  emLike(elem): void {
    elem.isFavored = true;
    this._emojisService.emojiListWrite.push(elem);
  }
  emDelete(elem): void {
    elem.isDeleted = true;
    elem.isFavored = false;
    this._emojisService.emojiListWrite.push(elem);
  }
  ngOnDestroy (): void {
    localStorage.setItem('emojisSaved', JSON.stringify(this._emojisService.emojiListWrite));
  }
}
