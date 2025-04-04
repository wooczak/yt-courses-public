import { Todo, TodoToPOST } from "../types";
import { POST } from "./constants";

type AddTodoResponse =
  | {
      data: Todo;
      error: null;
    }
  | {
      data: null;
      error: string;
    };

export async function addTodo(todo: TodoToPOST): Promise<AddTodoResponse> {
  try {
    const response = await fetch(POST.NEW_TODO, {
      method: "POST",
      body: JSON.stringify(todo),
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) throw Error(`Error with status ${response.status}`);

    const data = await response.json();

    return { data, error: null };
  } catch (error) {
    return {
      data: null,
      error: error instanceof Error ? error.message : String(error),
    };
  }
}
