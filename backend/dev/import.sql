---
-- add transfer column in emacs
---
M-x replace-regex RET $ RET , RET (from line 2)

---
-- import csv file
---
COPY pricelistimport (id,family,type,oldname,scientific,chinese,grade,gender,oldsize,oldmm,size,mm,inch,d20h,d24h,d30h,d36h,d42h,retail,wholesale,usd,oldcode1,oldcode2,deg23,leaf,dry,indiv,moreox,lessox,transfer) FROM '/home/ubuntu/greeny-oms/pricelist01.csv' DELIMITER ',' CSV HEADER;

---
-- clear useless entries
---
DELETE FROM pricelistimport WHERE usd IS NULL;
