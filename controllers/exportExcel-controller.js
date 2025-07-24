const ExcelJS = require("exceljs");
const db = require("../utils/db");
const { loadSql } = require("../utils/loadSql");
const { exportToExcel } = require("../utils/excelExport");

exports.export01Excel = async (req, res) => {
  try {
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
      { header: "วันที่จากแอป", key: "Create_date_tm_resend", width: 25 },
      { header: "หมายเหตุแอป", key: "detail", width: 25 },
      { header: "หมายเหตุ", key: "remark", width: 25 },
      { header: "เลขที่บิล", key: "receive_code", width: 25 },
      { header: "เลขที่อ้างอิง", key: "reference_no", width: 25 },
      { header: "เจ้าของงาน", key: "customer_name", width: 25 },
      { header: "ชื่อผู้รับ", key: "recipient_name", width: 25 },
      { header: "คลังปลายทาง", key: "warehouse_name", width: 25 },
      { header: "สถานะล่าสุด", key: "Last_status_nameTH", width: 25 },
    ];

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `remark_app_${timestamp}.xlsx`;

    await exportToExcel(res, rows, columns, "Sheet1", filename);
  } catch (err) {
    console.error("Export App Remark error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};

exports.export02Excel = async (req, res) => {
  try {
    const limit = 100000;
    const offset = 0;

    const whereClause = "1=1";

    let sql = loadSql("02_do_now_dc_no_remark.sql");
    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const columns = [
      { header: "คลังปัจจุบัน", key: "warehouse_name", width: 25 },
      { header: "เจ้าของงาน", key: "customer_name", width: 25 },
      { header: "ชื่อผู้รับ", key: "recipient_name", width: 25 },
      { header: "วันที่บิล", key: "receive_date", width: 25 },
      { header: "วันที่จัดส่ง", key: "delivery_date", width: 25 },
      { header: "วันที่จัดส่งใหม่", key: "resend_date", width: 25 },
      { header: "เลขที่บิล", key: "receive_code", width: 25 },
      { header: "เลขที่อ้างอิง", key: "reference_no", width: 25 },
      { header: "คลังปลายทาง", key: "to_warehouse_name", width: 25 },
      { header: "สถานะล่าสุด", key: "status_message", width: 25 },
    ];

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `remark_product_warehouse_${timestamp}.xlsx`;

    await exportToExcel(res, rows, columns, "Sheet1", filename);
  } catch (err) {
    console.error("Export Report Product Warehouse error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};

exports.export03Excel = async (req, res) => {
  try {
    const limit = 100000;
    const offset = 0;

    const whereClause = "1=1";

    let sql = loadSql("03_not_18_do_is_remark.sql");
    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const columns = [
      { header: "หมายเหตุ", key: "remark", width: 25 },
      { header: "วันที่หมายเหตุล่าสุด", key: "create_date", width: 25 },
      { header: "คลังปัจจุบัน", key: "warehouse_name", width: 25 },
      { header: "เจ้าของงาน", key: "customer_name", width: 25 },
      { header: "ชื่อผู้รับ", key: "recipient_name", width: 25 },
      { header: "วันที่บิล", key: "receive_date", width: 25 },
      { header: "วันที่จัดส่ง", key: "delivery_date", width: 25 },
      { header: "วันที่จัดส่งใหม่", key: "resend_date", width: 25 },
      { header: "เลขที่บิล", key: "receive_code", width: 25 },
      { header: "เลขที่อ้างอิง", key: "reference_no", width: 25 },
      { header: "คลังปลายทาง", key: "to_warehouse_name", width: 25 },
      { header: "สถานะล่าสุด", key: "status_message", width: 25 },
    ];

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `remark_over_delivery_${timestamp}.xlsx`;

    await exportToExcel(res, rows, columns, "Sheet1", filename);
  } catch (err) {
    console.error("Export Report Product Warehouse error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};