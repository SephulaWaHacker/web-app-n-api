import { Component, OnInit } from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { HttpClientService } from '../shared/http-client.service'
import { People } from '../shared/people'
import { Person } from '../shared/person';

@Component({
  selector: 'app-people-page',
  templateUrl: './people-page.component.html',
  styleUrls: ['./people-page.component.css']
})
export class PeoplePageComponent implements OnInit {

  peopleList: Person[];
  isLoading: boolean;

  constructor(public httpClient: HttpClientService, public modal: MatDialog) { }

  ngOnInit(): void {
    this.loadPeople();
  }

  showModal(films, starships, vehicles, species){
    this.modal.open(DialogComponent, {
      data: {
        films, starships, vehicles, species
      }
    })
  }

  loadPeople() {
    return this.httpClient.getPeople().subscribe((data: People) => {
      this.peopleList = data.results;
    })
  }

}
