SELECT
    trantech.mm_warehouses.warehouse_name
FROM
    trantech.mm_warehouses
WHERE
    is_actived = 'Y'
ORDER BY
    warehouse_name ASC;