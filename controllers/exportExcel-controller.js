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
    const filename = `product_warehouse_${timestamp}.xlsx`;

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
    const orderByClause = "ORDER BY create_date DESC";

    let sql = loadSql("03_not_18_do_is_remark.sql");
    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__ORDER_BY__", orderByClause)
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
    const filename = `overdue_${timestamp}.xlsx`;

    await exportToExcel(res, rows, columns, "Sheet1", filename);
  } catch (err) {
    console.error("Export Report Product Warehouse error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};

// const ExcelJS = require("exceljs");

// exports.exportMultiSheetV05Excel = async (req, res) => {
//   try {
//     const limit = 100000;
//     const offset = 0;
//     const whereClause = "1=1";

//     const sqlFiles = ["05_09.sql", "05_11.sql", "05_n09n11.sql"];
//     const queries = sqlFiles.map((file) =>
//       loadSql(file).replace("__WHERE_CLAUSE__", whereClause).replace("__LIMIT__", limit).replace("__OFFSET__", offset)
//     );

//     const results = await Promise.all(queries.map((sql) => db.query(sql)));
//     const [rows1, rows2, rows3] = results.map((result) => result[0]);

//     const columns = [
//       { header: "คลังปัจจุบัน", key: "warehouse_name", width: 25 },
//       { header: "ทะเบียนรถ", key: "license_plate", width: 25 },
//       { header: "วันที่ล่าสุด", key: "datetime", width: 25 },
//       { header: "ใบปิดบรรทุก", key: "truck_code", width: 25 },
//       { header: "เลขที่บิล", key: "receive_code", width: 25 },
//       { header: "หมายเลขกล่อง", key: "serial_no", width: 25 },
//       { header: "เกินเวลา", key: "time_remaining_text", width: 25 },
//       { header: "สถานะ", key: "status_message", width: 25 },
//     ];

//     const workbook = new ExcelJS.Workbook();

//     const sheetsConfig = [
//       { name: "กำลังนำจ่าย", data: rows1 },
//       { name: "ไม่คืนคลัง", data: rows2 },
//       { name: "อื่นๆ", data: rows3 },
//     ];

//     sheetsConfig.forEach(({ name, data }) => {
//       const sheet = workbook.addWorksheet(name);
//       sheet.columns = columns;

//       if (data && data.length > 0) {
//         sheet.addRows(data);
//         sheet.getColumn("datetime").numFmt = "yyyy-mm-dd hh:mm:ss";
//       }

//       const headerRow = sheet.getRow(1);
//       headerRow.eachCell((cell) => {
//         cell.font = { bold: true, color: { argb: "FFFFFF" } };
//         cell.fill = { type: "pattern", pattern: "solid", fgColor: { argb: "465FFF" } };
//         cell.alignment = { vertical: "middle", horizontal: "center" };
//       });
//     });

//     const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
//     const filename = `multi_sheet_export_${timestamp}.xlsx`;

//     res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
//     res.setHeader("Content-Disposition", `attachment; filename=${filename}`);

//     await workbook.xlsx.write(res);
//     res.end();
//   } catch (err) {
//     console.error("Export Multi-Sheet Excel error:", err);
//     res.status(500).json({ message: "An error occurred during export" });
//   }
// };

exports.exportMultiSheetV05Excel = async (req, res) => {
  try {
    const limit = 100000;
    const offset = 0;
    const whereClause = "1=1";

    const sqlFiles = ["05_09.sql", "05_11.sql", "05_n09n11.sql"];
    const queries = sqlFiles.map((file) =>
      loadSql(file)
        .replace("__WHERE_CLAUSE__", whereClause)
        .replace("__LIMIT__", limit)
        .replace("__OFFSET__", offset)
    );

    const results = await Promise.all(queries.map((sql) => db.query(sql)));
    const [rows1, rows2, rows3] = results.map((result) => result[0]);

    const columns = [
      { header: "คลังปัจจุบัน", key: "warehouse_name", width: 25 },
      { header: "ทะเบียนรถ", key: "license_plate", width: 25 },
      { header: "วันที่ล่าสุด", key: "datetime", width: 25 },
      { header: "ใบปิดบรรทุก", key: "truck_code", width: 25 },
      { header: "เลขที่บิล", key: "receive_code", width: 25 },
      { header: "หมายเลขกล่อง", key: "serial_no", width: 25 },
      { header: "เกินเวลา", key: "time_remaining_text", width: 25 },
      { header: "สถานะ", key: "status_message", width: 25 },
    ];

    const sheetsConfig = [
      { sheetName: "กำลังนำจ่าย", rows: rows1 },
      { sheetName: "ไม่คืนคลัง", rows: rows2 },
      { sheetName: "อื่นๆ", rows: rows3 },
    ];

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `multi_sheet_export_${timestamp}.xlsx`;

    await exportToExcel(res, sheetsConfig, columns, null, filename);
  } catch (err) {
    console.error("Export Multi-Sheet Excel error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};
