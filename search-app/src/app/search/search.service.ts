import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import {debounceTime, switchMap} from "rxjs/operators";
@Injectable({
  providedIn: 'root'
})
export class SearchService {
  constructor() {

  }

  searchForResults(value: Observable<any>) {
    return value.pipe(
      debounceTime(400),
      switchMap((term) => of(this.filterResult(term)))
    )
  }

  filterResult(term) {
    if (term.order) {
      term.items = term.items.sort((a, b) => {
        if (term.order === 'a') {
          if (a.name > b.name) {
            return 1
          } else if ((a.name < b.name)) {
            return -1;
          } else {
            return 0;
          }
        } else if (term.order === 'b') {
          if (a.name > b.name) {
            return -1
          } else if ((a.name < b.name)) {
            return 1;
          } else {
            return 0;
          }
        }
      });
    }
    if (term.type && term.type !== 'all') {
      return term.items.filter(el => el.name.toLowerCase().includes(term.string) && el.category === term.type)
    } else {
      return term.items.filter(el => el.name.toLowerCase().includes(term.string))
    }
  }

}
