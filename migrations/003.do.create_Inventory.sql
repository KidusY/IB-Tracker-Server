create table inventory (
inventoryId SERIAL NOT null PRIMARY key,
productId serial references product(ProductId)  ON DELETE CASCADE NOT NULL,
title text,
location text,
quantity integer,
comments text,
user_name text references ib_tracker_users(user_name) ON DELETE CASCADE NOT NULL,
userId serial references ib_tracker_users(id)  ON DELETE CASCADE NOT NULL,
date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
date_modified TIMESTAMPTZ
)