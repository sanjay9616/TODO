import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { addTodo, deleteTodo } from './todo/todo.actions';
import { TodoStore } from './todo/todo.store';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  displayedColumns: string[] = ['serial', 'name', 'date', 'action'];
  dataSource = [
    { id: 1, name: 'Task 1', date: new Date() },
    { id: 2, name: 'Task 2', date: new Date() },
    { id: 3, name: 'Task 3', date: new Date() }
  ];
  constructor(private store: Store<TodoStore>) { }

  ngOnInit() {
    let todos$ = this.store.select((state: any) => state.todoStore);
    todos$.subscribe((todos) => {
      console.log("todos", todos);
    });
    this.store.dispatch(addTodo({ todo: { id: 1, name: 'Task 1', date: '12/12/2024' } }));
    this.store.dispatch(deleteTodo({ todoId: 1 }));
  }

  edit() {

  }

  delete() {

  }
}
