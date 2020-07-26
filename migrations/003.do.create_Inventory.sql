create table inventory (
inventoryId SERIAL NOT null PRIMARY key,
productId serial references product(ProductId),
title text,
location text,
quantity integer,
comments text,
user_name text references ib_tracker_users(user_name),
userId serial references ib_tracker_users(id),
date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
date_modified TIMESTAMPTZ
)