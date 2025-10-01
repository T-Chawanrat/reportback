const mysql = require("mysql2");

exports.vLeditClause = ({ type, receive_id }) => {
  let whereClause = `1=1`;
  if (type) {
    whereClause += ` AND type = ${mysql.escape(type)}`;
  }

  if (receive_id) {
    whereClause += ` AND view_l_edit_table_admin.receive_id = ${mysql.escape(
      receive_id
    )}`;
  }
  return whereClause.trim();
};

exports.get01Clause = ({ search }) => {
  let whereClause = `1=1`;

  if (search) {
    const sanitizedSearch = search.replace(/-/g, "");
    whereClause += ` AND (
      REPLACE(receive_code, '-', '') LIKE ${mysql.escape(
        "%" + sanitizedSearch + "%"
      )}
      OR REPLACE(reference_no, '-', '') LIKE ${mysql.escape(
        "%" + sanitizedSearch + "%"
      )}
    )`;
  }

  return whereClause.trim();
};

exports.get02Clause = ({ search, warehouse_id, customer_id }) => {
  let whereClause = `1=1`;

  if (search) {
    const sanitizedSearch = search.replace(/-/g, "");
    whereClause += ` AND (
      REPLACE(receive_code, '-', '') LIKE ${mysql.escape(
        "%" + sanitizedSearch + "%"
      )}
      OR REPLACE(reference_no, '-', '') LIKE ${mysql.escape(
        "%" + sanitizedSearch + "%"
      )}
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

exports.get03Clause = ({
  search,
  remark,
  resend_date_filter,
  warehouse_id,
  customer_id,
}) => {
  let whereClause = `1=1`;

  if (search) {
    const sanitizedSearch = search.replace(/-/g, "");
    whereClause += ` AND (
      REPLACE(receive_code, '-', '') LIKE ${mysql.escape(
        "%" + sanitizedSearch + "%"
      )}
      OR REPLACE(reference_no, '-', '') LIKE ${mysql.escape(
        "%" + sanitizedSearch + "%"
      )}
    )`;
  }

  if (remark) {
    const sanitizedRemark = remark.replace(/-/g, "");
    whereClause += ` AND remark LIKE ${mysql.escape(
      "%" + sanitizedRemark + "%"
    )}`;
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
    whereClause += ` AND v04_11_detail_w6_on_truck_std.truck_load_id = ${mysql.escape(
      truck_load_id
    )}`;
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
    whereClause += ` AND v04_21_detail_w6_on_truck_15_outbound.truck_load_id = ${mysql.escape(
      truck_load_id
    )}`;
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
    whereClause += ` AND v04_31_detail_w6_on_truck_15_inbound.truck_load_id = ${mysql.escape(
      truck_load_id
    )}`;
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
    whereClause += ` AND v04_41_detail_w6_on_truck_15_wh_wh.truck_load_id = ${mysql.escape(
      truck_load_id
    )}`;
  }

  return whereClause.trim();
};

exports.get05_09Clause = ({ warehouse_id }) => {
  let whereClause = `1=1`;

  if (warehouse_id) {
    whereClause += ` AND warehouse_id = ${mysql.escape(warehouse_id)}`;
  }

  return whereClause.trim();
};

exports.get05_11Clause = ({ warehouse_id }) => {
  let whereClause = `1=1`;

  if (warehouse_id) {
    whereClause += ` AND warehouse_id = ${mysql.escape(warehouse_id)}`;
  }

  return whereClause.trim();
};

exports.get05_n09n11Clause = ({ warehouse_id }) => {
  let whereClause = `1=1`;

  if (warehouse_id) {
    whereClause += ` AND warehouse_id = ${mysql.escape(warehouse_id)}`;
  }

  return whereClause.trim();
};

exports.get05_stdClause = ({ warehouse_id, over_status }) => {
  let whereClause = `1=1`;

  if (warehouse_id) {
    whereClause += ` AND warehouse_id = ${mysql.escape(warehouse_id)}`;
  }

  if (over_status === "overtime") {
    whereClause += ` AND time_in_over_status_text COLLATE utf8mb4_unicode_ci = 'เกินเวลา'`;
  } else if (over_status === "not_yet") {
    whereClause += ` AND time_in_over_status_text COLLATE utf8mb4_unicode_ci = 'ยังไม่ถึง'`;
  }

  return whereClause.trim();
};

exports.getSlaClause = ({ search_tambon, search_ampur, search_province }) => {
  let whereClause = `1=1`;

  if (search_tambon) {
    const searchTambon = search_tambon.replace(/-/g, "");
    whereClause += ` AND (
      REPLACE(tambon, '-', '') LIKE ${mysql.escape("%" + searchTambon + "%")}
        )`;
  }

  if (search_ampur) {
    const searchAmpur = search_ampur.replace(/-/g, "");
    whereClause += ` AND (
      REPLACE(ampur, '-', '') LIKE ${mysql.escape("%" + searchAmpur + "%")}
        )`;
  }

  if (search_province) {
    const searchProvince = search_province.replace(/-/g, "");
    whereClause += ` AND (
      REPLACE(province, '-', '') LIKE ${mysql.escape(
        "%" + searchProvince + "%"
      )}
        )`;
  }

  return whereClause.trim();
};

exports.getBookingsClause = ({ search, warehouse_id }) => {
  let whereClause = `1=1`;

  if (search) {
    const sanitizedSearch = search.replace(/-/g, "");
    whereClause += ` AND (
      REPLACE(receive_code, '-', '') LIKE ${mysql.escape(
        "%" + sanitizedSearch + "%"
      )}
      )`;
  }

  if (warehouse_id) {
    whereClause += ` AND warehouse_id = ${mysql.escape(warehouse_id)}`;
  }

  return whereClause.trim();
};
