import { Component, OnInit } from '@angular/core';
import {SearchService} from "./search.service";
import {Subject} from 'rxjs';
import * as items from '../search-items';
@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {
  searchResults: any;
  inputValue: string;
  filterType = [
    'all',
    'image',
    'video',
    'documents',
    'audio'
  ];
  private search = new Subject<any>();
  public holder = {
    string: '',
    type: 'all',
    order: '',
    items: [...items.searchList]
  };
  constructor(private searchService: SearchService) {
    this.searchService.searchForResults(this.search).subscribe(results => {
      this.searchResults = results;
    });
  }

  ngOnInit() {
    this.search.next(this.holder);
  }

  searchForResults(value) {
    this.holder.string = value;
    this.search.next(this.holder);
  }

  filterItems(type) {
    this.holder.type = type;
    this.search.next(this.holder);
  }

  clear() {
    this.holder = {
      string: '',
      type: '',
      order: '',
      items: [...items.searchList]
    };
    this.inputValue = null;
    this.search.next(this.holder);
  }

  order(type) {
    this.holder.order = type;
    this.search.next(this.holder);
  }
}
