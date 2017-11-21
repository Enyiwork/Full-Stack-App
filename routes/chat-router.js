const express = require("express");

const app = express();

const server = require("http").createServer(app);

const io = require("socket.io").listen(server);

users = [];

connection = [];



app.get("/login", (req, res) => {
  res.sendFile(__dirname + "user-views/chat-setup");
});

module.exports = app;
