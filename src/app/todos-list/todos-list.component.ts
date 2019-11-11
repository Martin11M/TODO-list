import { Component, OnInit } from '@angular/core';
import { item } from '../interfaces/item.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TodosService } from './todos.service';
import { DoneItemsService } from './done-items.service';

@Component({
  selector: 'app-todos-list',
  templateUrl: './todos-list.component.html',
  styleUrls: ['./todos-list.component.sass']
})
export class TodosListComponent implements OnInit {

  taskForm: FormGroup;

  constructor(
    private _fb: FormBuilder,
    private _todoService: TodosService,
    private _doneItemsService: DoneItemsService
    ) { }

  ngOnInit() {
    this.taskForm = this._fb.group({
      title: ['', Validators.required]
    })
  }

  delete(i: item) {
    this._todoService.removeTodo(i.id);
  }

  markAsDone(i: item) {
    this._doneItemsService.addDoneItems(i)
    this._todoService.removeTodo(i.id);
    this.delete(i);
  }

  addTask() {
    this._todoService.addTodo(
      {
        id: this._todoService.idCount,
        isDone: false,
        title: this.taskForm.get('title').value
      } as item
    );
    this._todoService.idCount++;
    this.taskForm.get('title').setValue('');
  }

  saveEdits(i: item) {
    this._todoService.saveTodos(this._todoService.todos)
  }

}
