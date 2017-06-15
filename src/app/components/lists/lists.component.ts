import { Component, OnInit, Output, EventEmitter, HostBinding } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { Router, CanDeactivate, RouterLink } from '@angular/router';

import { List } from "../../models/list.model";
import { ListsService } from '../../services/lists.service';

import * as Rx from 'rxjs/Rx';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switch';

import { Subject, Observable, BehaviorSubject } from "rxjs";
@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css'],
  providers: [ListsService]
})
export class ListsComponent implements OnInit {
  //search
  
  @Output() searching: EventEmitter<boolean> = new EventEmitter<boolean>();
  
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(null);
  results: any;
  header: string;

  newList: List = new List();
  form: FormGroup;
  formSearch: FormGroup;
  error: any;
  listEditing = -1;
  loading = true;
  lists : List[];

  constructor(
    private router: Router,
    private ListService: ListsService,
    fb: FormBuilder
    ) {
      this.formSearch = fb.group({
        search: []
      });
      this.form = fb.group({
        newListTitle: [ '', Validators.compose([ Validators.required ]) ]
      })
  }

  ngOnInit() {
    this.getList();
    var search = this.formSearch.get('search');
    search.valueChanges
          .do(() => this.loading$.next(true))
          .debounceTime(300)
          .subscribe((query: string) => {
            console.log(query);
            this.ListService.search(query)
                .then(res => {
                    this.loading$.next(false);
                    console.log(res);
                    this.header = res.found;
                    this.results = res.searchs; 
                })
          console.log('oke');
    })
  }

  deleteList(list: List, event: Event) {
    event.stopPropagation();
    this.ListService
        .deleteListById(list.id)
        .then(() => {
          this.lists = this.lists.filter(l => l.id !== list.id);
        })
        .catch(error => this.error = error);
  }
  
  addList() {
    this.ListService.addList(this.newList)
        .then(() => {
                this.getList();
                this.newList = new List();
            });
  }

  changeToEdit(List: List, event: any) {
    event.stopPropagation();
    this.listEditing = List.id;
  }

  editList(text: string, List: List, event: any) {
    event.stopPropagation();
    List.title = text;
    this.ListService.editList(List, text)
      .then(() => {
              this.revertEdit();
              this.getList();
              });
  }  
  revertEdit() {
    this.listEditing = -1;
  }

  getList(){
    this.ListService.getLists()
              .then(lists => {
                this.lists = lists;
                console.log(this.lists)
              })
              .catch(error => this.error = error);
  }

  goTasks(id: number) {
    this.router.navigate(['/lists', id]);
  }

}
