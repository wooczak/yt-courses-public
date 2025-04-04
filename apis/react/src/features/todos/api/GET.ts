import { GET } from "./constants";
import { Todos } from "../types";

type AllTodosResponse =
  | { data: Todos; error: null }
  | { data: null; error: string };

export async function fetchAllTodos(): Promise<AllTodosResponse> {
  try {
    const response = await fetch(GET.ALL_TODOS);

    if (!response.ok) {
      throw Error(`The response failed with status ${response.status}`);
    }

    const data = await response.json();

    return { data, error: null };
  } catch (err) {
    return {
      data: null,
      error: err instanceof Error ? err.message : String(err),
    };
  }
}
