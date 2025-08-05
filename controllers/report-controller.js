const db = require("../utils/db");
const mysql = require("mysql2");
const { loadSql } = require("../utils/loadSql");
const { get01Clause, get02Clause, get03Clause, get04Clause, vLeditClause } = require("../utils/buildClause");
// const { formatDate } = require("../utils/formatDate");

exports.getVLedit = async (req, res) => {
  try {
    const { page = 1, limit = 1000 } = req.query;
    const offset = (page - 1) * limit;
    const receive_id = req.query.receive_id;
    // const date = req.query.date;

    const whereClause = vLeditClause({ type: "PUBLIC", receive_id });

    let sql = loadSql("v_l_edit_table.sql");

    sql = sql.replace("__WHERE_CLAUSE__", whereClause).replace("__LIMIT__", limit).replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    res.json({
      data: rows,
    });
  } catch (err) {
    console.error("L edit error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get01 = async (req, res) => {
  try {
    const { search, page = 1, limit = 100 } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = get01Clause({ search });

    let sql = loadSql("01_not18do_resend.sql");
    sql = sql.replace("__WHERE_CLAUSE__", whereClause).replace("__LIMIT__", limit).replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    const total = rows.length > 0 ? rows[0].total : 0;
    const data = rows.map(({ total, ...rest }) => rest);

    res.json({ data, total });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get02 = async (req, res) => {
  try {
    const { search, page = 1, limit = 100, warehouse_id, customer_id } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = get02Clause({ search, warehouse_id, customer_id });

    let sql = loadSql("02_do_now_dc_no_remark.sql");
    sql = sql.replace("__WHERE_CLAUSE__", whereClause).replace("__LIMIT__", limit).replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    const total = rows.length > 0 ? rows[0].total : 0;
    const data = rows.map(({ total, ...rest }) => rest);

    res.json({ data, total });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get03 = async (req, res) => {
  try {
    const {
      search,
      remark,
      resend_date_filter,
      page = 1,
      limit = 100,
      warehouse_id,
      customer_id,
      sort_by,
      sort_order,
    } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = get03Clause({
      search,
      remark,
      resend_date_filter,
      warehouse_id,
      customer_id,
    });

    const allowedSortFields = ["create_date"];
    const orderByField = allowedSortFields.includes(sort_by) ? sort_by : "create_date";
    const orderByDirection = sort_order === "asc" || sort_order === "desc" ? sort_order : "desc";

    let sql = loadSql("03_not_18_do_is_remark.sql");
    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__ORDER_BY__", `ORDER BY ${orderByField} ${orderByDirection}`)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    const total = rows.length > 0 ? rows[0].total : 0;
    const data = rows.map(({ total, ...rest }) => rest);

    res.json({ data, total });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get04 = async (req, res) => {
  try {
    const { page = 1, limit = 100 } = req.query;

    const offset = (page - 1) * limit;
    const whereClause = get04Clause({});

    let sql = loadSql("04_0_w6_on_truck.sql");
    sql = sql.replace("__WHERE_CLAUSE__", whereClause).replace("__LIMIT__", limit).replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    const total = rows.length > 0 ? rows[0].total : 0;
    const data = rows.map(({ total, ...rest }) => rest);

    res.json({ data, total });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};
