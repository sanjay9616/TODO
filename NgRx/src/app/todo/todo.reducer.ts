import { createReducer, on } from '@ngrx/store';
import { addTodo, deleteTodo } from './todo.actions';
import { initialState } from './todo.store';

const _todoReducer = createReducer(
    initialState,

    on(addTodo, (state, action: any) => {
        return {
            ...state,
            todos: [...state.todos, action.todo]
        }
    }),

    on(deleteTodo, (state, action: any) => {
        return {
            ...state,
            todos: state.todos.filter((todo: any) => todo.id !== action.todoId)
        }
    })
);

export function todoReducer(state: any, action: any) {
    return _todoReducer(state, action);
}
