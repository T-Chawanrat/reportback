SELECT *, COUNT(*) OVER() AS total
FROM trantech_bi.v01_not18_do_resend
WHERE __WHERE_CLAUSE__
LIMIT __LIMIT__ OFFSET __OFFSET__