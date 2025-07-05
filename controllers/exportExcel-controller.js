const ExcelJS = require("exceljs");
const db = require("../utils/db");
const { loadSql } = require("../utils/loadSql");
const { exportToExcel } = require("../utils/excelExport");

exports.export01Excel = async (req, res) => {
  try {
    console.log("export01Excel called", req.query);

    const limit = 100000;
    const offset = 0;

    const whereClause = "1=1";

    let sql = loadSql("01_not18do_resend.sql");
    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const columns = [
      { header: "วันที่จากแอป", key: "Create_date_tm_resend", width: 15 },
      { header: "หมายเหตุแอป", key: "detail", width: 20 },
      { header: "หมายเหตุ", key: "remark", width: 25 },
      { header: "เลขที่บิล", key: "receive_code", width: 25 },
      { header: "Reference", key: "reference_no", width: 25 },
      { header: "เจ้าของงาน", key: "customer_name", width: 25 },
      { header: "ชื่อผู้รับสินค้า", key: "recipient_name", width: 25 },
      { header: "คลังปลายทาง", key: "warehouse_name", width: 25 },
      { header: "สถานะล่าสุด", key: "Last_status_nameTH", width: 25 },
    ];

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `report_01_${timestamp}.xlsx`;

    await exportToExcel(res, rows, columns, "Sheet1", filename);
  } catch (err) {
    console.error("export01Excel error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};
