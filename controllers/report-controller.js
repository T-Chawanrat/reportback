const db = require("../utils/db");
const mysql = require("mysql2");
const { loadSql } = require("../utils/loadSql");
const {
  buildWhereClause,
  buildOrderClause,
  WhereClauseApp,
  OrderClauseApp,
  lEditTableClause,
  reportClause,
} = require("../utils/buildClause");
const { formatDate } = require("../utils/formatDate");

exports.getTransactions = async (req, res) => {
  try {
    const {
      sort_by,
      order,
      search,
      id,
      page = 1,
      limit = 50,
      date,
    } = req.query;

    const offset = (page - 1) * limit;

    const whereClause = buildWhereClause({ date, search, id });
    const orderClause = buildOrderClause({ sort_by, order });

    const countSql = `
  SELECT 
    COUNT(DISTINCT trantech.tm_product_transactions.serial_id) AS total_serial,
    COUNT(DISTINCT trantech.tm_product_transactions.receive_code) AS total_receive_code
  FROM trantech.tm_product_transactions
  LEFT JOIN trantech.tm_product_transactions_last 
    ON trantech.tm_product_transactions_last.serial_id = trantech.tm_product_transactions.serial_id
  LEFT JOIN trantech.tm_receive_serials 
    ON trantech.tm_receive_serials.receive_code = trantech.tm_product_transactions.receive_code
  LEFT JOIN trantech.um_customers 
    ON trantech.um_customers.customer_id = trantech.tm_receive_serials.customer_id
  WHERE ${whereClause}
`;

    const [[{ total_serial, total_receive_code }]] = await db.query(countSql);

    let sql = loadSql("get-transactions.sql");

    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__ORDER_BY__", orderClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    rows.forEach((row) => {
      if (row.datetime) {
        row.datetime = formatDate(row.datetime);
      }
    });

    res.json({
      data: rows,
      total_receive_code,
      total_serial,
    });
  } catch (err) {
    console.error("getTransactions error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};

exports.getTransactionsApp = async (req, res) => {
  try {
    const {
      sort_by,
      order,
      search,
      page = 1,
      limit = 50,
      date,
      customer_name,
      to_warehouse,
      has_remark,
    } = req.query;

    const offset = (page - 1) * limit;

    // เรียกใช้ฟังก์ชันแยก
    const whereClause = WhereClauseApp({
      date,
      search,
      customer_name,
      to_warehouse,
      has_remark,
    });
    const orderClause = OrderClauseApp({ sort_by, order });

    let sql = loadSql("get-transactions-app.sql");
    let countSql = loadSql("count-paginate.sql");

    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__ORDER_BY__", orderClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    countSql = countSql.replace("__WHERE_CLAUSE__", whereClause);

    const [rows] = await db.query(sql);
    const [countRows] = await db.query(countSql);

    rows.forEach((row) => {
      if (row.datetime) {
        row.datetime = formatDate(row.datetime);
      }
    });

    res.json({
      data: rows,
      page,
      limit,
      total: countRows[0].total,
    });
  } catch (err) {
    console.error("getTransactionsApp error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};

exports.getLedit = async (req, res) => {
  try {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 1000;
    const offset = (page - 1) * limit;
    const receive_code = req.query.receive_code;
    const date = req.query.date;

    const whereClause = lEditTableClause({ receive_code, date });

    let leditSql = loadSql("l-edit.sql");

    leditSql = leditSql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    console.log("receive_code param from req.query:", receive_code);
    console.log("req.query:", req.query);

    const [rows] = await db.query(leditSql);

    console.log("response data:", rows);
    console.log(JSON.stringify(rows, null, 2));

    rows.forEach((row) => {
      if (row.create_date) {
        row.create_date = formatDate(row.create_date);
      }
    });

    res.json({
      data: rows,
    });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};

exports.getReport = async (req, res) => {
  try {
    const { page = 1, limit = 1000 } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = reportClause({});

    let sql = loadSql("report.sql");

    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    res.json({
      data: rows,
    });
  } catch (err) {
    console.error("report error:", err);
    res.status(500).json({ message: "เกิดข้อผิดพลาด" });
  }
};
