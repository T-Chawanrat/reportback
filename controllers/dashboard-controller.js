const db = require("../utils/db");
const { loadSql } = require("../utils/loadSql");

exports.getDashboard03std = async (req, res) => {
  try {
    let sql = loadSql("dashboard_v03_std.sql");

    const [rows] = await db.query(sql);

    res.json({
      data: rows,
    });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getDashboard04 = async (req, res) => {
  try {
    let sql = loadSql("dashboard_v04_11.sql");

    const [rows] = await db.query(sql);

    res.json({
      data: rows,
    });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};
