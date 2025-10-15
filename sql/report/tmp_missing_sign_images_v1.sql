SELECT *, COUNT(*) OVER() AS total
FROM trantech_bi.tmp_missing_sign_images_v1
WHERE __WHERE_CLAUSE__
ORDER BY to_warehouse_name , license_plate , datetime ASC , customer_name
LIMIT __LIMIT__ OFFSET __OFFSET__