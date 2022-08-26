import { Component, ContentChildren, QueryList} from '@angular/core';
import { TabComponent } from '../tab/tab.component';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent {
  @ContentChildren(TabComponent) tabs: QueryList<TabComponent>;

  ngAfterContentInit() {
    let activeTabs = this.tabs.filter(tab => tab.active);
    if(!activeTabs.length) {
      this.activateTab(this.tabs.first);
    }
  }
  
  activateTab(tab: TabComponent){
    this.tabs.toArray().forEach(item => item.active = false);
    tab.active = true;
  }

}
