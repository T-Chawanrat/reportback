// const fs = require("fs");
// const path = require("path");

// function loadSql(fileName) {
//   const templatePath = path.join(__dirname, "..", "sql", fileName);
//   return fs.readFileSync(templatePath, "utf8");
// }

// module.exports = { loadSql };

const fs = require("fs");
const path = require("path");

function loadSql(fileName) {
  if (fileName.includes("/")) {
    const templatePath = path.join(__dirname, "..", "sql", fileName);
    return fs.readFileSync(templatePath, "utf8");
  }

  const subFolders = ["", "dashboard", "filter", "report"];

  for (const folder of subFolders) {
    try {
      const templatePath = path.join(__dirname, "..", "sql", folder, fileName);
      if (fs.existsSync(templatePath)) {
        return fs.readFileSync(templatePath, "utf8");
      }
    } catch (error) {
      continue;
    }
  }

  throw new Error(`SQL file "${fileName}" not found in any subfolder`);
}

module.exports = { loadSql };
