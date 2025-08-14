const mysql = require("mysql2");

exports.buildWhereClause = ({ date, search, id }) => {
  let whereClause = `
    trantech.tm_product_transactions.datetime BETWEEN DATE(NOW() + INTERVAL -90 DAY) AND NOW()
    AND trantech.tm_product_transactions.status_id IN ("1", "2")
    AND trantech.tm_product_transactions_last.status_id NOT IN ("14","18")
  `;

  if (date) {
    const startDateTime = `${date} 00:00:00`;
    const endDateTime = `${date} 23:59:59`;
    whereClause += ` AND DATE_ADD(trantech.tm_product_transactions.datetime, INTERVAL 7 HOUR) BETWEEN ${mysql.escape(
      startDateTime
    )} AND ${mysql.escape(endDateTime)}`;
  }

  if (search) {
    whereClause += ` AND (trantech.tm_product_transactions.serial_no LIKE ${mysql.escape(
      "%" + search + "%"
    )} OR trantech.tm_product_transactions.receive_code LIKE ${mysql.escape(
      "%" + search + "%"
    )} OR trantech.mm_reason_sends.detail LIKE ${mysql.escape("%" + search + "%")} )`;
  }

  if (id) {
    whereClause += ` AND trantech.tm_product_transactions.id = ${mysql.escape(id)}`;
  }

  return whereClause;
};

exports.buildOrderClause = ({ sort_by = "create_date_1_2", order = "DESC" }) => {
  const validSortColumns = new Set(["id", "datetime", "create_date_1_2", "to_warehouse", "resend_create_date"]);

  if (!validSortColumns.has(sort_by)) {
    sort_by = "create_date_1_2";
  }
  order = order.toUpperCase() === "ASC" ? "ASC" : "DESC";
  return `\`${sort_by}\` ${order}`;
};

exports.WhereClauseApp = ({ date, search, customer_name, to_warehouse, has_remark }) => {
  let whereClause = `
    trantech.tm_product_transactions.datetime BETWEEN DATE(NOW() + INTERVAL -90 DAY) AND NOW()
    AND trantech.tm_product_transactions.status_id IN ("1", "2")
    AND trantech.tm_product_transactions_last.status_id NOT IN ("14","18")
  `;

  if (date) {
    const startDateTime = `${date} 00:00:00`;
    const endDateTime = `${date} 23:59:59`;
    whereClause += ` AND DATE_ADD(trantech.tm_product_transactions.datetime, INTERVAL 7 HOUR) BETWEEN ${mysql.escape(
      startDateTime
    )} AND ${mysql.escape(endDateTime)}`;
  }

  if (search) {
    whereClause += ` AND (trantech.tm_product_transactions.receive_code LIKE ${mysql.escape("%" + search + "%")} )`;
  }

  if (customer_name) {
    whereClause += ` AND (trantech.um_customers.customer_name = ${mysql.escape(customer_name)})`;
  }

  if (to_warehouse) {
    whereClause += ` AND (trantech.mm_warehouses_to.warehouse_name = ${mysql.escape(to_warehouse)})`;
  }

  if (has_remark === "yes") {
    whereClause += ` AND (COALESCE(trantech.mm_reason_sends.detail, '') <> '' OR COALESCE(trantech.tm_receive_serials.remark, '') <> '')`;
  } else if (has_remark === "no") {
    whereClause += ` AND (COALESCE(trantech.mm_reason_sends.detail, '') = '' AND COALESCE(trantech.tm_receive_serials.remark, '') = '')`;
  }

  return whereClause.trim();
};

exports.OrderClauseApp = ({ sort_by = "resend_create_date", order = "DESC" }) => {
  const sortColumnMap = {
    resend_create_date: "trantech.tm_resends.create_date",
    to_warehouse: "trantech.mm_warehouses_to.warehouse_name",
    detail: "trantech.mm_reason_sends.detail",
    remark: "trantech.tm_receive_serials.remark",
  };

  if (!Object.keys(sortColumnMap).includes(sort_by)) {
    sort_by = "resend_create_date";
  }
  order = order.toUpperCase() === "ASC" ? "ASC" : "DESC";

  return `${sortColumnMap[sort_by]} ${order}`;
};

exports.lEditTableClause = ({ receive_code, date }) => {
  let whereClause = `1=1`;

  if (date) {
    const startDateTime = `${date} 00:00:00`;
    const endDateTime = `${date} 23:59:59`;
    whereClause += ` AND DATE_ADD(trantech.l_edit_table.create_date, INTERVAL 7 HOUR) BETWEEN ${mysql.escape(
      startDateTime
    )} AND ${mysql.escape(endDateTime)}`;
  }

  if (receive_code) {
    whereClause += ` AND tm_receives.receive_code = ${mysql.escape(receive_code)}`;
  }
  return whereClause.trim();
};

exports.vLeditClause = ({ type, receive_id }) => {
  let whereClause = `1=1`;
  if (type) {
    whereClause += ` AND type = ${mysql.escape(type)}`;
  }

  if (receive_id) {
    whereClause += ` AND view_l_edit_table_admin.receive_id = ${mysql.escape(receive_id)}`;
  }
  return whereClause.trim();
};

exports.vProductTransactionClause = ({}) => {
  let whereClause = `1=1`;

  return whereClause.trim();
};

exports.get01Clause = ({ search }) => {
  let whereClause = `1=1`;

  if (search) {
    const sanitizedSearch = search.replace(/-/g, "");
    whereClause += ` AND (
      REPLACE(receive_code, '-', '') LIKE ${mysql.escape("%" + sanitizedSearch + "%")}
      OR REPLACE(reference_no, '-', '') LIKE ${mysql.escape("%" + sanitizedSearch + "%")}
    )`;
  }

  return whereClause.trim();
};

exports.get02Clause = ({ search, warehouse_id, customer_id }) => {
  let whereClause = `1=1`;

  if (search) {
    const sanitizedSearch = search.replace(/-/g, "");
    whereClause += ` AND (
      REPLACE(receive_code, '-', '') LIKE ${mysql.escape("%" + sanitizedSearch + "%")}
      OR REPLACE(reference_no, '-', '') LIKE ${mysql.escape("%" + sanitizedSearch + "%")}
    )`;
  }

  if (warehouse_id) {
    whereClause += ` AND warehouse_id = ${mysql.escape(warehouse_id)}`;
  }

  if (customer_id) {
    whereClause += ` AND customer_id = ${mysql.escape(customer_id)}`;
  }

  return whereClause.trim();
};

exports.get03Clause = ({ search, remark, resend_date_filter, warehouse_id, customer_id }) => {
  let whereClause = `1=1`;

  if (search) {
    const sanitizedSearch = search.replace(/-/g, "");
    whereClause += ` AND (
      REPLACE(receive_code, '-', '') LIKE ${mysql.escape("%" + sanitizedSearch + "%")}
      OR REPLACE(reference_no, '-', '') LIKE ${mysql.escape("%" + sanitizedSearch + "%")}
    )`;
  }

  if (remark) {
    const sanitizedRemark = remark.replace(/-/g, "");
    whereClause += ` AND remark LIKE ${mysql.escape("%" + sanitizedRemark + "%")}`;
  }

  if (resend_date_filter === "has_resend") {
    whereClause += ` AND resend_date IS NOT NULL`;
  } else if (resend_date_filter === "no_resend") {
    whereClause += ` AND resend_date IS NULL`;
  }

  if (warehouse_id) {
    whereClause += ` AND warehouse_id = ${mysql.escape(warehouse_id)}`;
  }

  if (customer_id) {
    whereClause += ` AND customer_id = ${mysql.escape(customer_id)}`;
  }

  return whereClause.trim();
};

exports.get04_10stdClause = ({ statusFilter }) => {
  let whereClause = `1=1`;

  if (statusFilter === "overtime") {
    whereClause += ` AND status_message_web COLLATE utf8mb4_unicode_ci = 'เกินเวลา'`;
  } else if (statusFilter === "not_yet") {
    whereClause += ` AND status_message_web COLLATE utf8mb4_unicode_ci = 'ยังไม่ถึง'`;
  }

  return whereClause.trim();
};

exports.get04_11stdClause = ({ truck_load_id }) => {
  let whereClause = `1=1`;

  if (truck_load_id) {
    whereClause += ` AND v04_11_detail_w6_on_truck_std.truck_load_id = ${mysql.escape(truck_load_id)}`;
  }
  return whereClause.trim();
};

exports.get04_20outboundClause = ({ statusFilter }) => {
  let whereClause = `1=1`;

  if (statusFilter === "overtime") {
    whereClause += ` AND status_message_web COLLATE utf8mb4_unicode_ci = 'เกินเวลา'`;
  } else if (statusFilter === "not_yet") {
    whereClause += ` AND status_message_web COLLATE utf8mb4_unicode_ci = 'ยังไม่ถึง'`;
  }

  return whereClause.trim();
};

exports.get04_21outboundClause = ({ truck_load_id }) => {
  let whereClause = `1=1`;

  if (truck_load_id) {
    whereClause += ` AND v04_21_detail_w6_on_truck_15_outbound.truck_load_id = ${mysql.escape(truck_load_id)}`;
  }

  return whereClause.trim();
};

exports.get04_30inboundClause = ({ statusFilter }) => {
  let whereClause = `1=1`;

  if (statusFilter === "overtime") {
    whereClause += ` AND status_message_web COLLATE utf8mb4_unicode_ci = 'เกินเวลา'`;
  } else if (statusFilter === "not_yet") {
    whereClause += ` AND status_message_web COLLATE utf8mb4_unicode_ci = 'ยังไม่ถึง'`;
  }

  return whereClause.trim();
};

exports.get04_31inboundClause = ({ truck_load_id }) => {
  let whereClause = `1=1`;

  if (truck_load_id) {
    whereClause += ` AND v04_31_detail_w6_on_truck_15_inbound.truck_load_id = ${mysql.escape(truck_load_id)}`;
  }

  return whereClause.trim();
};

exports.get04_40whClause = ({ statusFilter }) => {
  let whereClause = `1=1`;

  if (statusFilter === "overtime") {
    whereClause += ` AND status_message_web COLLATE utf8mb4_unicode_ci = 'เกินเวลา'`;
  } else if (statusFilter === "not_yet") {
    whereClause += ` AND status_message_web COLLATE utf8mb4_unicode_ci = 'ยังไม่ถึง'`;
  }

  return whereClause.trim();
};

exports.get04_41whClause = ({ truck_load_id }) => {
  let whereClause = `1=1`;

  if (truck_load_id) {
    whereClause += ` AND v04_41_detail_w6_on_truck_15_wh_wh.truck_load_id = ${mysql.escape(truck_load_id)}`;
  }

  return whereClause.trim();
};
