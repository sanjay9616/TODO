import { createReducer, on } from '@ngrx/store';
import { addTodo, deleteTodo, setInitialTodo, sortTodo, updateTodo } from './todo.actions';
import { initialState } from './todo.store';

const _todoReducer = createReducer(
    initialState,

    on(setInitialTodo, (state, action) => {
        return {
            ...state,
            todos: action.todo
        }
    }),

    on(addTodo, (state, action) => {
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
    }),

    on(updateTodo, (state, action) => {
        const index = state.todos.findIndex((todo: any) => todo.id == action.todoId);
        if (index > -1) {
            const updatedTodos = [...state.todos];
            updatedTodos[index] = { ...updatedTodos[index], name: action.name };
            return {
                ...state,
                todos: updatedTodos,
            };
        }
        return state;
    }),

    on(sortTodo, (state, action) => {
        return {
            ...state,
            todos: action.direction === 'asc'
                ? [...state.todos].sort((a: any, b: any) => a[action.property] > b[action.property] ? 1 : -1)
                : [...state.todos].sort((a: any, b: any) => a[action.property] > b[action.property] ? -1 : 1)
        }
    })
);

export function todoReducer(state: any, action: any) {
    return _todoReducer(state, action);
}
