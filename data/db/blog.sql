
drop table if exists likes;
drop table if exists image;
drop table if exists note;
drop table if exists user_post;
drop table if exists person_post;
drop table if exists rating_post;
drop table if exists post_tag;
drop table if exists tag;
drop table if exists post;
drop table if exists person;
drop table if exists category;


create table category
(
	id_category serial primary key,
	title varchar(256)
);

create table tag
(
	id_tag serial primary key,
	title varchar(256)
);

create table post
(
	id_post				serial primary key,
	id_category			integer references category(id_category),
	title				varchar(256),
	description         text,
	date_publish		timestamp,
	like_count			integer default 0,
	dislike_count       integer default 0
);


create table post_tag
(
	id_post_tag serial PRIMARY KEY,
	id_post integer references post(id_post),
	id_tag integer references tag(id_tag)

);

create table rating_post
(
	id_rating_post serial PRIMARY KEY,
	id_post integer references post(id_post),
	id_auth_user integer references auth_user(id),
	mark smallint
);

create table user_post
(
	id_user_post            serial PRIMARY KEY,
	id_auth_user 			integer references auth_user(id),
	id_post					integer references post(id_post)
);

create table note
(
	id_note					serial primary key,
	id_auth_user integer references auth_user(id),
	id_post					integer references post(id_post),
	description         	text,
	date_publish			timestamp,
	like_count				integer default 0,
	dislike_count       	integer default 0
);



create table image
(
	id_image 				serial primary key,
	id_post					integer references post(id_post),
	path_to_image			varchar(256)
	
);

create table likes
(
    id_like serial primary key,
	id_auth_user integer references auth_user(id),
	id_note   integer references note(id_note),
	mark	  smallint
);



