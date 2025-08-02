const express = require("express");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = 3000;

// Serve static files from the root directory
app.use(express.static(path.join(__dirname, "..")));

// Blog posts API
app.get("/api/posts", (req, res) => {
  const dataPath = path.join(__dirname, "..", "Data", "posts.json");
  fs.readFile(dataPath, "utf8", (err, data) => {
    if (err) return res.status(500).send("Failed to load posts");
    res.json(JSON.parse(data));
  });
});

// Catch-all to serve index.html (for single-page feel)
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "index.html"));
});

app.listen(PORT, () => {
  console.log(`✅ Server running at http://localhost:${PORT}`);
});
