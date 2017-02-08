import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpModule } from '@angular/http';

import { AppComponent }  from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { WelcomeModule } from './home/welcome.module';
import { ProductModule } from './products/product.module';

@NgModule({
  imports: [ 
    BrowserModule,
    HttpModule,
    WelcomeModule,
    ProductModule,
    AppRoutingModule
  ],
  declarations: [ 
    AppComponent    
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
