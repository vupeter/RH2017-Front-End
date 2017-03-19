import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LocationTracker } from '../providers/location-tracker';
import { DateSelectPage } from '../pages/date-select/date-select';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    DateSelectPage
  ],
  imports: [
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    DateSelectPage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler},LocationTracker]
})
export class AppModule {}
