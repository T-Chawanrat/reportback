const db = require("../utils/db");
const { loadSql } = require("../utils/loadSql");

exports.getWarehousesName = async (req, res) => {
    try {
    const { warehouse_id } = req.query;
    let sql = loadSql("filter_warehouses.sql");
    const [rows] = await db.query(sql, [warehouse_id, warehouse_id]);

    res.json({
      data: rows,
    });
  } catch (err) {
    console.error("getWarehouses error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};


exports.getCustomersName = async (req, res) => {
  try {
    const { customer_id } = req.query;
    let sql = loadSql("filter_customers.sql");
    const [rows] = await db.query(sql, [customer_id, customer_id]);

    res.json({
      data: rows,
      count: rows.length,
    });
  } catch (err) {
    console.error("getCustomers error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};