SELECT
    trantech.um_customers.customer_name
FROM
    trantech.um_customers
WHERE
    is_deleted = 'N'
ORDER BY
    customer_name ASC;