SELECT
    *
FROM
    trantech.um_customers
WHERE
    is_deleted = 'N'
    AND (customer_id = ? OR ? IS NULL)
ORDER BY
    customer_name ASC;