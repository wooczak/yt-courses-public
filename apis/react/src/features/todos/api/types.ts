interface Todo {
    userId: number;
    id: number;
    title: string;
    completed: boolean;
}

export type Todos = Todo[];