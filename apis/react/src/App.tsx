import { useState } from "react";
import { Todos } from "./features/todos/types";
import TodoList from "./features/todos/components/TodoList";
import { fetchAllTodos } from "./features/todos/api/GET";
import AddTodo from "./features/todos/components/AddTodo";

function App() {
  const [todos, setTodos] = useState<Todos | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  async function handleFetchTodos() {
    try {
      setIsLoading(true);
      const { data: todos, error } = await fetchAllTodos();

      if (error) {
        setError(error);
        throw Error(error);
      }

      setTodos(todos);
    } catch (error) {
      setTodos(null);
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main>
      <button onClick={handleFetchTodos}>
        {isLoading ? "Loading..." : "Fetch todos"}
      </button>
      {error && <p>{error}</p>}
      <AddTodo />
      <TodoList todos={todos} />
    </main>
  );
}

export default App;
