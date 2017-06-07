import { Injectable } from '@angular/core';
import { List } from '../models/list.model';
@Injectable()
export class ListsService {

  lists: List[] = [
    { id: 0, title: "Sunday 4/6"},
    { id: 1, title: "Monday 5/6"},
    { id: 2, title: "Tuesday 6/6"},
    { id: 3, title: "Wednesday 7/6"}, 
  ];

  lastId: number = this.lists.length - 1;

  constructor() { }

  // Simulate POST /lists
  addList(list: List): ListsService {
    if (!list.id) {
      list.id = ++this.lastId;
    }
    this.lists.push(list);
    return this;
  }

  // Simulate DELETE /lists/:id
  deleteListById(id: number): ListsService {
    this.lists = this.lists
      .filter(list => list.id !== id);
    return this;
  }

  getLists(): List[]{
    return this.lists;
  }

  editList(List: List, text: string){
    this.lists.find(list => list.id === List.id).title = text;
  }

  // Simulate PUT /lists/:id
  // updateListById(id: number, values: Object = {}): lists {
  //   let list = this.getlistById(id);
  //   if (!list) {
  //     return null;
  //   }
  //   Object.assign(list, values);
  //   return list;
  // }
}
