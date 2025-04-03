import { GET, fetchButton, results } from "./config.js";

let controller;

fetchButton.addEventListener("click", function () {
  if (controller) {
    controller.abort();
    console.error(`The controller aborted the request - re-running`);
  }

  fetchTodos();
});

var fetchTodos = () => {
  // 1. Basic example
  fetch(GET.ALL_TODOS)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((todo) => {
        const todoBlock = document.createElement("div");
        todoBlock.textContent = todo.title;
        results.appendChild(todoBlock);
      });
    });
};

// 2. Example with error handling
var fetchTodos = () =>
  fetch(GET.ALL_TODOS)
    .then((response) => response.json())
    .then((data) => {
      data.forEach((todo) => {
        const todoBlock = document.createElement("div");
        todoBlock.textContent = todo.title;
        results.appendChild(todoBlock);
      });
    })
    .catch((error) => {
      results.textContent = error;
    });
// This means that catch only checks after the .then() chain
// goes through

// 3. Changing the place of .catch() and explaining that it catches the error but it doesn't stop the
// chain unless we throw the Error ourselves
var fetchTodos = () =>
  fetch(GET.ALL_TODOS)
    .then((response) => {
      if (!response.ok)
        throw new Error(`The server responded with ${response.status} status`);

      return response.json();
    })
    .then((data) => {
      data.forEach((todo) => {
        const todoBlock = document.createElement("div");
        todoBlock.textContent = todo.title;
        results.appendChild(todoBlock);
      });
    })
    .catch((error) => {
      console.error("Fetch error: ", error);
      results.textContent = error.message;
    });

// 4. Using finally and loading state to create a better UX with loading state
var fetchTodos = () => {
  fetchButton.disabled = true;
  const loadingBlock = document.createElement("div");
  loadingBlock.textContent = "Loading...";
  results.innerHTML = null;
  results.appendChild(loadingBlock);

  fetch(GET.ALL_TODOS)
    .then((response) => {
      if (!response.ok)
        throw new Error(`The server responded with ${response.status} status`);

      return response.json();
    })
    .then((data) => {
      data.forEach((todo) => {
        const todoBlock = document.createElement("div");
        todoBlock.textContent = todo.title;
        results.appendChild(todoBlock);
      });
    })
    .catch((error) => {
      console.error("Fetch error: ", error);
      results.textContent = error.message;
    })
    .finally(() => {
      loadingBlock.remove();
      fetchButton.disabled = false;
    });
};

// 5. Stop using "loading" flag and use AbortController instead
var fetchTodos = () => {
  controller = new AbortController();
  const loadingBlock = document.createElement("div");
  const refetchBlock = document.createElement("div");

  refetchBlock.textContent = "Cancelling & re-fetching...";
  loadingBlock.textContent = "Loading...";

  results.innerHTML = null;
  results.appendChild(loadingBlock);

  fetch(GET.ALL_TODOS, { signal: controller.signal })
    .then((response) => {
      if (!response.ok)
        throw new Error(`The server responded with ${response.status} status`);

      return response.json();
    })
    .then((data) => {
      results.innerHTML = null;

      data.forEach((todo) => {
        const todoBlock = document.createElement("div");
        todoBlock.textContent = todo.title;
        results.appendChild(todoBlock);
      });
    })
    .catch((error) => {
      if (error.name === "AbortError") {
        results.innerHTML = null;
        results.appendChild(refetchBlock);
      } else {
        results.textContent = error.message;
      }
      console.error("Fetch error: ", error);
    });
};

// 6. Async/await
var fetchTodos = async () => {
  controller = new AbortController();
  const loadingBlock = document.createElement("div");
  const refetchBlock = document.createElement("div");

  refetchBlock.textContent = "Cancelling & re-fetching...";
  loadingBlock.textContent = "Loading...";

  results.innerHTML = null;
  results.appendChild(loadingBlock);

  try {
    const response = await fetch(GET.ALL_TODOS, { signal: controller.signal });

    if (!response.ok) {
      throw new Error(`The server responded with ${response.status} status`);
    }

    const data = await response.json();

    if (!data) {
      throw new Error(
        `Something is wrong with the data - it looks like: ${data}`
      );
    }

    results.innerHTML = null;
    data.forEach((todo) => {
      const todoBlock = document.createElement("div");
      todoBlock.textContent = todo.title;
      results.appendChild(todoBlock);
    });
  } catch (error) {
    if (error.name === "AbortError") {
      results.innerHTML = null;
      results.appendChild(refetchBlock);
    } else {
      results.textContent = error.message;
    }
    console.error("Fetch error: ", error);
  }
};
