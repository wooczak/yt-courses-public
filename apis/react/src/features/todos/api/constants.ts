const URL = "https://jsonplaceholder.typicode.com" as const;

const querySuffix = {
  TODOS: "/todos",
} as const;

const GET = {
  ALL_TODOS: `${URL}${querySuffix.TODOS}`,
} as const;

const POST = {
  NEW_TODO: `${URL}${querySuffix.TODOS}`
} as const;

export { GET, POST };