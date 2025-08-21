SELECT *, COUNT(*) OVER() AS total
FROM trantech_bi.v04_20_tk_w6_on_truck_15_outbound
WHERE __WHERE_CLAUSE__
LIMIT __LIMIT__ OFFSET __OFFSET__