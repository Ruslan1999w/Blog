
--Удаление триггеров(для тестов)
drop trigger if exists calculate_rate on rating_post;
drop function calc_rate();
--Функция триггера перерасчета рейтинга статьи
create or replace function calc_rate() returns trigger as
	$$
		declare
			--Рассчитанный рейтинг
			new_rate real;
			--Количество оценок
			counts_rate integer;
			--Сумма оценок
			sum_rate integer;
		begin
			if TG_OP = 'INSERT' or TG_OP = 'UPDATE' then
				select into counts_rate count(mark) from rating_post where id_post = new.id_post;
				select into sum_rate sum(mark) from rating_post where id_post = new.id_post;
				new_rate= sum_rate::real/counts_rate::real;
				update post set rate = new_rate where id_post = new.id_post;
			elsif TG_OP = 'DELETE' then
				select into counts_rate count(mark) from rating_post where id_post = old.id_post;
				select into sum_rate sum(mark) from rating_post where id_post = old.id_post;
				new_rate= sum_rate::real/counts_rate::real;
				update post set rate = new_rate where id_post = old.id_post;
			end if;
			return null;
		end;
	$$language plpgsql;

--Триггер перерасчета рейтинга статьи
create trigger calculate_rate
	after insert or update or delete on rating_post
	for each row 
	execute procedure calc_rate();

--Удаление триггера(для тестов)
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
	



