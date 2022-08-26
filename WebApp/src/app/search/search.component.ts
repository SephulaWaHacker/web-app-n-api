import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { HttpClientService } from '../shared/http-client.service';
import { SearchResponse } from '../shared/search-response';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent {
  results: SearchResponse;
  searchRequestSubscriptions: Subscription[] = [];
  iterator: string;

  constructor(public httpClient: HttpClientService, public modal: MatDialog) { }

  onTextChange(changedText: string) {
    this.cancelPendingRequests();

    const listsSubscription = this.httpClient.search(changedText)
          .subscribe(
            (response) => {
              this.results = changedText == '' ? null : response;
            },
            (errorResponse) => {
              alert('Error ocured while fetching data');
              console.error(errorResponse);
            }
          );

    this.searchRequestSubscriptions.push(listsSubscription);
  }

  showModal(films, starships, vehicles, species){
    this.modal.open(DialogComponent, {
      data: {
        films, starships, vehicles, species
      }
    })
  }

  cancelPendingRequests() {
    this.searchRequestSubscriptions.forEach((sub) => sub.unsubscribe());
  }

}
