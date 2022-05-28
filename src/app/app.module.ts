import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { EditBookComponent } from './components/edit-book/edit-book.component';
import { BookListComponent } from './components/book-list/book-list.component';
import { AngularMaterialModule } from './material/material.module';
import { AngularFireModule } from '@Angular/fire/compat';
import { AngularFireDatabaseModule } from '@Angular/fire/compat/database';
import { environment } from '../environments/environment';
import { BookService } from './shared/book.service';

@NgModule({
  declarations: [
    AppComponent,
    AddBookComponent,
    EditBookComponent,
    BookListComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularMaterialModule,
    BrowserAnimationsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
  ],
  providers: [BookService],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
