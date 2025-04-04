export interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export interface TodoToPOST extends Partial<Todo> {}

export type Todos = Todo[];
export type TodosToPOST = TodoToPOST[];