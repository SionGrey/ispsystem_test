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
  private _emojisUrl = 'https://api.github.com/emojis?access_token=d7223f5526426edcf604c21eb3b27c2fbd947ce7';
  emojiListRead: EmojisModel[] = [];
  emojiListWrite: EmojisModel[] = [];

  constructor (private _http: Http) {}

  getEmojis(): Observable<EmojisModel[]> {
    return this._http.get(this._emojisUrl).map((response: Response) => {
      const emojis = response.json();
      if (localStorage.emojisSaved) {
        this.emojiListRead = JSON.parse(localStorage.getItem('emojisSaved'));
        this.emojiListWrite = JSON.parse(localStorage.getItem('emojisSaved'));
      }
      for (const [key, value] of Object.entries(emojis)) {
        const emoji: IEmojis = new EmojisModel(`${key}`, `${value}`);
        const exist = this.emojiListRead.some((item) => item.name === key);
        if (!exist) {
          this.emojiListRead.push(emoji);
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
