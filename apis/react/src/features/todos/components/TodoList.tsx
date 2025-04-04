import { Todos } from "../types";

export default function TodoList({ todos }: { todos: Todos | null }) {
  if (!todos) return null;

  return (
    <section>
      {todos.map((todo) => (
        <p>{todo.title}</p>
      ))}
    </section>
  );
}
