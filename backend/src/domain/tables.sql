`create table if not exists Users (
UID int auto_increment primary key,
User_Type tinyint(1),
email varchar(50) unique,
phone varchar(10),
password varchar(100),
CREATED_AT TIMESTAMP default CURRENT_TIMESTAMP(),
UPDATED_AT TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP()
);

create table if not exists Assignment_Details 
(
Aid varchar(50) primary key,
status enum('SCHEDULED','ONGOING') default 'SCHEDULED',
Description text,
title varchar(100),
file varchar(400),
publish_Date timestamp default current_timestamp(),
deadline_date timestamp,
created_by int not null,
created_at timestamp default current_timestamp(),
updated_at TIMESTAMP default CURRENT_TIMESTAMP() on update CURRENT_TIMESTAMP()
);

create table if not exists Assigned  (
Aid varchar(50),
SID int,
status enum ('SUBMITTED', 'PENDING', 'OVERDUE') default 'PENDING',
file varchar(400),
created_at TIMESTAMP default CURRENT_TIMESTAMP(),
updated_at TIMESTAMP default CURRENT_TIMESTAMP on update CURRENT_TIMESTAMP(),
primary key(AID,SID),
foreign key(AID) references Assignment_Details(AID) on delete cascade,
foreign key(SID) references Users(UID) on delete cascade
);`