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
import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

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
    PerfectScrollbarModule,
    RouterModule.forRoot([
      { path: 'emojis', component: EmojisListComponent },
      { path: 'deleted', component: DeletedListComponent },
      { path: 'favored', component: FavoredListComponent },
      {path: '', redirectTo: 'emojis', pathMatch: 'full'},
      {path: '**', redirectTo: 'emojis', pathMatch: 'full'},
    ], )
  ],
  providers: [{
    provide: PERFECT_SCROLLBAR_CONFIG,
    useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
