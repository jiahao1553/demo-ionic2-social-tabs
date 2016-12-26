import { NgModule, ErrorHandler } from '@angular/core';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { PostPage } from '../pages/post/post';
import { SearchPage } from '../pages/search/search';
import { AccountPage } from '../pages/account/account';
import { TabsPage } from '../pages/tabs/tabs';
import { LoginPage } from '../pages/login/login';
import { ListingPage } from '../pages/listing/listing';
import { Shared } from '../providers/shared';
import { RestService } from '../providers/rest-service';
import { CalculatePage } from '../pages/calculate/calculate';
import { ReviewPage } from '../pages/review/review';
import { SuggestionPage } from '../pages/suggestion/suggestion';
import { ActionPage } from '../pages/action/action';
import { WelcomePage } from '../pages/welcome/welcome';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    PostPage,
    SearchPage,
    AccountPage,
    TabsPage,
    LoginPage,
    CalculatePage,
    ReviewPage,
    SuggestionPage,
    ActionPage,
    ListingPage,
    WelcomePage
  ],
  imports: [
    IonicModule.forRoot(MyApp, {
tabsPlacement: 'top',
  platforms: {
    android: {
      tabsPlacement: 'bottom'
    },
    ios: {
      tabsPlacement: 'bottom'
    },
    windows:
    {
      tabsPlacement: 'top'
    }
  }
})
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    PostPage,
    SearchPage,
    HomePage,
    AccountPage,
    TabsPage,
    LoginPage,
    CalculatePage,
    ReviewPage,
    SuggestionPage,
    ActionPage,
    ListingPage,
    WelcomePage
  ],
  providers: [{provide: ErrorHandler, useClass: IonicErrorHandler}, Shared, RestService]
})
export class AppModule {}
