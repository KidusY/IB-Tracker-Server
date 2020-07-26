create table IF NOT EXISTS logges (
logId SERIAL NOT null PRIMARY key,
actions text,
userId SERIAL references ib_tracker_users(id),
ProductId  SERIAL references product(ProductId),
quantity integer,
date_created TIMESTAMPTZ NOT NULL DEFAULT now()
);