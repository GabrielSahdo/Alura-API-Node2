const express = require("express");
const app = express();
const config = require("config");

app.use(express.json());

app.listen(config.get('api.porta'), () => console.log("escutando porta 3000..."));
