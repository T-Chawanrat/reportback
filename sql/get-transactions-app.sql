SELECT
  trantech.tm_product_transactions.id,
  DATE_ADD (trantech.tm_product_transactions.datetime,INTERVAL 7 HOUR) AS create_date_1_2,
  DATE_ADD (trantech.tm_product_transactions.datetime,INTERVAL 7 HOUR) AS datetime,
  DATE_ADD (trantech.tm_product_transactions.update_date,INTERVAL 7 HOUR) AS update_date,
  trantech.tm_product_transactions.receive_code,
  trantech.tm_product_transactions.serial_id,
  trantech.tm_product_transactions.serial_no,
  trantech.tm_product_transactions.status_message,
  trantech.tm_receives.reference_no,
  trantech.tm_receive_serials.receive_date,
  trantech.tm_receive_serials.delivery_date,
  trantech.tm_receives.arrival_date,
  trantech.tm_receive_serials.package_name,
  trantech.um_customers.customer_name,
  trantech.tm_receives.is_deleted,
  trantech.tm_receive_serials.item_is_deleted,
  trantech.tm_receive_serials.shipper_name,
  trantech.tm_receive_serials.recipient_code,
  trantech.tm_receive_serials.recipient_name,
  trantech.tm_receive_serials.address,
  trantech.tm_receive_serials.tambon_name,
  trantech.tm_receive_serials.ampur_name,
  trantech.tm_receive_serials.province_name,
  trantech.tm_receive_serials.zip_code,
  trantech.tm_receive_serials.tel,
  trantech.tm_receive_serials.remark,
  trantech.tm_receive_serials.cost,
  trantech.mm_warehouses.warehouse_name AS from_warehouse,
  trantech.mm_warehouses_to.warehouse_name AS to_warehouse,
  trantech.tm_sends.longitude,
  trantech.tm_sends.latitude,
  trantech.um_user_trucks.user_truck_id,
  trantech.um_users.username,
  trantech.um_employees.first_name,
  trantech.um_employees.last_name,
  trantech.mm_trucks.license_plate,
  trantech.tm_product_transactions_last.status_message,
  trantech.tm_product_transactions_last.datetime,
  trantech.tm_product_transactions.receive_business_id,
  trantech.tm_product_transactions.receive_walkin_id,
  trantech.tm_resends.create_date AS resend_create_date,
  trantech.tm_resends.resend_date,
  trantech.tm_resends.longitude AS resend_longitude,
  trantech.tm_resends.latitude AS resend_latitude,
  trantech.mm_reason_sends.detail AS resend_reason_detail
FROM
  trantech.tm_product_transactions
  LEFT JOIN trantech.tm_receives ON trantech.tm_receives.receive_code = trantech.tm_product_transactions.receive_code
  LEFT JOIN trantech.tm_receive_serials ON trantech.tm_receive_serials.receive_code = trantech.tm_product_transactions.receive_code
  LEFT JOIN trantech.um_customers ON trantech.um_customers.customer_id = trantech.tm_receive_serials.customer_id
  LEFT JOIN trantech.mm_warehouses ON trantech.mm_warehouses.warehouse_id = trantech.tm_receive_serials.from_warehouse_id
  LEFT JOIN trantech.mm_warehouses_to ON trantech.mm_warehouses_to.warehouse_id = trantech.tm_receive_serials.to_warehouse_id
  LEFT JOIN trantech.tm_sends ON trantech.tm_sends.serial_id = trantech.tm_product_transactions.serial_id
  LEFT JOIN trantech.um_user_trucks ON trantech.um_user_trucks.user_truck_id = trantech.tm_sends.user_truck_id
  LEFT JOIN trantech.um_users ON trantech.um_users.user_id = trantech.um_user_trucks.user_id
  LEFT JOIN trantech.um_employees ON trantech.um_employees.employee_id = trantech.um_users.people_id
  LEFT JOIN trantech.mm_trucks ON trantech.mm_trucks.id = trantech.um_user_trucks.truck_id
  LEFT JOIN trantech.tm_product_transactions_last ON trantech.tm_product_transactions_last.serial_id = trantech.tm_product_transactions.serial_id
  LEFT JOIN trantech.tm_resends ON trantech.tm_resends.serial_id = trantech.tm_product_transactions.serial_id
  LEFT JOIN trantech.mm_reason_sends ON trantech.mm_reason_sends.reason_id = trantech.tm_resends.reason_id
WHERE
  __WHERE_CLAUSE__
GROUP BY
  trantech.tm_product_transactions.serial_id
ORDER BY
  __ORDER_BY__
LIMIT
  __LIMIT__
OFFSET
  __OFFSET__;