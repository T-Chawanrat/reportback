SELECT *, COUNT(*) OVER() AS total
FROM trantech_bi.view04_0_w6_on_truck
WHERE __WHERE_CLAUSE__
LIMIT __LIMIT__ OFFSET __OFFSET__