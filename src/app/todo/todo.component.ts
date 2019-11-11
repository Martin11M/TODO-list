import { Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import { item } from '../interfaces/item.interface';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.component.html',
  styleUrls: ['./todo.component.sass']
})

export class TodoComponent implements OnInit {

  taskForm: FormGroup;
  @Input()
  todo: item;
  @Output('doneItem')
  taskWasDone: EventEmitter<item> = new EventEmitter<item>();
  @Output('deletedItem')
  taskWasDeleted: EventEmitter<item> = new EventEmitter<item>();
  @Output('editedItem')
  taskWasEdited: EventEmitter<item> = new EventEmitter<item>();

  editMode: boolean;

  constructor(private _fb: FormBuilder) { }

  ngOnInit() {
    this.todo.isDone = false;
    this.editMode = false;
    this.taskForm = this._fb.group({
      title: ['', Validators.required]
    })
  }

  taskDone() {
    this.taskWasDone.emit(this.todo);
  }

  taskDeleted() {
    this.taskWasDeleted.emit(this.todo);
  }

  startEdit() {
    this.editMode = true;
    this.taskForm.get('title').setValue(this.todo.title);
  }

  finishEdit() {
    this.editMode = false;
    this.todo.title = this.taskForm.get('title').value;
    this.taskWasEdited.emit(this.todo);
    this.taskForm.get('title').setValue('');
  }

}
