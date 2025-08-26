SELECT *, COUNT(*) OVER() AS total
FROM trantech_bi.v05_11_detail_w6_on_truck_std
WHERE __WHERE_CLAUSE__
LIMIT __LIMIT__ OFFSET __OFFSET__