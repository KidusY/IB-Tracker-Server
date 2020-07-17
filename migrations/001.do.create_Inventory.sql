create table inventory (
ProductId SERIAL NOT null PRIMARY key,
title text not null,
description text,
type text,
filename text,
height text,
width text,
price text,
rating text,
location text,
upc text unique,
date_created TIMESTAMPTZ NOT NULL DEFAULT now()
);


create table inventory (
inventoryId SERIAL NOT null PRIMARY key,
productId serial references product(ProductId),
location text,
quantity integer,
comments text,
userId serial references ib_tracker_users(id),
date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
date_modified TIMESTAMPTZ
);