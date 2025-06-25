SELECT COUNT(DISTINCT trantech.tm_product_transactions.serial_id) AS total
FROM trantech.tm_product_transactions
LEFT JOIN trantech.tm_receives 
  ON trantech.tm_receives.receive_code = trantech.tm_product_transactions.receive_code
LEFT JOIN trantech.tm_receive_serials 
  ON trantech.tm_receive_serials.receive_code = trantech.tm_product_transactions.receive_code
LEFT JOIN trantech.um_customers 
  ON trantech.um_customers.customer_id = trantech.tm_receive_serials.customer_id
LEFT JOIN trantech.mm_warehouses 
  ON trantech.mm_warehouses.warehouse_id = trantech.tm_receive_serials.from_warehouse_id
LEFT JOIN trantech.mm_warehouses_to 
  ON trantech.mm_warehouses_to.warehouse_id = trantech.tm_receive_serials.to_warehouse_id
LEFT JOIN trantech.tm_product_transactions_last 
  ON trantech.tm_product_transactions_last.serial_id = trantech.tm_product_transactions.serial_id
LEFT JOIN trantech.tm_resends 
  ON trantech.tm_resends.serial_id = trantech.tm_product_transactions.serial_id
LEFT JOIN trantech.mm_reason_sends 
  ON trantech.mm_reason_sends.reason_id = trantech.tm_resends.reason_id
WHERE 
  __WHERE_CLAUSE__