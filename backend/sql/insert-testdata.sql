set autocommit = 0;
start transaction;


delete from user;
delete from posting;
delete from vote;




insert into user
    (firstname, lastname, username, avatar, pwd)
  values
    ('Grady', 'Booch', 'gbo@oonet.com', 'avatar09.svg', '$2b$10$mrPqooFJTgHeLNx7VlqtCezAgnkr599xNnA5z91RS3BSIxHjN4pH.');

insert into user
    (firstname, lastname, username, avatar, pwd)
  values
    ('Niklaus', 'Wirth', 'nw@inf.ethz.ch', 'avatar04.svg', '$2b$10$mrPqooFJTgHeLNx7VlqtCezAgnkr599xNnA5z91RS3BSIxHjN4pH.');

insert into user
    (firstname, lastname, username, avatar, pwd)
  values
    ('Dennis', 'Ritchie', 'dr@bell.org', 'avatar05.svg', '$2b$10$mrPqooFJTgHeLNx7VlqtCezAgnkr599xNnA5z91RS3BSIxHjN4pH.');

insert into user
    (firstname, lastname, username, avatar, pwd)
  values
    ('Edgar', 'Codd', 'ec@oxf.edu', 'avatar06.svg', '$2b$10$mrPqooFJTgHeLNx7VlqtCezAgnkr599xNnA5z91RS3BSIxHjN4pH.');

insert into user
    (firstname, lastname, username, avatar, pwd)
  values
    ('Marie', 'Harrison', 'mh@bbc.co.uk', 'avatar01.svg', '$2b$10$mrPqooFJTgHeLNx7VlqtCezAgnkr599xNnA5z91RS3BSIxHjN4pH.');

select @gbid:=id from user where username =  'gbo@oonet.com';  
select @nwid:=id from user where username =  'nw@inf.ethz.ch';  
select @drid:=id from user where username =  'dr@bell.org';  
select @ecid:=id from user where username =  'ec@oxf.edu';  
select @mhid:=id from user where username =  'mh@bbc.co.uk';  
 

--
-- insert posts for gbo@oonet.com
--
insert into posting
    (timestamp, title, content, author_id)
  values
    ('2017-08-04 23:05:36', 
    'Maxime Qui Rem',
    'Duis autem vel eum iriure dolor in hendrerit in vulputate velit esse molestie consequat, vel illum dolore eu feugiat nulla facilisis at vero eros et accumsan et iusto odio dignissim qui blandit praesent luptatum zzril delenit augue duis dolore te feugait nulla facilisi. Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy nibh euismod tincidunt ut laoreet dolore magna aliquam erat volutpat.',
    @gbid);


select @pid0 := LAST_INSERT_ID();

-- insert votes

insert into vote (user_id, posting_id, isupvote) values (@mhid,  @pid0, true);
insert into vote (user_id, posting_id, isupvote) values (@ecid,  @pid0, true);
insert into vote (user_id, posting_id, isupvote) values (@drid,  @pid0, false);



-- post with subposts
-- parent post
-- 
insert into posting
    (timestamp, title, content, author_id)
  values
    ('2018-02-01 11:00:50',
    'Libero Dignissimos Repellat',
    'In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt. Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim. Aliquam lorem ante, dapibus in, viverra quis, feugiat a, tellus.',
    @gbid);


select @pid0 := LAST_INSERT_ID();

-- insert votes

insert into vote (user_id, posting_id, isupvote) values (@nwid,  @pid0, false);



-- child posts
insert into posting
    (timestamp, content, author_id, parent_id)
  values    
    ('2018-02-01 13:27:03',
    'Tincidunt dui ut ornare lectus sit amet. Massa sed elementum tempus egestas. Et pharetra pharetra massa massa. Ullamcorper dignissim cras tincidunt lobortis feugiat vivamus. Tellus elementum sagittis vitae et leo duis ut diam quam. Pharetra vel turpis nunc eget lorem. Neque aliquam vestibulum morbi blandit cursus risus at ultrices. Amet consectetur adipiscing elit duis tristique sollicitudin nibh sit.',
    @drid,
    @pid0);


select @pid1 := LAST_INSERT_ID();

-- insert votes

insert into vote (user_id, posting_id, isupvote) values (@ecid,  @pid1, true);


insert into posting
    (timestamp, content, author_id, parent_id)
  values    
    ('2018-02-01 15:44:30',
    'Egestas tellus rutrum tellus pellentesque eu tincidunt tortor aliquam nulla.',
    @mhid,
    @pid0);

select @pid1 := LAST_INSERT_ID();

 -- insert votes

insert into vote (user_id, posting_id, isupvote) values (@nwid,  @pid1, true);



-- insert posts for dr@bell.org
insert into posting
    (timestamp, title, content, author_id)
  values
    ('2018-01-30 03:51:53',
    'Assumenda Saepe Non',
    'Eu lobortis elementum nibh tellus. Arcu dictum varius duis at consectetur. Tempus urna et pharetra pharetra massa massa ultricies mi quis. Enim eu turpis egestas pretium aenean pharetra magna ac placerat. Fames ac turpis egestas maecenas pharetra. Turpis massa sed elementum tempus egestas. Consectetur libero id faucibus nisl tincidunt eget. Lorem mollis aliquam ut porttitor leo. Volutpat ac tincidunt vitae semper quis lectus nulla at volutpat.',
    @drid);


select @pid0 := LAST_INSERT_ID();

-- insert votes

insert into vote (user_id, posting_id, isupvote) values (@gbid,  @pid0, true);     

insert into posting
    (timestamp, title, content, author_id)
  values
    ('2018-02-09 02:49:36',
    'recusandae est consequatur',
    'Gravida neque convallis a cras semper auctor neque vitae. Quis eleifend quam adipiscing vitae. Erat velit scelerisque in dictum non consectetur a erat. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Donec ultrices tincidunt arcu non sodales neque sodales.',
    @drid);

select @pid0 := LAST_INSERT_ID();

-- insert votes

insert into vote (user_id, posting_id, isupvote) values (@ecid,  @pid0, false);


-- insert posts for mh@bbc.co.uk
-- post with subposts
-- parent post
insert into posting
    (timestamp, title, content, author_id)
  values
    ('2018-02-21 12:00:20',
    'Consequatur Itaque Nesciunt',
    'Blandit volutpat maecenas volutpat blandit aliquam etiam erat velit. Dignissim enim sit amet venenatis urna cursus. Tellus molestie nunc non blandit massa enim nec dui nunc. Rhoncus est pellentesque elit ullamcorper dignissim.',
    @mhid);


select @pid0 := LAST_INSERT_ID();

-- insert votes

insert into vote (user_id, posting_id, isupvote) values (@nwid,  @pid0, false);

-- child posts
insert into posting
    (timestamp, content, author_id, parent_id)
  values
    ('2018-02-27 06:06:20', 
    'Odio aenean sed adipiscing diam donec adipiscing tristique risus.',
    @ecid,
    @pid0);

select @pid1 := LAST_INSERT_ID();

-- insert votes

insert into vote (user_id, posting_id, isupvote) values (@nwid,  @pid1, true);

insert into posting
    (timestamp, content, author_id, parent_id)
  values
    ('2018-02-27 06:06:20', 
    'Sed egestas egestas fringilla phasellus faucibus scelerisque eleifend. Scelerisque fermentum dui faucibus in.',
    @ecid,
    @pid0);

select @pid1 := LAST_INSERT_ID();

-- insert votes

insert into vote (user_id, posting_id, isupvote) values (@nwid,  @pid1, true);    

insert into posting
    (timestamp, content, author_id, parent_id)
  values
    ('2018-03-01 02:42:00', 
    'Et tortor at risus viverra adipiscing at. Tristique risus nec feugiat in fermentum posuere urna. Gravida rutrum quisque non tellus. Sed ullamcorper morbi tincidunt ornare massa. Odio aenean sed adipiscing diam donec adipiscing tristique risus. In nisl nisi scelerisque eu. Eu turpis egestas pretium aenean pharetra magna ac. Aliquet lectus proin nibh nisl condimentum id. Laoreet sit amet cursus sit amet dictum sit amet. Risus in hendrerit gravida rutrum.',
    @nwid,
    @pid0);

select @pid1 := LAST_INSERT_ID();

-- insert votes

insert into vote (user_id, posting_id, isupvote) values (@drid,  @pid1, false);


-- grand-child posts
insert into posting
    (timestamp, content, author_id, parent_id)
  values    
    ('2018-03-02 22:30:11', 
    'Commodo quis imperdiet massa tincidunt nunc pulvinar. Tellus id interdum velit laoreet id. Iaculis nunc sed augue lacus viverra vitae congue eu. Penatibus et magnis dis parturient montes nascetur. Interdum velit euismod in pellentesque. Sed adipiscing diam donec adipiscing tristique risus nec feugiat in. Odio ut enim blandit volutpat maecenas volutpat. Mattis nunc sed blandit libero volutpat. Aliquam purus sit amet luctus venenatis lectus magna fringilla urna. In iaculis nunc sed augue. Diam phasellus vestibulum lorem sed risus ultricies tristique nulla aliquet.',
    @ecid,
    @pid1);

select @pid2 := LAST_INSERT_ID();

-- insert votes

insert into vote (user_id, posting_id, isupvote) values (@nwid,  @pid2, true);    

insert into posting
    (timestamp, content, author_id, parent_id)
  values
    ('2018-03-03 12:15:07', 
    'Tincidunt tortor aliquam nulla facilisi. Imperdiet sed euismod nisi porta lorem mollis aliquam ut porttitor. Ut porttitor leo a diam. Tincidunt ornare massa eget egestas purus.',
    @ecid,
    @pid1);

select @pid2 := LAST_INSERT_ID();

-- insert votes

insert into vote (user_id, posting_id, isupvote) values (@nwid,  @pid2, true);     

  -- grand-grand-child posts
insert into posting
    (timestamp, content, author_id, parent_id)
  values   
    ('2018-03-04 16:50:13', 
    'Auctor eu augue ut lectus. Purus in mollis nunc sed id semper risus. At urna condimentum mattis pellentesque id nibh tortor id aliquet. Diam donec adipiscing tristique risus nec feugiat in.',
    @mhid,
    @pid2);

select @pid3 := LAST_INSERT_ID();

-- insert votes

insert into vote (user_id, posting_id, isupvote) values (@nwid,  @pid3, true);     

insert into posting
    (timestamp, content, author_id, parent_id)
  values
    ('2018-03-04 05:04:14', 
    'Fermentum dui faucibus in ornare quam viverra orci. Tincidunt vitae semper quis lectus nulla at.',
    @drid,
    @pid2);

select @pid3 := LAST_INSERT_ID();

-- insert votes

insert into vote (user_id, posting_id, isupvote) values (@nwid,  @pid3, true);     

insert into posting
    (timestamp, content, author_id, parent_id)
  values
    ('2018-03-05 07:17:17', 
    'Ultrices neque ornare aenean euismod elementum nisi quis eleifend quam. Sem viverra aliquet eget sit amet tellus. Aliquam faucibus purus in massa tempor nec feugiat nisl.',
    @nwid,
    @pid2);   

select @pid3 := LAST_INSERT_ID();

-- insert votes

insert into vote (user_id, posting_id, isupvote) values (@drid,  @pid3, true);     


insert into posting
    (timestamp, title, content, author_id)
  values
    ('2018-01-17 11:14:26',
    'Inventore Qui Explicabo',
    'Eu mi bibendum neque egestas congue. A cras semper auctor neque vitae tempus quam pellentesque.',
    @mhid);       

select @pid0 := LAST_INSERT_ID();

-- insert votes

insert into vote (user_id, posting_id, isupvote) values (@nwid,  @pid0, true);

insert into posting
    (timestamp, title, content, author_id)
  values
    ('2017-12-11 06:15:30',
    'Vel Alias Repellat',
    'Pharetra massa massa ultricies mi quis. Id aliquet lectus proin nibh nisl condimentum id venenatis a. Aliquet bibendum enim facilisis gravida neque convallis a cras. Scelerisque mauris pellentesque pulvinar pellentesque. Auctor neque vitae tempus quam pellentesque nec nam aliquam. Tellus mauris a diam maecenas sed enim. Tempor id eu nisl nunc.',
    @mhid); 

select @pid0 := LAST_INSERT_ID();

-- insert votes

insert into vote (user_id, posting_id, isupvote) values (@nwid,  @pid0, false);
      



commit;