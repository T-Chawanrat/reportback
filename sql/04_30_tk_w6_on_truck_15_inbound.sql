SELECT *, COUNT(*) OVER() AS total
FROM trantech_bi.v04_31_detail_w6_on_truck_15_inbound
WHERE __WHERE_CLAUSE__
LIMIT __LIMIT__ OFFSET __OFFSET__