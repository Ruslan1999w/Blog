 
ALTER TABLE likes ALTER COLUMN mark TYPE boolean;
ALTER TABLE post ALTER COLUMN rate TYPE real(3);

insert into note(id_auth_user, id_post)
	values (1,1)

delete from likes where id_note = 2 and id_auth_user = 1 and mark = false;
insert into likes(id_note,id_auth_user,mark)
	values (2,1,false);
	
insert into rating_post (id_post, id_auth_user, mark)
	values(1,1,10);
	delete from rating_post where id_auth_user =1;