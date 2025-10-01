const db = require("../utils/db");
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
  get05_09Clause,
  get05_11Clause,
  get05_n09n11Clause,
  get05_stdClause,
  getSlaClause,
  getBookingsClause,
} = require("../utils/buildClause");

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
    const { search, page = 1, limit = 1000 } = req.query;

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
    const { search, page = 1, limit = 1000, warehouse_id, customer_id } = req.query;

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
      limit = 1000,
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
    const { page = 1, limit = 1000, statusFilter } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = get04_10stdClause({ statusFilter });

    let sql = loadSql("04_10_tk_w6_on_truck_std.sql")
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    const total = rows.length > 0 && rows[0].total ? rows[0].total : 0;
    const data = rows.map(({ total, ...rest }) => rest);

    res.json({ data, total });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get04stdDetail = async (req, res) => {
  try {
    const { page = 1, limit = 1000 } = req.query;
    const offset = (page - 1) * limit;
    const { truck_load_id } = req.params;

    const whereClause = get04_11stdClause({ truck_load_id });

    let sql = loadSql("04_11_detail_w6_on_truck_std.sql");

    sql = sql.replace("__WHERE_CLAUSE__", whereClause).replace("__LIMIT__", limit).replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    res.json({
      data: rows,
    });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get04outbound = async (req, res) => {
  try {
    const { page = 1, limit = 1000, statusFilter } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = get04_20outboundClause({ statusFilter });

    let sql = loadSql("04_20_tk_w6_on_truck_15_outbound.sql")
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    const total = rows.length > 0 && rows[0].total ? rows[0].total : 0;
    const data = rows.map(({ total, ...rest }) => rest);

    res.json({ data, total });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get04outboundDetail = async (req, res) => {
  try {
    const { page = 1, limit = 1000 } = req.query;
    const offset = (page - 1) * limit;
    const { truck_load_id } = req.params;

    const whereClause = get04_21outboundClause({ truck_load_id });

    let sql = loadSql("04_21_detail_w6_on_truck_15_outbound.sql");

    sql = sql.replace("__WHERE_CLAUSE__", whereClause).replace("__LIMIT__", limit).replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    res.json({
      data: rows,
    });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get04inbound = async (req, res) => {
  try {
    const { page = 1, limit = 1000, statusFilter } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = get04_30inboundClause({ statusFilter });

    let sql = loadSql("04_30_tk_w6_on_truck_15_inbound.sql")
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    const total = rows.length > 0 && rows[0].total ? rows[0].total : 0;
    const data = rows.map(({ total, ...rest }) => rest);

    res.json({ data, total });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get04inboundDetail = async (req, res) => {
  try {
    const { page = 1, limit = 1000 } = req.query;
    const offset = (page - 1) * limit;
    const { truck_load_id } = req.params;

    const whereClause = get04_31inboundClause({ truck_load_id });

    let sql = loadSql("04_31_detail_w6_on_truck_15_inbound.sql");

    sql = sql.replace("__WHERE_CLAUSE__", whereClause).replace("__LIMIT__", limit).replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    res.json({
      data: rows,
    });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get04wh = async (req, res) => {
  try {
    const { page = 1, limit = 1000, statusFilter } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = get04_40whClause({ statusFilter });

    let sql = loadSql("04_40_tk_w6_on_truck_15_wh_wh.sql")
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    const total = rows.length > 0 && rows[0].total ? rows[0].total : 0;
    const data = rows.map(({ total, ...rest }) => rest);

    res.json({ data, total });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get04whDetail = async (req, res) => {
  try {
    const { page = 1, limit = 1000 } = req.query;
    const offset = (page - 1) * limit;
    const { truck_load_id } = req.params;

    const whereClause = get04_41whClause({ truck_load_id });

    let sql = loadSql("04_41_detail_w6_on_truck_15_wh_wh.sql");

    sql = sql.replace("__WHERE_CLAUSE__", whereClause).replace("__LIMIT__", limit).replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    res.json({
      data: rows,
    });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

// exports.get05 = async (req, res) => {
//   try {
//     const { page = 1, limit = 1000 } = req.query;
//     const offset = (page - 1) * limit;

//     const whereClause = get05_10whClause({});

//     let sql = loadSql("05_11_detail_w6_on_truck_std.sql")
//       // let sql = loadSql("05_10_tk_w6_on_truck_std.sql")
//       .replace("__WHERE_CLAUSE__", whereClause)
//       .replace("__LIMIT__", limit)
//       .replace("__OFFSET__", offset);

//     const [rows] = await db.query(sql);

//     const total = rows.length > 0 && rows[0].total ? rows[0].total : 0;
//     const data = rows.map(({ total, ...rest }) => rest);

//     res.json({ data, total });
//   } catch (err) {
//     console.error("error:", err);
//     res.status(500).json({ message: "An error occurred" });
//   }
// };

// exports.get05Detail = async (req, res) => {
//   try {
//     const { page = 1, limit = 1000 } = req.query;
//     const offset = (page - 1) * limit;
//     const { truck_load_id } = req.params;

//     const whereClause = get05_11whClause({ truck_load_id });

//     let sql = loadSql("05_11_detail_w6_on_truck_std.sql");

//     sql = sql.replace("__WHERE_CLAUSE__", whereClause).replace("__LIMIT__", limit).replace("__OFFSET__", offset);

//     const [rows] = await db.query(sql);

//     res.json({
//       data: rows,
//     });
//   } catch (err) {
//     console.error("error:", err);
//     res.status(500).json({ message: "An error occurred" });
//   }
// };

exports.get05_09 = async (req, res) => {
  try {
    const { page = 1, limit = 1000, warehouse_id } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = get05_09Clause({ warehouse_id });

    let sql = loadSql("05_09.sql")
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    const total = rows.length > 0 && rows[0].total ? rows[0].total : 0;
    const data = rows.map(({ total, ...rest }) => rest);

    res.json({ data, total });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get05_11 = async (req, res) => {
  try {
    const { page = 1, limit = 1000, warehouse_id } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = get05_11Clause({ warehouse_id });

    let sql = loadSql("05_11.sql")
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    const total = rows.length > 0 && rows[0].total ? rows[0].total : 0;
    const data = rows.map(({ total, ...rest }) => rest);

    res.json({ data, total });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get05_n09n11 = async (req, res) => {
  try {
    const { page = 1, limit = 1000, warehouse_id } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = get05_n09n11Clause({ warehouse_id });

    let sql = loadSql("05_n09n11.sql")
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    const total = rows.length > 0 && rows[0].total ? rows[0].total : 0;
    const data = rows.map(({ total, ...rest }) => rest);

    res.json({ data, total });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.get05std = async (req, res) => {
  try {
    const { page = 1, limit = 1000, warehouse_id, over_status } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = get05_stdClause({ warehouse_id, over_status });

    let sql = loadSql("view_05_std.sql")
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    const total = rows.length > 0 && rows[0].total ? rows[0].total : 0;
    const data = rows.map(({ total, ...rest }) => rest);

    res.json({ data, total });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getSla = async (req, res) => {
  try {
    const { page = 1, limit = 1000, search_tambon, search_ampur, search_province } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = getSlaClause({ search_tambon, search_ampur, search_province });

    let sql = loadSql("view_sla.sql")
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    const total = rows.length > 0 && rows[0].total ? rows[0].total : 0;
    const data = rows.map(({ total, ...rest }) => rest);

    res.json({ data, total });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

exports.getBookings = async (req, res) => {
  try {
    const { page = 1, limit = 1000, search, warehouse_id } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = getBookingsClause({ search, warehouse_id });

    let sql = loadSql("v_tt_booking_status_all.sql")
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    await db.query("SET SESSION group_concat_max_len = 65535;");

    const [rows] = await db.query(sql);

    const total = rows.length > 0 && rows[0].total ? rows[0].total : 0;
    const data = rows.map(({ total, ...rest }) => rest);

    res.json({ data, total });
  } catch (err) {
    console.error("error:", err);
    res.status(500).json({ message: "An error occurred" });
  }
};

