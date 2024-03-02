const bodyParser = require('body-parser');
const express = require('express');
const app = express();
const cors = require("cors");
require('./config/connect');
const http = require('http');
const server = http.createServer(app);

app.use((req, res, next) => {
  res.io = io
  next()
});

// const { demo } = require('./routes/demo');

// // Định tuyến
// app.use(demo);

// Thiết lập body-parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(cors({
  methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH']
}));
app.use(express.json());


// Serve các tệp tĩnh trong thư mục "uploads"
app.use(express.static("uploads"));

const port = 3000;
server.listen(port, () => {
  console.log(`API đang chạy : http://localhost:${port}/`);
});
