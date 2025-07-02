SELECT
 trantech.tm_resends.create_date AS Create_date___tm_resend, 
 trantech.tm_resends.reason_id, 
 trantech.mm_reason_sends.detail, 
 trantech.tm_receives.remark, 
 trantech.tm_product_transactions.DATETIME, 
 trantech.tm_product_transactions.status_id, 
 trantech.tm_product_transactions_last.status_id AS Last_status_id, 
 trantech.tm_product_transactions_last.status_message AS Last_status_nameTH, 
 trantech.tm_product_transactions.receive_business_id, 
 trantech.tm_product_transactions.receive_walkin_id, 
 trantech.tm_product_transactions.receive_code, 
 trantech.tm_receives.reference_no, 
 trantech.tm_receives.customer_id, 
 trantech.um_customers.customer_name, 
 trantech.tm_receives.to_warehouse_id, 
 trantech.mm_warehouses.warehouse_name, 
 trantech.tm_product_transactions.serial_no
FROM
 trantech.tm_product_transactions
 LEFT JOIN
 trantech.tm_product_transactions_last
 ON 
  trantech.tm_product_transactions.serial_id = trantech.tm_product_transactions_last.serial_id
 LEFT JOIN
 trantech.tm_receives
 ON 
  trantech.tm_product_transactions_last.receive_code = trantech.tm_receives.receive_code
 RIGHT JOIN
 trantech.tm_resends
 ON 
  trantech.tm_product_transactions_last.serial_id = trantech.tm_resends.serial_id
 LEFT JOIN
 trantech.mm_reason_sends
 ON 
  trantech.tm_resends.reason_id = trantech.mm_reason_sends.reason_id
 LEFT JOIN
 trantech.um_customers
 ON 
  trantech.tm_receives.customer_id = trantech.um_customers.customer_id
 LEFT JOIN
 trantech.mm_warehouses
 ON 
  trantech.tm_receives.to_warehouse_id = trantech.mm_warehouses.warehouse_id
WHERE
 __WHERE_CLAUSE__
 GROUP BY
  trantech.tm_receives.receive_code
ORDER BY
 trantech.tm_resends.create_date DESC
 LIMIT __LIMIT__ OFFSET __OFFSET__