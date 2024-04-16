create database doccoming -- drop database doccoming
;
use doccoming
;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123123123';
flush privileges;

create table account(
id int not null primary key AUTO_INCREMENT,
LastName nvarchar(20) not null CHECK (LastName !=""),
FirstName nvarchar(25) not null CHECK (FirstName !=""),
BirthDate date,
Gender varchar(30),
Address nvarchar(300),
Email varchar(50) not null UNIQUE CHECK (Email !=""),
Phone varchar(15) null,
Avt varchar(200),
Authorization int default 1 
)
;
ALTER TABLE account AUTO_INCREMENT = 235523484;
insert into account (LastName, FirstName, Email, Phone, Authorization) value 
('admin', 'admin', 'admin@doccoming.com', 0123456789, 0),
('Bac', 'Si', 'doctor@doccoming.com', 0123456789, 2),
('Benh', 'Nhan', 'patient@doccoming.com', 0123456789, 1);
-- drop table account;

create table authorization(
id int not null primary key,
Role varchar(20) not null CHECK (Role !="")
)
;
-- drop table authorization;
insert into authorization (id, Role) values 
(0, 'Admin'),
(1, 'Patient'),
(2, 'doctor');

create table major(
id int not null primary key AUTO_INCREMENT,
Major nvarchar(40) not null CHECK (Major !="")
)
;
insert into major (Major) values 
('Bác sĩ gia đình'),
('Bệnh truyền nhiễm'),
('Chẩn đoán hình ảnh'),
('Da liễu'),
('Điều dưỡng'), ('Dinh dưỡng'), ('Hồi sức cấp cứu'),
('Huyết học'),
('Lão khoa'),
('Ngoại khoa'),
('Nha khoa'),
('Nhãn khoa'),
('Nhi khoa'),
('Nội hô hấp'),
('Sản/Phụ khoa'),
('Tai mũi họng'),
('Tâm thần học'),
('Tim mạch'), ('Ung bướu');

create table majorDoctor(
id int not null primary key AUTO_INCREMENT,
idAccount int,
idMajor int,
foreign key (idAccount) references account(id),
foreign key (idMajor) references major(id)
)
;
insert into majorDoctor (idAccount, idMajor) values 
(235523485, 1);

create table service(
id int not null primary key AUTO_INCREMENT,
Service nvarchar(100),
Description text
)
; -- drop table service
insert into service (Service, Description) values
('Thăm khám và tư vấn', 'Tới nhà thăm khám và tư vấn bệnh tình'),
('Trị liệu tâm lí', 'Một buổi trị liệu tâm lí riêng biệt'),
('Khí dung xông mũi họng', 'Dành cho các bệnh nhân gặp vấn đề về hô hấp, nghẹt mũi'),
('Truyền dịch khoáng chất', 'Truyền dịch ngay tại nhà với các bác sĩ chuyên nghiệp'),
('Dịch vụ thay băng, lấy mẫu tại nhà', 'Thay băng, lấy mẫu xét nghiệm tại nhà cho các bệnh nhân khó di chuyển, kết quả xét nghiệm sẽ do bác sĩ quản lí và thông báo cho bệnh nhân'),
('Xét nghiệm test nhanh HIV', 'Xét nghiệm HIV'),
('Xét nghiệm Giang Mai', 'Xét nghiệm giang mai'),
('Tiêm thuốc tránh thai', 'Tiêm thuốc tránh thai tại nhà'),
('Xét nghiệm tầm soát STD', 'Xét nghiệm và xác định các bệnh lây qua đường tình dục'),
('Đo khúc xạ', 'Đo khúc xạ ngay tại nhà, và đặt mua kính cận thị, viễn thị thông qua bác sĩ'),
('Cắt bao quy đầu', 'Cắt bao quy đầu nhanh chóng, tiện ích, riêng tư ngay tại nhà');

create table categories(
id int not null primary key AUTO_INCREMENT,
Categories nvarchar(100) not null CHECK (Categories !="")
)
;
insert into categories (id, Categories) values 
(1, 'Tiểu đường'),
(2, 'Bệnh tim mạch'),
(3, 'Bệnh hô hấp'),
(4, 'Ung thư - Ung bướu'),
(5, 'Bệnh tiêu hóa'),
(6, 'Tâm lí - Tâm thần'),
(7, 'Da liễu'),
(8, 'Dị ứng'),
(9, 'Bệnh cơ xương khớp'),
(10, 'Bệnh về máu'),
(11, 'Bệnh truyền nhiễm'),
(12, 'Sức khỏe mắt'), 
(13, 'Bệnh về não và Hệ thần kinh'),
(14, 'Ăn uống lành mạnh'),
(15, 'Thể dục thể thao'),
(16, 'Thuốc và thực phẩm chức năng'),
(17, 'Dược liệu'),
(18, 'Mang thai'),
(19, 'Nuôi day con'),
(20, 'Bệnh tai mũi họng'),
(21, 'Sức khỏe phụ nữ'),
(22, 'Sức khỏe'),
(23, 'Chăm sóc giấc ngủ'),
(24, 'Thói quen lành mạnh'),
(25, 'Sức khỏe nam giới'),
(26, 'Sức khỏe răng miệng'),
(27, 'Lão hóa lành mạnh'),
(28, 'Sức khỏe tình dục'),
(29, 'Bệnh thận và đường tiết niệu') ;

create table post(
id int not null primary key AUTO_INCREMENT,
FeaturedImage varchar(300),
Title nvarchar(200) not null CHECK (Title !=""),
Brief nvarchar(400) not null CHECK (Brief !=""),
Content text(4000) not null CHECK (Content !=""),
Images varchar(300),
idAuthor int,
DatePost datetime,
idCategories int,
Status int default 0, -- 0 chờ duyệt, 1 hiển thị trên site, 2 ẩn
foreign key (idAuthor) references account(id),
foreign key (idCategories) references categories(id) 
)
;-- drop table post;



create table appointment(
id int not null primary key AUTO_INCREMENT,
idService int  not null CHECK (idService !=""),
idPatient int  not null CHECK (idPatient !=""),
idDoctor int  not null CHECK (idDoctor !=""),
DateBooking date,
TimeBooking TIME,
Price double not null,
Status int default 0, -- 0 đang chờ bác sĩ chấp nhận, 1 bác sĩ đã chấp nhận, 2 đã hoàn thành, 3 cuộc hẹn bị hủy 
Information text(1000),
foreign key (idPatient) references account(id),
foreign key (idService) references service(id),
foreign key (idDoctor) references account(id) 
)
; -- drop table appointment

create table servicedoctor(
id int not null primary key AUTO_INCREMENT,
idService int  not null CHECK (idService !=""),
idDoctor int  not null CHECK (idDoctor !=""),
EstimatedTime TIME,
Status int default 0, -- 0 hiển thị dịch vụ, 1 doctor ẩn dịch vụ  
foreign key (idService) references service(id),
foreign key (idDoctor) references account(id) 
)
; -- drop table servicedoctor

insert into servicedoctor (idService, idDoctor, EstimatedTime) values 
(1, 235523485, "01:00"),
(2, 235523485, "01:30"),
(3, 235523485, "00:30");

create table schedule(
id int not null primary key AUTO_INCREMENT,
idDoctor int  not null CHECK (idDoctor !=""),
FreeTimeStart TIME,
FreeTimeFinish TIME,
SpecificDate Date default null,
foreign key (idDoctor) references account(id) 
)
; -- drop table schedule
insert into schedule (idDoctor, FreeTimeStart, FreeTimeFinish) values 
(235523485, "17:00", "20:30"),
(235523485, "08:30", "11:30");

create table notification(
id int not null primary key AUTO_INCREMENT,
idAccount int not null CHECK (idAccount !=""),
Notification text(500),
NotiTime datetime,
Status int default 0, -- 0 chưa đọc, 1 đọc rồi
foreign key (idAccount) references account(id)
);


-- ------------------------------------------------------------------------------------------------------
delimiter $$
CREATE TRIGGER TG_DELETE_ACCOUNT before DELETE ON account FOR EACH ROW 
BEGIN
    DELETE FROM majorDoctor
    WHERE idAccount = old.id;
    DELETE FROM post
    WHERE idAuthor = old.id;
    DELETE FROM appointment
    WHERE idPatient = old.id AND idDoctor = old.id;
    DELETE FROM notification
    WHERE idAccount = old.id;
END$$ -- drop TRIGGER TG_DELETE_ACCOUNT

delimiter $$
CREATE TRIGGER TG_CHECK_EMAIL BEFORE INSERT ON account FOR EACH ROW 
BEGIN
    DECLARE Count int default 0;
    SET Count = (SELECT COUNT(*) FROM account WHERE Email = new.Email);
    IF Count > 0
    THEN SIGNAL sqlstate '45001' set message_text = "Email đã được dùng để đăng kí tài khoản!";
    END IF;
END$$

-----------------------------------


delimiter $$
CREATE VIEW AllPost AS
SELECT *
FROM post;
$$

delimiter $$
CREATE VIEW AvailablePost AS
SELECT *
FROM post
WHERE Status = 1;
$$

 delimiter $$
CREATE VIEW AllAccount AS
SELECT ta.id, ta.FirstName, ta.LastName, ta.BirthDate, ta.Address, ta.Email, ta.Phone, ta.Avt, ta.Role, dm.Major
FROM
(SELECT a.id, a.FirstName, a.LastName, a.BirthDate, a.Address, a.Email, a.Phone, a.Avt, t.Role
FROM account a, authorization t
WHERE a.Authorization = t.id) as ta
LEFT JOIN
(SELECT d.idAccount, m.Major
FROM  majorDoctor d, major m
WHERE d.idMajor = m.id) as dm
ON ta.id = dm.idAccount
 $$ -- drop view AllAccount

 delimiter $$
CREATE VIEW AllAppointment AS
SELECT *
FROM appointment;
 $$
 ------
-------------------------------
 DELIMITER $$ 
CREATE PROCEDURE PostDetailById (IN id int)
BEGIN
    SELECT * 
    FROM post 
    WHERE id = id AND Status = 1;
END$$ -- drop PROCEDURE PostDetailById

DELIMITER $$
CREATE PROCEDURE ListSearch(IN search text )
BEGIN
    SELECT *
    FROM  account a, categories c, post p
    WHERE p.Status = 1 
    AND p.idCategories = c.id 
    AND a.id = p.idAuthor 
    AND (a.LastName like  search  or a.FirstName like search or c.Categories like search or p.Title like search 
    or  p.Brief like search or p.Content like search) ;
END$$

DELIMITER $$
CREATE PROCEDURE ListSearchService(IN search text )
BEGIN
    SELECT *
    FROM  service
    WHERE Service like  search  or Description like  search;
END$$ -- drop PROCEDURE ListSearchService

DELIMITER $$ 
CREATE PROCEDURE UpdateStatusPost (IN idP int)
BEGIN
	
    DECLARE statusP INT;
    SET statusP = (SELECT Status
    FROM post
    WHERE id = idP);
    
	IF statusP = 1
    THEN 
    UPDATE post SET Status = 2
    WHERE id = idP ;
	ELSE
	UPDATE post SET Status = 1
    WHERE id = idP;
    END IF;
END$$

DELIMITER $$ 
CREATE PROCEDURE ScheduleById (IN idDoctor int, IN DateBooking date)
BEGIN
	SELECT a.id, sd.EstimatedTime, a.TimeBooking
    FROM servicedoctor sd, appointment a
    WHERE a.DateBooking = DateBooking and a.idDoctor = idDoctor and a.idDoctor = sd.idDoctor and sd.idService = a.idService and a.Status = 1;
END$$ -- drop PROCEDURE ScheduleById

