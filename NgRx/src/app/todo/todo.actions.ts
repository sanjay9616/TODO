import { createAction, props } from '@ngrx/store';

export const setInitialTodo = createAction('[Todo] Set Initial State', props<any>());

export const addTodo = createAction('[Todo] Add Todo', props<any>());

export const deleteTodo = createAction('[Todo] Delete Todo', props<any>());

export const updateTodo = createAction('[Todo] Update Task Name', props<any>());

export const sortTodo = createAction('[Todo] Sort Task', props<any>());

