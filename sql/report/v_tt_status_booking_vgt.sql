SELECT *, COUNT(*) OVER() AS total
FROM trantech_bi.v_tt_status_booking_vgt
WHERE __WHERE_CLAUSE__
LIMIT __LIMIT__ OFFSET __OFFSET__;
