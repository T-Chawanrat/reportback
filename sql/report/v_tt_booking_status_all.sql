SELECT *,
COUNT(*) OVER() AS total
FROM trantech_bi.v_tt_booking_status_all
WHERE __WHERE_CLAUSE__
ORDER BY create_date DESC, book_id, receive_code
LIMIT __LIMIT__ OFFSET __OFFSET__;
