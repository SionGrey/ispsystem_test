import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import {EmojisListComponent} from './emojis/emojis-list.component';
import {FormsModule} from '@angular/forms';
import {EmojisFilterPipe} from './emojis/emojis-filter.pipe';
import {HttpModule} from '@angular/http';
import {RouterModule} from '@angular/router';
import {DeletedListComponent} from './emojis/deleted-list.component';
import {FavoredListComponent} from './emojis/favored-list.component';
import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    EmojisListComponent,
    EmojisFilterPipe,
    DeletedListComponent,
    FavoredListComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    NgxPaginationModule,
    RouterModule.forRoot([
      { path: 'emojis', component: EmojisListComponent },
      { path: 'deleted', component: DeletedListComponent },
      { path: 'favored', component: FavoredListComponent },
      {path: '', redirectTo: 'emojis', pathMatch: 'full'},
      {path: '**', redirectTo: 'emojis', pathMatch: 'full'},
    ], )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
