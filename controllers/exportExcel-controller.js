const ExcelJS = require("exceljs");
const db = require("../utils/db"); // ปรับเส้นทางตามโครงสร้างโปรเจกต์ของคุณ
const { loadSql } = require("../utils/loadSql"); // เส้นทางไปยังฟังก์ชัน loadSql
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
      { header: "วันที่กดแอพ", key: "Create_date___tm_resend", width: 15 },
      { header: "รายละเอียด", key: "detail", width: 20 },
      { header: "หมายเหตุ", key: "remark", width: 25 },
      { header: "วันที่สร้างบิล", key: "DATETIME", width: 25 },
      { header: "เลขที่บิล DO", key: "receive_code", width: 25 },
      { header: "เลขที่อ้างอิง Ref", key: "reference_no", width: 25 },
      { header: "คลังปลายทาง", key: "warehouse_name", width: 25 },
    ];

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `report_01_${timestamp}.xlsx`;

    await exportToExcel(res, rows, columns, "Sheet1ลองๆๆ", filename);
  } catch (err) {
    console.error("export01Excel error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};
