async function loadPosts() {
  const res = await fetch("/api/posts");
  const posts = await res.json();

  const container = document.getElementById("posts");
  container.innerHTML = "";

  posts.forEach((post) => {
    const div = document.createElement("div");
    div.className = "post";

    div.innerHTML = `
      <h2>${post.title}</h2>
      <small>${post.date}</small>
      <p>${post.content}</p>
      <button class="delete" onclick="deletePost(${post.id})">Delete</button>
    `;

    container.appendChild(div);
  });
}

async function addPost() {
  const title = document.getElementById("title").value;
  const content = document.getElementById("content").value;

  if (!title || !content) {
    alert("Please fill all fields");
    return;
  }

  await fetch("/api/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, content }),
  });

  document.getElementById("title").value = "";
  document.getElementById("content").value = "";

  loadPosts();
}

async function deletePost(id) {
  await fetch(`/api/posts/${id}`, { method: "DELETE" });
  loadPosts();
}

loadPosts();
