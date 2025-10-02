SELECT *, COUNT(*) OVER() AS total
FROM trantech_bi.v_receive_no_image
WHERE __WHERE_CLAUSE__
LIMIT __LIMIT__ OFFSET __OFFSET__