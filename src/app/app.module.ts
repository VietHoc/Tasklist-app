import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import {
  RouterModule,
  Routes
} from '@angular/router';
import {
  APP_BASE_HREF,
  LocationStrategy,
  HashLocationStrategy
} from '@angular/common';

import { AppComponent } from './app.component';
import { TasksComponent } from './components/tasks/tasks.component';
import { ListsComponent } from './components/lists/lists.component';

const routes: Routes = [
    { path: '', redirectTo: '/lists', pathMatch: 'full'},
    { path: 'lists',    component: ListsComponent },
    { path: 'lists/:id', component: TasksComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    ListsComponent,
    TasksComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy },
    { provide: APP_BASE_HREF, useValue: '/' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }