SELECT
    trantech.l_edit_table.create_date,
    trantech.l_edit_table.user_id,
    trantech.l_edit_table.pk_id,
    trantech.l_edit_table.value_new,
    trantech.l_edit_table.column,
    trantech.um_users.user_id,
    trantech.um_users.people_id,
    trantech.um_users.user_type,
    trantech.um_employees.employee_id,
    trantech.um_employees.employee_code,
    trantech.um_employees.first_name,
    trantech.um_employees.last_name,
    trantech.tm_receives.receive_id,
    trantech.tm_receives.receive_code
FROM
    trantech.l_edit_table
    LEFT JOIN trantech.um_users ON trantech.l_edit_table.user_id = trantech.um_users.user_id
    LEFT JOIN trantech.um_employees ON trantech.um_users.people_id = trantech.um_employees.employee_id
    LEFT JOIN trantech.tm_receives ON l_edit_table.pk_id = tm_receives.receive_id

    
WHERE
    __WHERE_CLAUSE__
ORDER BY
    create_date DESC
LIMIT
  __LIMIT__
OFFSET
  __OFFSET__;