/****** Скрипт для команды SelectTopNRows из среды SSMS  ******/
SELECT *
FROM [thirdpartydb].[dbo].[dbtable]
WHERE (devicename = '8_in_pzhdt' OR devicename = '8_out_pzhdt') AND date1 = '2022-02-16'
ORDER BY date1 DESC, date2 ASC;