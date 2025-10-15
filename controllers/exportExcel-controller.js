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

    await exportToExcel(res, rows, columns, "หมายเหตุ(จากApp)", filename);
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
    const filename = `product_warehouse_${timestamp}.xlsx`;

    await exportToExcel(
      res,
      rows,
      columns,
      "สินค้าในคลัง(ไม่มีหมายเหตุ)",
      filename
    );
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

    const formatDate = (date) =>
      date
        ? new Date(date).toLocaleDateString("th-TH", {
            year: "numeric",
            month: "numeric",
            day: "numeric",
          })
        : "";

    const formattedRows = rows.map((row) => ({
      ...row,
      receive_date: formatDate(row.receive_date),
      delivery_date: formatDate(row.delivery_date),
      resend_date: formatDate(row.resend_date),
    }));

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

    await exportToExcel(
      res,
      formattedRows,
      columns,
      "สินค้าในคลัง(มีหมายเหตุ)",
      filename
    );
  } catch (err) {
    console.error("Export Report Product Warehouse error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};

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
    const filename = `over4w_${timestamp}.xlsx`;

    await exportToExcel(res, sheetsConfig, columns, null, filename);
  } catch (err) {
    console.error("Export Multi-Sheet Excel error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};

exports.export05stdExcel = async (req, res) => {
  try {
    const limit = 100000;
    const offset = 0;

    const whereClause = "1=1";

    let sql = loadSql("view_05_std.sql");
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
      { header: "ทะเบียนรถ", key: "license_plate", width: 25 },
      { header: "ตำบล", key: "tambon_name", width: 25 },
      { header: "อำเภอ", key: "ampur_name", width: 25 },
      { header: "เวลาส่ง", key: "time_in", width: 25 },
      { header: "เกินเวลา", key: "time_in_over_status_text", width: 25 },
      { header: "กี่นาที", key: "time_in_over_amount_text", width: 25 },
      { header: "ใบปิดบรรทุก", key: "truck_code", width: 25 },
      { header: "ชื่อผู้รับ", key: "recipient_name", width: 25 },
      { header: "ที่อยู่ผู้รับ", key: "address", width: 25 },
      { header: "เบอร์โทร", key: "tel", width: 25 },
      { header: "รวม (บิล)", key: "receive_code_count", width: 25 },
      { header: "รวม (กล่อง)", key: "serial_count", width: 25 },
    ];

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `intransit_${timestamp}.xlsx`;

    await exportToExcel(res, rows, columns, "สินค้ากำลังนำส่ง", filename);
  } catch (err) {
    console.error("Export Report Product Warehouse error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};

exports.exportSlaExcel = async (req, res) => {
  try {
    const limit = 100000;
    const offset = 0;

    const whereClause = "1=1";

    let sql = loadSql("view_sla.sql");
    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const columns = [
      { header: "รหัส", key: "tambon_id", width: 25 },
      { header: "รหัสไปรษณีย์", key: "zip_code", width: 25 },
      { header: "ตำบล", key: "tambon", width: 25 },
      { header: "อำเภอ", key: "ampur", width: 25 },
      { header: "จังหวัด", key: "province", width: 25 },
      { header: "คลัง", key: "warehouse_name", width: 25 },
      { header: "วันจันทร์", key: "Monday", width: 25 },
      { header: "วันอังคาร", key: "Tuesday", width: 25 },
      { header: "วันพุธ", key: "Wednesday", width: 25 },
      { header: "วันพฤหัสบดี", key: "Thursday", width: 25 },
      { header: "วันศุกร์", key: "Friday", width: 25 },
      { header: "วันเสาร์", key: "Saturday", width: 25 },
      { header: "วันอาทิตย์", key: "Sunday", width: 25 },
      { header: "รหัสสายรถ", key: "route_code", width: 25 },
      { header: "ชื่อสายรถ", key: "route_name", width: 25 },
      { header: "พื้นที่รับผิดชอบ", key: "DC_Mapping", width: 25 },
      { header: "อัปเดตล่าสุด", key: "lastupdate", width: 25 },
    ];

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `sla_${timestamp}.xlsx`;

    await exportToExcel(res, rows, columns, "SLA", filename);
  } catch (err) {
    console.error("Export Report SLA error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};

exports.exportBookingsExcel = async (req, res) => {
  try {
    const limit = 100000;
    const offset = 0;

    const whereClause = "1=1";

    let sql = loadSql("v_tt_booking_status_all.sql");
    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const formattedRows = rows.map((row) => ({
      ...row,
      book_date: new Date(row.book_date).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
    }));

    const columns = [
      { header: "วันที่สร้าง", key: "create_date", width: 25 },
      { header: "เลขที่ใบจองรถ", key: "book_code", width: 25 },
      { header: "วันที่จองรถ", key: "book_date", width: 25 },
      { header: "เวลาที่จองรถ", key: "book_time", width: 25 },
      { header: "สถานะการจองรถ", key: "book_status_th", width: 25 },
      { header: "เจ้าของงาน", key: "customer_name", width: 25 },
      { header: "เลขที่เอกสาร", key: "receive_code", width: 25 },
      { header: "จำนวนสินค้า", key: "serial_count", width: 25 },
      { header: "ชื่อผู้ส่ง", key: "shipper_name", width: 25 },
      { header: "ชื่อผู้รับ", key: "recipient_name", width: 25 },
      { header: "ที่อยู่", key: "address", width: 25 },
      { header: "ตำบล", key: "tambon_name", width: 25 },
      { header: "อำเภอ", key: "ampur_name", width: 25 },
      { header: "จังหวัด", key: "province_name", width: 25 },
      { header: "รหัสไปรษณีย์", key: "zip_code", width: 25 },
      { header: "เบอร์โทร", key: "tel", width: 25 },
      { header: "หมายเหตุ", key: "remark", width: 25 },
      { header: "ทะเบียนรถ", key: "license_plate", width: 25 },
      { header: "สถานะสินค้า", key: "status_message", width: 25 },
      { header: "เวลาสถานะล่าสุด", key: "last_status_at", width: 25 },
      { header: "คลังต้นทาง", key: "warehouse_name", width: 25 },
    ];

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `bookings_${timestamp}.xlsx`;

    await exportToExcel(res, formattedRows, columns, "ใบจองรถ", filename);
  } catch (err) {
    console.error("Export Report Bookings error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};

exports.exportVgtExcel = async (req, res) => {
  try {
    const limit = 100000;
    const offset = 0;

    const whereClause = "1=1";

    let sql = loadSql("v_tt_status_booking_vgt.sql");
    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const formattedRows = rows.map((row) => ({
      ...row,
      tt_status_date: new Date(row.tt_status_date).toLocaleDateString("th-TH", {
        year: "numeric",
        month: "numeric",
        day: "numeric",
      }),
    }));

    const columns = [
      { header: "ลำดับ", key: "row_no", width: 25 },
      { header: "อ้างอิง VGT", key: "vgt_reference", width: 25 },
      { header: "DO TT", key: "DO_TT", width: 25 },
      { header: "Box", key: "BOX", width: 25 },
      { header: "Booking No", key: "BOOKING_NO", width: 25 },
      { header: "ชื่อผู้ส่ง", key: "sender_name", width: 25 },
      { header: "DC ต้นทาง", key: "from_dc", width: 25 },
      { header: "จังหวัดต้นทาง", key: "from_province", width: 25 },
      { header: "ชื่อผู้รับ", key: "recipient_name", width: 25 },
      { header: "จังหวัดผู้รับ", key: "recipient_province", width: 25 },
      { header: "DC ต้นปลายทาง", key: "to_dc", width: 25 },
      { header: "ทะเบียนรถ", key: "license_plate", width: 25 },
      {
        header: "ชื่อพนักงานเข้ารับ",
        key: "pickup_staff_first_name",
        width: 25,
      },
      {
        header: "นามสกุลพนักงานเข้ารับ",
        key: "pickup_staff_last_name",
        width: 25,
      },
      { header: "เบอร์โทร", key: "phone_number", width: 25 },
      { header: "สถานะ", key: "status_message", width: 25 },
      { header: "วันที่สถานะ", key: "tt_status_date", width: 25 },
      { header: "เวลาสถานะ", key: "tt_status_time", width: 25 },
      { header: "วันที่รายงาน", key: "date_time_report", width: 25 },
      { header: "ใบจองรถ", key: "books_is_deleted_text", width: 25 },
      { header: "ใบส่งสินค้า", key: "receives_is_deleted_text", width: 25 },
      { header: "สถานะใบจองรถ", key: "book_status_th", width: 25 },
    ];

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `vgt_${timestamp}.xlsx`;

    await exportToExcel(res, formattedRows, columns, "VGT", filename);
  } catch (err) {
    console.error("Export Report Bookings error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};

exports.exportReceiveNoImageExcel = async (req, res) => {
  try {
    const limit = 100000;
    const offset = 0;

    const whereClause = "1=1";

    let sql = loadSql("v_receive_no_image.sql");
    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const columns = [
      { header: "คลังปลายทาง", key: "warehouse_name", width: 25 },
      { header: "เจ้าของงาน", key: "customer_name", width: 25 },
      { header: "ชื่อผู้รับ", key: "recipient_name", width: 25 },
      { header: "วันที่", key: "bill_date", width: 25 },
      { header: "เลขที่เอกสาร", key: "receive_code", width: 25 },
      { header: "เลขที่กล่อง", key: "serial_no", width: 25 },
    ];

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `receive_no_image_${timestamp}.xlsx`;

    await exportToExcel(res, rows, columns, "ปิดบิลไม่มีรูป", filename);
  } catch (err) {
    console.error("Export Report Receive No Image error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};

exports.exportMissingV1Excel = async (req, res) => {
  try {
    const limit = 100000;
    const offset = 0;

    const whereClause = "1=1";

    let sql = loadSql("tmp_missing_sign_images_v1.sql");
    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const columns = [
      { header: "คลังปลายทาง", key: "warehouse_name", width: 25 },
      { header: "ทะเบียนรถ", key: "license_plate", width: 25 },
      { header: "วันที่ปิดระบบ", key: "datetime", width: 25 },
      { header: "เจ้าของงาน", key: "customer_name", width: 25 },
      { header: "ชื่อผู้ส่ง", key: "shipper_name", width: 25 },
      { header: "ชื่อผู้รับ", key: "recipient_name", width: 25 },
      { header: "เลขที่เอกสาร", key: "receive_code", width: 25 },
      { header: "เลขที่กล่อง", key: "serial_no", width: 25 },
    ];

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `missing_images_${timestamp}.xlsx`;

    await exportToExcel(res, rows, columns, "บิลวันที่xxไม่มีรูป", filename);
  } catch (err) {
    console.error("Export Report Missing Images error:", err, "Error message error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};

exports.exportMissingV2Excel = async (req, res) => {
  try {
    const limit = 100000;
    const offset = 0;

    const whereClause = "1=1";

    let sql = loadSql("tmp_missing_sign_transactions_v2.sql");
    sql = sql
      .replace("__WHERE_CLAUSE__", whereClause)
      .replace("__LIMIT__", limit)
      .replace("__OFFSET__", offset);

    const [rows] = await db.query(sql);

    if (rows.length === 0) {
      return res.status(404).json({ message: "No data found" });
    }

    const columns = [
      { header: "คลังปลายทาง", key: "to_warehouse_name", width: 25 },
      { header: "ทะเบียนรถ", key: "license_plate", width: 25 },
      { header: "วันที่ปิดระบบ", key: "datetime", width: 25 },
      { header: "เจ้าของงาน", key: "customer_name", width: 25 },
      { header: "ชื่อผู้ส่ง", key: "shipper_name", width: 25 },
      { header: "ชื่อผู้รับ", key: "recipient_name", width: 25 },
      { header: "เลขที่เอกสาร", key: "receive_code", width: 25 },
      { header: "เลขที่กล่อง", key: "serial_no", width: 25 },
    ];

    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const filename = `missing_transactions_${timestamp}.xlsx`;

    await exportToExcel(res, rows, columns, "ปิดบิลวันที่xxไม่มีรูป", filename);
  } catch (err) {
    console.error("Export Report Missing Transactions error:", err, "Error message error:", err);
    res.status(500).json({ message: "An error occurred during export" });
  }
};
