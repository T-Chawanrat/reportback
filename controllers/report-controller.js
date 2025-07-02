const db = require("../utils/db");
const mysql = require("mysql2");
const { loadSql } = require("../utils/loadSql");
const {
  WhereClauseApp,
  OrderClauseApp,
  lEditTableClause,
  reportClause,
  get01Clause,
} = require("../utils/buildClause");
const { formatDate } = require("../utils/formatDate");

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
    res.status(500).json({ message: "An error occurred" });
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
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getIndex = async (req, res) => {
  try {
    const { page = 1, limit = 1000 } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = reportClause({});

    let sql = loadSql("v_index.sql");

    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    res.json({
      data: rows,
    });
  } catch (err) {
    console.error("Index error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getVLedit = async (req, res) => {
  try {
    const { page = 1, limit = 1000 } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = reportClause({});

    let sql = loadSql("v_l_edit_table.sql");

    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    res.json({
      data: rows,
    });
  } catch (err) {
    console.error("L edit error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getVProductTransaction = async (req, res) => {
  try {
    const { page = 1, limit = 1000 } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = reportClause({});

    let sql = loadSql("v_product_transactions.sql");

    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    res.json({
      data: rows,
    });
  } catch (err) {
    console.error("Product Transaction error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.updateEdit = async (req, res) => {
  try {
    await db.query("CALL trantech_bi.update_edit_table();");
    const [rows] = await db.query(
      "SELECT * FROM trantech_bi.view_l_edit_table"
    );
    if (res) {
      res.json({ data: rows });
    } else {
      console.log(`[${new Date().toLocaleString()}] update successful`);
    }
  } catch (err) {
    if (res) {
      res.status(500).json({ message: "An error occurred" });
    }
    console.error(
      `[${new Date().toLocaleString()}] update failed:`,
      err.message
    );
  }
};

setInterval(() => {
  exports.updateEdit();
}, 30 * 60 * 1000);

exports.get01 = async (req, res) => {
  try {
    const { search, page = 1, limit = 200, has_remark } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = get01Clause({
      search,
      has_remark,
    });

    let sql = loadSql("01_not18do_resend.sql");
    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);
    res.json({
      data: rows,
    });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};
