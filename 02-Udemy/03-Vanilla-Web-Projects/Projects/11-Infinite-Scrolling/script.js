const filter = document.getElementById("filter");
const loading = document.querySelector(".loader");
const postsContainer = document.getElementById("posts-container");

let limit = 5;
let page = 1;

async function getPosts() {
  const response = await fetch(
    `https://jsonplaceholder.typicode.com/posts?_limit=${limit}&_page=${page}`
  );

  const data = await response.json();

  return data;
}

async function showPosts() {
  const posts = await getPosts();
  posts.forEach((post) => {
    const postEl = document.createElement("div");
    postEl.classList.add("post");
    postEl.innerHTML = `
      <div class="number">${post.id}</div>
      <div class="post-info">
        <h2 class="post-title">${post.title}</h2>
        <p class="post-body">${post.body}</p>
      </div>
    `;
    postsContainer.appendChild(postEl);
  });
}

function showLoading() {
  loading.classList.add("show");
  setTimeout(() => {
    loading.classList.remove("show");
    setTimeout(() => {
      page++;
      showPosts();
    }, 300);
  }, 1000);
}

function filterPosts(event) {
  const term = event.target.value.toUpperCase();
  const posts = document.querySelectorAll(".post");

  posts.forEach((post) => {
    const body = post.querySelector(".post-body").innerText.toUpperCase();
    const title = post.querySelector(".post-title").innerText.toUpperCase();

    title.indexOf(term) > -1 || body.indexOf(term) > -1
      ? (post.style.display = "flex")
      : (post.style.display = "none");
  });
}
showPosts();

window.addEventListener("scroll", () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;
  scrollHeight - scrollTop === clientHeight && showLoading();
});

filter.addEventListener("input", filterPosts);
