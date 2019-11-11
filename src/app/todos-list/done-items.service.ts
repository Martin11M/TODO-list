import { Injectable } from "@angular/core";
import { item } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root',
})export class DoneItemsService {

  doneItems: item[];

  constructor() {
    this.doneItems = this.getDoneItems();
  }

  getDoneItems() {
    let items = JSON.parse(localStorage.getItem('doneItems'))
    return items === null ? [] : items;
  }

  saveDoneItems(doneItems: item[]) {
    localStorage.setItem('doneItems', JSON.stringify(doneItems));
  }

  addDoneItems(i: item) {
    this.doneItems.push(i);
    this.saveDoneItems(this.doneItems);
  }

}