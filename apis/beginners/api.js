const button = document.querySelector("#fetch-data");
const results = document.querySelector("#results");
const postTextInput = document.querySelector("#post-text");
const postContentInput = document.querySelector("#post-content");
const addPostBtn = document.querySelector("#add-post-btn");

const GET = {
  POSTS: "http://localhost:3000/posts",
};

const POST = {
  NEW_POST: "http://localhost:3000/posts",
};

let controller;

async function fetchPosts() {
  controller = new AbortController();
  button.textContent = "Loading...";

  try {
    const response = await fetch(GET.POSTS, { signal: controller.signal });
    if (!response.ok) throw Error("Something went wrong with our response");

    const data = await response.json();
    results.innerHTML = null;
    data.forEach((post) => {
      const element = document.createElement("div");
      element.textContent = post.title;
      results.appendChild(element);
    });
  } catch (error) {
    results.textContent = error.message;
    console.error(error.message);
  } finally {
    button.textContent = "Fetch";
  }
}

async function addNewPost(title, content) {
  try {
    const response = await fetch(POST.NEW_POST, {
      method: "POST",
      body: JSON.stringify({ title, content }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!response.ok)
      throw Error(
        `New post was not added successfully - response responded with ${response.status} status.`
      );

    const data = await response.json();

    console.log(`New post added with data: ${data.title}: ${data.content}`);
  } catch (error) {
    console.error(error.message);
  }
}

button.addEventListener("click", function () {
  if (controller) {
    controller.abort();
    console.error("Ongoing request aborted, re-running");
  }

  fetchPosts();
});

addPostBtn.addEventListener("click", function(){ 
  addNewPost(postTextInput.value, postContentInput.value);
});