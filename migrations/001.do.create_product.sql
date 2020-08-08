create table product(
ProductId SERIAL NOT null PRIMARY key,
upc text unique,
title text not null,
description text,
type text,
filename text,
height text,
width text,
price text,
rating text,
date_created TIMESTAMPTZ NOT NULL DEFAULT now(),
date_modified TIMESTAMPTZ
)