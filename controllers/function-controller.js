const db = require("../utils/db");

exports.updateEdit = async (req, res) => {
  try {
    await db.query("CALL trantech_bi.update_edit_table();");
    const [rows] = await db.query(
      "SELECT * FROM trantech_bi.view_l_edit_table"
    );
    if (res) {
      res.json({ data: rows });
    } else {
      console.log(`[${new Date().toLocaleString()}] update successful`);
    }
  } catch (err) {
    if (res) {
      res.status(500).json({ message: "An error occurred" });
    }
    console.error(
      `[${new Date().toLocaleString()}] update failed:`,
      err.message
    );
  }
};

setInterval(() => {
  exports.updateEdit();
}, 10 * 60 * 1000);

exports.updateRemark = async (req, res) => {
  const { in_receive_code, in_user_id, in_new_remark } = req.body;

  if (!in_receive_code || !in_user_id || !in_new_remark) {
    return res.status(400).json({ message: "input new remark" });
  }

  try {
    await db.query("CALL trantech.proc_update_receive_remark(?, ?, ?)", [
      in_receive_code,
      in_user_id,
      in_new_remark,
    ]);
    res.json({ message: "Remark updated successfully" });
  } catch (err) {
    console.error("Error updating remark:", err);
    res.status(500).json({ message: "update remark failed" });
  }
};
