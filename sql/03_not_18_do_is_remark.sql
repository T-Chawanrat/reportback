SELECT *, COUNT(*) OVER() AS total
FROM trantech_bi.v03_not_18_do_is_remark
WHERE __WHERE_CLAUSE__
__ORDER_BY__ 
LIMIT __LIMIT__ OFFSET __OFFSET__