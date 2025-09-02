const ExcelJS = require("exceljs");

/**
 * @param {object} res
 * @param {array} rows
 * @param {array} columns
 * @param {string} sheetName
 * @param {string} fileName
 */
async function exportToExcel(res, rows, columns, sheetName = "Sheet1", fileName = "data.xlsx") {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);

  const headerStyle = {
    font: { bold: true, color: { argb: "FFFFFF" } },
    fill: { type: "pattern", pattern: "solid", fgColor: { argb: "465FFF" } },
    border: {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    },
  };

  if (columns && columns.length > 0) {
    worksheet.columns = columns;
  } else if (rows.length > 0) {
    worksheet.columns = Object.keys(rows[0]).map((key) => ({
      header: key,
      key: key,
      width: 20,
    }));
  }

  rows.forEach((row) => {
    const rowData = { ...row };
    Object.keys(rowData).forEach((key) => {
      if (rowData[key] instanceof Date) {
        rowData[key] = rowData[key].toLocaleString("th-TH");
      }
    });
    worksheet.addRow(rowData);
  });

  worksheet.getRow(1).eachCell((cell) => {
    cell.style = headerStyle;
  });

  worksheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: columns.length },
  };

  worksheet.footer = {
    oddFooter: `&L&B ${sheetName} &C&D &R&P of &N`,
  };

  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
  res.setHeader("Content-Disposition", `attachment; filename=${fileName}`);

  await workbook.xlsx.write(res);
  res.end();
}

module.exports = { exportToExcel };
