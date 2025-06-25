const db = require("../utils/db");
const { loadSql } = require("../utils/loadSql");

exports.getWarehousesName = async (req, res) => {
  try {
    let sql = loadSql("warehouses.sql");
    const [rows] = await db.query(sql);

    res.json({
      data: rows,
    });
  } catch (err) {
    console.error("getWarehouses error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};


exports.getCustomersName = async (req, res) => {
  try {
    let sql = loadSql("customers.sql");
    const [rows] = await db.query(sql);

    res.json({
      data: rows,
      count: rows.length,
    });
  } catch (err) {
    console.error("getCustomers error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};