require("dotenv").config();
const express = require("express");
const app = express();
const https = require("https"); //---เพิ่มคำสั่งนี้
const fs = require("fs"); //---เพิ่มคำสั่งนี้
const cors = require("cors");
const morgan = require("morgan");
const { readdirSync } = require("fs");
const error = require("./middlewares/error");
const notfound = require("./middlewares/notfound");

// Load SSL certificate and key ---เพิ่มคำสั่งนี้
// const sslOptions = {
//   key: fs.readFileSync('/home/xsendwork/conf/web/xsendwork.com/ssl/xsendwork.com.key'),
//   cert: fs.readFileSync('/home/xsendwork/conf/web/xsendwork.com/ssl/xsendwork.com.crt'),
//   ca: fs.readFileSync('/home/xsendwork/conf/web/xsendwork.com/ssl/xsendwork.com.ca')
// };

// middleware
app.use(morgan("dev"));
app.use(express.json({ limit: "20mb" }));
app.use(cors());

readdirSync("./routes").map((c) => app.use("/", require("./routes/" + c)));

app.use(error);
app.use(notfound);

const port = process.env.PORT || 8000;
app.listen(port, () => console.log(`Server is running on port ${port}`));
// Use https.createServer() to enable SSL ---แก้ไข จาก app.listen เป็น https.createServer เพื่อใช้งานกับ SSL
// https.createServer(sslOptions, app).listen(port, () => {
//   console.log(`Server is running on https://localhost:${port}`);
// });
