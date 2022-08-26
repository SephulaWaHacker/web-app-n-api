import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { TabsComponent } from './tabs/tabs.component';
import { TabComponent } from './tab/tab.component';
import {MatCardModule} from '@angular/material/card';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import {MatDividerModule} from '@angular/material/divider';
import {MatGridListModule} from '@angular/material/grid-list';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PeoplePageComponent } from './people-page/people-page.component';
import { DialogComponent } from './dialog/dialog.component';
import { CatagoriesComponent } from './catagories/catagories.component';
import { CatagoryComponent } from './catagory/catagory.component';
import { SearchComponent } from './search/search.component';
import { InputFieldComponent } from './input-field/input-field.component';


@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    TabComponent,
    PeoplePageComponent,
    DialogComponent,
    CatagoriesComponent,
    CatagoryComponent,
    SearchComponent,
    InputFieldComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MatCardModule,
    MatDialogModule,
    MatDividerModule,
    BrowserAnimationsModule,
    MatGridListModule
  ],
  providers: [{provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: false}}],
  bootstrap: [AppComponent]
})
export class AppModule { }
