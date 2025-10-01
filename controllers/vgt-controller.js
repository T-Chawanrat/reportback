const db = require("../utils/db");
const { loadSql } = require("../utils/loadSql");
const { getVgtClause } = require("../utils/VgtCluase");


exports.getVGT = async (req, res) => {
  try {
    const { page = 1, limit = 1000, book_status } = req.query;
    const offset = (page - 1) * limit;

    const whereClause = getVgtClause({ book_status });

    let sql = loadSql("v_tt_status_booking_vgt.sql")
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
