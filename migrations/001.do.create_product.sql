create table IF NOT EXISTS product (
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