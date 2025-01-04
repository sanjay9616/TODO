export interface TodoStore {
    todos: { id: number, name: string, date: number }[];
}

export const initialState: TodoStore = {
    todos: [],
};
