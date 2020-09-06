import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpeechRecognition } from '@ionic-native/speech-recognition/ngx';
import {AppServiceService} from './app-service.service';
import {HttpClientModule} from '@angular/common/http';
import { AppPreferences } from '@ionic-native/app-preferences/ngx';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    StatusBar,
    IonicModule,
    SplashScreen,
    AppServiceService,
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SpeechRecognition,
    AppPreferences
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
