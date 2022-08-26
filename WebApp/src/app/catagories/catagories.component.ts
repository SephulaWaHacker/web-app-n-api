import { Component, OnInit } from '@angular/core';
import { HttpClientService } from '../shared/http-client.service'
import {MatDialog} from '@angular/material/dialog';
import { CatagoryComponent } from '../catagory/catagory.component';
import { Chuck } from '../shared/chuck';

@Component({
  selector: 'app-catagories',
  templateUrl: './catagories.component.html',
  styleUrls: ['./catagories.component.css']
})
export class CatagoriesComponent implements OnInit {
  categoryList: string[];
  chuckItem: Chuck;
  constructor(public httpClient: HttpClientService, public modal: MatDialog) { }

  ngOnInit(): void {
    this.loadCatagories();
  }
  loadCatagories() {
    return this.httpClient.getCategories().subscribe((data: string[]) => {
      this.categoryList = data;
    })
  }

  showCategory(catagory: string){
    this.httpClient.getCategory(catagory).subscribe((data: Chuck) => {
      this.chuckItem = data;
    })

    this.modal.open(CatagoryComponent, {
      data: {...this.chuckItem}
    })
  }
}
