SELECT
    *
FROM
    trantech.mm_warehouses
WHERE
    is_actived = 'Y'
    AND (warehouse_id = ? OR ? IS NULL)
ORDER BY
    warehouse_name ASC;