const express = require("express");
const path = require("path");

const app = express();
const PORT = 3000;

let posts = [];

app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "views", "index.html"));
});

app.get("/api/posts", (req, res) => {
  res.json(posts);
});

app.post("/api/posts", (req, res) => {
  const { title, content } = req.body;

  if (!title || !content) {
    return res.status(400).json({ message: "All fields required" });
  }

  posts.unshift({
    id: Date.now(),
    title,
    content,
    date: new Date().toLocaleString(),
  });

  res.status(201).json({ message: "Post created" });
});

app.delete("/api/posts/:id", (req, res) => {
  posts = posts.filter((post) => post.id != req.params.id);
  res.json({ message: "Post deleted" });
});

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
