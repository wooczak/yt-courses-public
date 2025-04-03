const URL = "https://jsonplaceholder.typicode.com";

const querySuffix = {
  TODOS: "/todos",
};

const GET = {
  ALL_TODOS: URL + querySuffix.TODOS,
};

const fetchButton = document.getElementById("fetch-data");
const results = document.getElementById("results");

export { GET, fetchButton, results };