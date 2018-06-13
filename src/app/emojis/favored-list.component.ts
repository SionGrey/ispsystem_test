import {Component, OnDestroy} from '@angular/core';
import {IEmojis} from './IEmojis';
import {EmojisService} from './emojis.service';

@Component({
  selector: 'em-favored-list',
  moduleId: module.id,
  templateUrl: 'favored-list.component.html',
})

export class FavoredListComponent implements OnDestroy {
  pageTitle: string = 'Любимые';
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

  emRemove(elem): void {
    elem.isFavored = false;
    this._emojisService.emojiListWrite.splice(this._emojisService.emojiListWrite.indexOf(elem), 1);
  }
  ngOnDestroy (): void {
    localStorage.setItem('emojisSaved', JSON.stringify(this._emojisService.emojiListWrite));
  }
}
