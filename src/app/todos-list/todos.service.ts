import { Injectable } from "@angular/core";
import { item } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root',
})export class TodosService {

  todos: item[];
  idCount: number;

  constructor() {
    this.todos = this.getTodos();
    let id = this.todos.length === 0
      ? 1 
      : this.todos[this.todos.length-1].id;
    this.idCount = id++;
  }

  getTodos() {
    let items = JSON.parse(localStorage.getItem('todos'))
    return items === null ? [] : items;
  }

  saveTodos(todos: item[]) {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  addTodo(todo: item) {
    this.todos.push(todo);
    this.saveTodos(this.todos);
  }

  removeTodo(id: number) {
    this.todos = this.todos.filter((item)=> item.id !== id);
    this.saveTodos(this.todos);
  }

}