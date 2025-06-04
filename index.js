const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const JWT_SECRET = process.env.JWT_SECRET;
const app = express();
app.use(express.static("public", { index: false }));

app.use(express.json());

const users = {};

function sign_in(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  const user = users[username];

  if (!user) {
    return res.json({ Error: "User not found" });
  }

  if (user.password !== password) {
    return res.json({ Error: "Wrong Pass" });
  }

  const token = jwt.sign(
    {
      username: username,
    },
    JWT_SECRET
  );

  return res.json({ TOKEN: token });
}
function sign_up(req, res) {
  const username = req.body.username;
  const password = req.body.password;

  if (users[username]) {
    return res.json({ Response: "User already exists" });
  }

  users[username] = { password: password, token: "not for now" };

  return res.json({ Response: "New User created" });
}
function getMe(req, res) {
  const token = req.headers.token;
  const decoded = jwt.verify(token, JWT_SECRET);
  const username = decoded.username;
  let name = null;
  let password = null;
  for (const key in users) {
    if (key === username) {
      name = key;
      password = users[key].password;
      break;
    }
  }
  if (name) {
    return res.json({
      UserName: name,
      Password: password,
    });
  } else {
    return res.json({
      Error: "Invalid token",
    });
  }
}
function auth(req, res, next) {
  const token = req.headers.token;

  if (!token) {
    return res.status(401).json({
      Error: "No token provided",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      Error: "Invalid token",
    });
  }
}
app.get("/", function (req, res) {
  res.sendFile(__dirname + "/public/sign.html");
});
app.get("/home", auth, function (req, res) {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/signup", sign_up);
app.post("/signin", sign_in);
app.get("/me", getMe);

app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
