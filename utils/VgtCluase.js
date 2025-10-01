const mysql = require("mysql2");

exports.getVgtClause = ({ book_status }) => {
  let whereClause = `1=1`;

  if (book_status === "READY") {
    whereClause += ` AND book_status = 'READY'`;
  } else if (book_status === "PENDING") {
    whereClause += ` AND book_status = 'PENDING'`;
  }

  return whereClause.trim();
};
