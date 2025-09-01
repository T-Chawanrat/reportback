const ExcelJS = require('exceljs');

/**
 * ฟังก์ชันสำหรับ export ข้อมูลเป็นไฟล์ Excel
 * @param {object} res - Express response object
 * @param {array} rows - ข้อมูลที่จะ export
 * @param {array} columns - กำหนด column headers และ keys
 * @param {string} sheetName - ชื่อ sheet
 * @param {string} fileName - ชื่อไฟล์ Excel
 */
async function exportToExcel(res, rows, columns, sheetName = 'Sheet1', fileName = 'data.xlsx') {
  // สร้าง workbook และ worksheet
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet(sheetName);
  
  // กำหนด header style
  const headerStyle = {
    font: { bold: true, color: { argb: 'FFFFFF' } },
    fill: { type: 'pattern', pattern: 'solid', fgColor: { argb: '465FFF' } },
    border: {
      top: { style: 'thin' },
      left: { style: 'thin' },
      bottom: { style: 'thin' },
      right: { style: 'thin' }
    }
  };

  // กำหนด columns
  if (columns && columns.length > 0) {
    worksheet.columns = columns;
  } else if (rows.length > 0) {
    // ถ้าไม่กำหนด columns ให้ใช้ keys จาก row แรก
    worksheet.columns = Object.keys(rows[0]).map(key => ({
      header: key,
      key: key,
      width: 20
    }));
  }

  // เพิ่มข้อมูล
  rows.forEach(row => {
    // แปลงวันที่เป็น format ที่อ่านง่าย
    const rowData = { ...row };
    Object.keys(rowData).forEach(key => {
      if (rowData[key] instanceof Date) {
        rowData[key] = rowData[key].toLocaleString('th-TH');
      }
    });
    worksheet.addRow(rowData);
  });

  // จัด style สำหรับ header row
  worksheet.getRow(1).eachCell(cell => {
    cell.style = headerStyle;
  });

  // เพิ่มฟิลเตอร์ให้ header row
  worksheet.autoFilter = {
    from: { row: 1, column: 1 },
    to: { row: 1, column: columns.length }
  };

  // เพิ่ม footer
  worksheet.footer = {
    oddFooter: `&L&B ${sheetName} &C&D &R&P of &N`,
  };

  // กำหนด response headers
  res.setHeader(
    'Content-Type',
    'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
  );
  res.setHeader(
    'Content-Disposition',
    `attachment; filename=${fileName}`
  );

  // เขียนไฟล์ Excel ลงใน response
  await workbook.xlsx.write(res);
  res.end();
}

module.exports = { exportToExcel };