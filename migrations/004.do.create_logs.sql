create table logs (
logId SERIAL NOT null PRIMARY key,
actions text,
user_name text,
ProductId  integer,
quantity integer,
price text,
date_created TIMESTAMPTZ NOT NULL DEFAULT now()
);