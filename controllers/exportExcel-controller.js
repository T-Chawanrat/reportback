const db = require("../utils/db");
const { loadSql } = require("../utils/loadSql");
const { exportToExcel } = require("../utils/excelExport");

exports.export01Excel = async (req, res) => {
  try {
    const limit = 100000;
    const offset = 0;

    const whereClause = "1=1";

    let sql = loadSql("01_not18do_resend.sql");
    sql = sql.replace("__WHERE_CLAUSE__", whereClause).replace("__LIMIT__", limit).replace("__OFFSET__", offset);

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
    sql = sql.replace("__WHERE_CLAUSE__", whereClause).replace("__LIMIT__", limit).replace("__OFFSET__", offset);

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
    sql = sql.replace("__WHERE_CLAUSE__", whereClause).replace("__LIMIT__", limit).replace("__OFFSET__", offset);

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

const ExcelJS = require("exceljs");

exports.exportMultiSheetV05Excel = async (req, res) => {
  try {
    const limit = 100000;
    const offset = 0;

    let sql1 = loadSql("05_09.sql");
    let sql2 = loadSql("05_11.sql");
    let sql3 = loadSql("05_n09n11.sql");

    const whereClause = "1=1";

    sql1 = sql1.replace("__WHERE_CLAUSE__", whereClause).replace("__LIMIT__", limit).replace("__OFFSET__", offset);
    sql2 = sql2.replace("__WHERE_CLAUSE__", whereClause).replace("__LIMIT__", limit).replace("__OFFSET__", offset);
    sql3 = sql3.replace("__WHERE_CLAUSE__", whereClause).replace("__LIMIT__", limit).replace("__OFFSET__", offset);

    const [rows1] = await db.query(sql1);
    const [rows2] = await db.query(sql2);
    const [rows3] = await db.query(sql3);

    if (rows1.length === 0 && rows2.length === 0 && rows3.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const columns1 = [
      { header: "คลังปัจจุบัน", key: "warehouse_name", width: 25 },
      { header: "ทะเบียนรถ", key: "license_plate", width: 25 },
      { header: "วันที่บิล", key: "tm_product_trucks_created_date", width: 25 },
      { header: "ชื่อผู้รับ", key: "username", width: 25 },
      { header: "เลขที่บิล", key: "receive_code", width: 25 },
      { header: "หมายเลขกล่อง", key: "serial_no", width: 25 },
      { header: "ตำบล", key: "username", width: 25 },
      { header: "อำเภอ", key: "username", width: 25 },
      { header: "เวลาส่ง", key: "deadline_time", width: 25 },
      { header: "เกินเวลา", key: "time_remaining_text", width: 25 },
      { header: "สถานะ", key: "status_message", width: 25 },
    ];

    const columns2 = [
      { header: "คลังปัจจุบัน", key: "warehouse_name", width: 25 },
      { header: "ทะเบียนรถ", key: "license_plate", width: 25 },
      { header: "วันที่บิล", key: "tm_product_trucks_created_date", width: 25 },
      { header: "ชื่อผู้รับ", key: "username", width: 25 },
      { header: "เลขที่บิล", key: "receive_code", width: 25 },
      { header: "หมายเลขกล่อง", key: "serial_no", width: 25 },
      { header: "ตำบล", key: "username", width: 25 },
      { header: "อำเภอ", key: "username", width: 25 },
      { header: "เวลาคืนคลัง", key: "deadline_time", width: 25 },
      { header: "เกินเวลา", key: "time_remaining_text", width: 25 },
      { header: "สถานะ", key: "status_message", width: 25 },
    ];

    const columns3 = [
      { header: "คลังปัจจุบัน", key: "warehouse_name", width: 25 },
      { header: "ทะเบียนรถ", key: "license_plate", width: 25 },
      { header: "วันที่บิล", key: "tm_product_trucks_created_date", width: 25 },
      { header: "ชื่อผู้รับ", key: "username", width: 25 },
      { header: "เลขที่บิล", key: "receive_code", width: 25 },
      { header: "หมายเลขกล่อง", key: "serial_no", width: 25 },
      { header: "ตำบล", key: "username", width: 25 },
      { header: "อำเภอ", key: "username", width: 25 },
      { header: "ลิมิต1ชม.", key: "deadline_time", width: 25 },
      { header: "เกินเวลา", key: "time_remaining_text", width: 25 },
      { header: "สถานะ", key: "status_message", width: 25 },
    ];

    const workbook = new ExcelJS.Workbook();

    const sheet1 = workbook.addWorksheet("กำลังนำจ่าย");
    sheet1.columns = columns1;
    sheet1.addRows(rows1);

    const headerRow1 = sheet1.getRow(1);
    headerRow1.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFF" } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "465FFF" } };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    const sheet2 = workbook.addWorksheet("ไม่คืนคลัง");
    sheet2.columns = columns2;
    sheet2.addRows(rows2);

    const headerRow2 = sheet2.getRow(1);
    headerRow2.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFF" } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "465FFF" } };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    const sheet3 = workbook.addWorksheet("อื่นๆ");
    sheet3.columns = columns3;
    sheet3.addRows(rows3);

    const headerRow3 = sheet3.getRow(1);
    headerRow3.eachCell((cell) => {
      cell.font = { bold: true, color: { argb: "FFFFFF" } };
      cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "465FFF" } };
      cell.alignment = { vertical: "middle", horizontal: "center" };
    });

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `multi_sheet_export_${timestamp}.xlsx`;

    res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
    res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

    await workbook.xlsx.write(res);
    res.end();
  } catch (err) {
    console.error("Export Multi-Sheet Excel error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};
