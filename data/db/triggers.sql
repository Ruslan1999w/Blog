



drop trigger if exists increment_like on likes ;
drop function increment_note_like();
--Функия триггерв
CREATE OR REPLACE FUNCTION increment_note_like() RETURNS TRIGGER AS 
	$$
	begin
		if TG_OP = 'DELETE' then
			if old.mark = true then
				update note set like_count = like_count-1 where id_note = old.id_note;
			elsif old.mark = false then
				update note set dislike_count = dislike_count-1 where id_note=old.id_note;
			end if;	
		elseif TG_OP = 'INSERT' then 
			if new.mark = true then
				update note set like_count = like_count+1 where id_note = new.id_note;
			elsif new.mark = false then
				update note set dislike_count = dislike_count+1 where id_note=new.id_note;
			end if;
		end if;
	return null;
	end;
$$ language plpgsql;

--Триггер на изменения кол-ва лайков в комментариях
create trigger increment_like
	after insert or delete on likes
	for each row 
	execute procedure increment_note_like();
	



