create table if not exists services (
    id bigserial primary key,
    name varchar(255) not null,
    description varchar(1000) not null,
    image_url text not null
);

create table if not exists gallery (
    id bigserial primary key,
    image_url text not null,
    category varchar(50) not null
);

create table if not exists bookings (
    id bigserial primary key,
    name varchar(255) not null,
    phone varchar(50) not null,
    event_type varchar(50) not null,
    date date not null,
    guests integer not null,
    message text not null,
    created_at timestamp not null default now()
);

create table if not exists contacts (
    id bigserial primary key,
    name varchar(255) not null,
    phone varchar(50) not null,
    message text not null,
    created_at timestamp not null default now()
);
