import { Component } from '@angular/core';
import {EmojisService} from './emojis/emojis.service';

@Component({
  selector: 'em-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [EmojisService],
})
export class AppComponent {
  title = 'Emojis';
}
