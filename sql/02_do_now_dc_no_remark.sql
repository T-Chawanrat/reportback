SELECT *, COUNT(*) OVER() AS total
FROM trantech_bi.v02_do_now_dc_no_remark
WHERE __WHERE_CLAUSE__
LIMIT __LIMIT__ OFFSET __OFFSET__