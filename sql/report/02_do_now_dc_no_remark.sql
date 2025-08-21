SELECT 
  *, 
  COUNT(*) OVER() AS total,
  COUNT(CASE WHEN warehouse_id = 15 THEN 1 END) OVER() AS count_warehouse_15,
  COUNT(CASE WHEN warehouse_id != 15 THEN 1 END) OVER() AS count_warehouse_not_15
FROM trantech_bi.v02_do_now_dc_no_remark
WHERE __WHERE_CLAUSE__
LIMIT __LIMIT__ OFFSET __OFFSET__

