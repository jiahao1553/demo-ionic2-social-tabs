import { Component,/* ViewChild*/ } from '@angular/core';

import { HomePage } from '../home/home';
import { SearchPage } from '../search/search';
import { PostPage } from '../post/post';
import { AccountPage } from '../account/account';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  // @ViewChild('tabsBar') tabRef;
  tab1Root: any = HomePage;
  tab2Root: any = SearchPage;
  tab3Root: any = PostPage;
  tab4Root: any = AccountPage;

  constructor() {
    // this.tabRef.select(0);
  }
}
