import { createAction, props } from '@ngrx/store';

export const addTodo = createAction('[Todo] Add Todo1', props<any>());

export const deleteTodo = createAction('[Todo] Delete Todo', props<any>());
