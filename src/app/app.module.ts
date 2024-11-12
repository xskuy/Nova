import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { initializeApp } from 'firebase/app';
import { environment } from '../environments/environment';
import { AppComponent } from './app.component';

// Inicializar Firebase
const app = initializeApp(environment.firebaseConfig);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    // ... otros imports
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { } 