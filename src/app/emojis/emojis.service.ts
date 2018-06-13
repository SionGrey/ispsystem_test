import {Injectable} from '@angular/core';
import {IEmojis} from './IEmojis';
import {Http, Response} from '@angular/http';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/catch';
import {Observable} from 'rxjs/Observable';
import {EmojisModel} from './emojis.model';

@Injectable()
export class EmojisService {
  private _qemojisUrl = './api/emojis/emojis.json';
  private _emojisUrl = 'https://api.github.com/emojis';
  emojiListRead: EmojisModel[] = [];
  emojiListWrite: EmojisModel[] = [];

  constructor (private _http: Http) {}

  getEmojis(): Observable<EmojisModel[]> {
    return this._http.get(this._emojisUrl).map((response: Response) => {
      const emojis = response.json();
      let tempEmojis: EmojisModel[] = [];
      if (localStorage.emojisSaved) {
        tempEmojis = JSON.parse(localStorage.getItem('emojisSaved'));
      }
      for (const [key, value] of Object.entries(emojis)) {
        const emoji: IEmojis = new EmojisModel(`${key}`, `${value}`);
        const index = this.emojiListRead.indexOf(emoji);
        if (index === -1) {
          this.emojiListRead.push(emoji);
        } else {
          this.emojiListRead.push(tempEmojis[index]);
          tempEmojis.splice(index, 1);
        }
      }
    })
    .catch(this.handleError);
  }
  private  handleError(error: Response) {
    console.error(error);
    return Observable.throw(error.json().error || 'Server error');
  }
}
