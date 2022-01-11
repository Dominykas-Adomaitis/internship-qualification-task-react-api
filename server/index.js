const Joi = require("joi");
const express = require("express");
const app = express();
const cors = require("cors");

const posts = require("./posts.json");

app.use(express.json());
app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "X-Requested-With");
  next();
});

app.use(
  cors({
    origin: "http://localhost:3000",
  })
);

app.get("/", (req, res) => {
  res.send("Hello world from express");
});

app.get("/api/posts", (req, res) => {
  res.send(posts);
});

app.get("/api/posts/:id", (req, res) => {
  const post = posts.find((c) => c.id === parseInt(req.params.id));
  if (!post) {
    res.status("404").send("Post with given id was not found");
    return;
  }
  res.send(post);
});

app.post("/api/posts", (req, res) => {
  const schema = Joi.object({
    userId: Joi.number().integer(),
    id: Joi.number().integer(),
    title: Joi.string().min(3).required(),
    body: Joi.string().min(3).required(),
  });
  const result = schema.validate(req.body);
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }
  const post = {
    userId: req.body.userId,
    id: posts.length + 1,
    title: req.body.title,
    body: req.body.body,
  };
  posts.push(post);
  res.json({ post });
});

/*
app.put("/api/posts/:id", (req, res) => {
  //Look up
  const post = posts.find((c) => c.id === parseInt(req.params.id));
  if (!post) {
    res.status("404").send("Post with given id was not found");
    return;
  }
  //If not exsiting return 404
  const schema = Joi.object({
    userId: Joi.number().integer(),
    id: Joi.number().integer(),
    title: Joi.string().min(3).required(),
    body: Joi.string().min(3).required(),
  });

  //Validate
  const result = schema.validate(req.body);
  //If invalid return 400 - bad req
  if (result.error) {
    res.status(400).send(result.error.details[0].message);
    return;
  }

  //Update
  post.userId = req.body.userId;
  post.id = req.body.id;
  post.title = req.body.title;
  post.body = req.body.body;

  //Return updated
  res.send(post);
});

app.delete("/api/posts/:id", (req, res) => {
  //Look up
  const post = posts.find((c) => c.id === parseInt(req.params.id));
  if (!post) {
    res.status("404").send("Post with given id was not found");
    return;
  }
  //If not exsiting return 404
  const schema = Joi.object({
    userId: Joi.number().integer(),
    id: Joi.number().integer(),
    title: Joi.string().min(3).required(),
    body: Joi.string().min(3).required(),
  });

  //Delete
  const index = posts.indexOf(post);

  posts.splice(index, 1);

  res.send(post);
});
*/
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Listening on port ${PORT}`));
