import { Component, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatSort } from '@angular/material/sort';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { addTodo, deleteTodo, setInitialTodo, sortTodo, updateTodo } from './todo/todo.actions';
import { TodoStore } from './todo/todo.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  displayedColumns: string[] = ['serial', 'name', 'date', 'action'];
  dataSource: Array<any> = [];
  name: FormControl<string> = new FormControl();
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private store: Store<TodoStore>) { }

  ngOnInit() {
    this.store.dispatch(setInitialTodo({ todo: this.getLocalStorage }));
    let todos: Observable<any> = this.store.select((state: any) => state.todoStore);
    todos.subscribe((todos) => {
      this.dataSource = todos.todos;
    });
  }

  get getLocalStorage() {
    return JSON.parse(localStorage.getItem("tasks") || "[]");
  }

  setLocalStorage() {
    localStorage.setItem("tasks", JSON.stringify(this.dataSource || []));
  }

  addTask() {
    if (!this.name?.value) return;
    this.store.dispatch(addTodo({ todo: { id: this.dataSource.length + 1, name: this.name.value, date: new Date().getTime() } }));
    this.setLocalStorage();
    this.name.patchValue('');
  }

  edit(id: number) {
    const name: string = this.dataSource.find((data: any) => data.id == id)?.name;
    const newName = prompt("Edit Task:", name);
    this.store.dispatch(updateTodo({ todoId: id, name: newName }));
    this.setLocalStorage();
  }

  delete(id: number) {
    this.store.dispatch(deleteTodo({ todoId: id }));
    this.setLocalStorage();
  }

  sortData() {
    this.store.dispatch(sortTodo({ direction: this.sort.direction, property: this.sort.active }));
    this.setLocalStorage();
  }
}
