const db = require("../utils/db");
const mysql = require("mysql2");
const { loadSql } = require("../utils/loadSql");
const {
  get01Clause,
  get02Clause,
  get03Clause,
  get04_10stdClause,
  get04_11stdClause,
  get04_20outboundClause,
  get04_21outboundClause,
  get04_30inboundClause,
  get04_31inboundClause,
  get04_40whClause,
  get04_41whClause,
  vLeditClause,
} = require("../utils/buildClause");
// const { formatDate } = require("../utils/formatDate");

exports.getVLedit = async (req, res) => {
  try {
    const { page = 1, limit = 1000 } = req.query;
    const offset = (page - 1) * limit;
    const receive_id = req.query.receive_id;

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

exports.get04std = async (req, res) => {
  try {
    const { page = 1, limit = 100 } = req.query;
    const offset = (page - 1) * limit;

    const whereClause1 = get04_10stdClause({});
    const whereClause2 = get04_11stdClause({});

    let sql1 = loadSql("04_10_tk_w6_on_truck_std.sql")
      .replace("__WHERE_CLAUSE__", whereClause1)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    let sql2 = loadSql("04_11_detail_w6_on_truck_std.sql")
      .replace("__WHERE_CLAUSE__", whereClause2)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [[rows1], [rows2]] = await Promise.all([db.query(sql1), db.query(sql2)]);

    const total1 = rows1.length > 0 && rows1[0].total ? rows1[0].total : 0;
    const data1 = rows1.map(({ total, ...rest }) => rest);

    const total2 = rows2.length > 0 && rows2[0].total ? rows2[0].total : 0;
    const data2 = rows2.map(({ total, ...rest }) => rest);

    res.json({ data1, total1, data2, total2 });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get04outbound = async (req, res) => {
  try {
    const { page = 1, limit = 100 } = req.query;
    const offset = (page - 1) * limit;

    const whereClause1 = get04_20outboundClause({});
    const whereClause2 = get04_21outboundClause({});

    let sql1 = loadSql("04_20_tk_w6_on_truck_15_outbound.sql")
      .replace("__WHERE_CLAUSE__", whereClause1)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    let sql2 = loadSql("04_21_detail_w6_on_truck_15_outbound.sql")
      .replace("__WHERE_CLAUSE__", whereClause2)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [[rows1], [rows2]] = await Promise.all([db.query(sql1), db.query(sql2)]);

    const total1 = rows1.length > 0 && rows1[0].total ? rows1[0].total : 0;
    const data1 = rows1.map(({ total, ...rest }) => rest);

    const total2 = rows2.length > 0 && rows2[0].total ? rows2[0].total : 0;
    const data2 = rows2.map(({ total, ...rest }) => rest);

    res.json({ data1, total1, data2, total2 });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get04inbound = async (req, res) => {
  try {
    const { page = 1, limit = 100 } = req.query;
    const offset = (page - 1) * limit;

    const whereClause1 = get04_30inboundClause({});
    const whereClause2 = get04_31inboundClause({});

    let sql1 = loadSql("04_30_tk_w6_on_truck_15_inbound.sql")
      .replace("__WHERE_CLAUSE__", whereClause1)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    let sql2 = loadSql("04_31_detail_w6_on_truck_15_inbound.sql")
      .replace("__WHERE_CLAUSE__", whereClause2)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [[rows1], [rows2]] = await Promise.all([db.query(sql1), db.query(sql2)]);

    const total1 = rows1.length > 0 && rows1[0].total ? rows1[0].total : 0;
    const data1 = rows1.map(({ total, ...rest }) => rest);

    const total2 = rows2.length > 0 && rows2[0].total ? rows2[0].total : 0;
    const data2 = rows2.map(({ total, ...rest }) => rest);

    res.json({ data1, total1, data2, total2 });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get04wh = async (req, res) => {
  try {
    const { page = 1, limit = 100 } = req.query;
    const offset = (page - 1) * limit;

    const whereClause1 = get04_40whClause({});
    const whereClause2 = get04_41whClause({});

    let sql1 = loadSql("04_40_tk_w6_on_truck_15_wh_wh.sql")
      .replace("__WHERE_CLAUSE__", whereClause1)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    let sql2 = loadSql("04_41_detail_w6_on_truck_15_wh_wh.sql")
      .replace("__WHERE_CLAUSE__", whereClause2)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [[rows1], [rows2]] = await Promise.all([db.query(sql1), db.query(sql2)]);

    const total1 = rows1.length > 0 && rows1[0].total ? rows1[0].total : 0;
    const data1 = rows1.map(({ total, ...rest }) => rest);

    const total2 = rows2.length > 0 && rows2[0].total ? rows2[0].total : 0;
    const data2 = rows2.map(({ total, ...rest }) => rest);

    res.json({ data1, total1, data2, total2 });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};
