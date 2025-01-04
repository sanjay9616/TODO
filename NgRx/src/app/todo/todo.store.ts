export interface TodoStore {
    todos: { id: number, name: string, date: string }[];
}

export const initialState: TodoStore = {
    todos: [],
};
