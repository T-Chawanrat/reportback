const fs = require("fs");
const path = require("path");

function loadSql(fileName) {
  const templatePath = path.join(__dirname, "..", "sql", fileName);
  return fs.readFileSync(templatePath, "utf8");
}

module.exports = { loadSql };
