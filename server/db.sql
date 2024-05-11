create database doccoming -- drop database doccoming
;
use doccoming
;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123123123';
flush privileges;

create table account(
id int not null primary key AUTO_INCREMENT,
LastName nvarchar(20),
FirstName nvarchar(25),
BirthDate date,
Gender varchar(30),
Address nvarchar(300),
Email varchar(50) not null UNIQUE CHECK (Email !=""),
PassWord varchar(200) not null ,
Phone varchar(15) null,
Avt varchar(200),
Authorization int default 1 
)
;
ALTER TABLE account AUTO_INCREMENT = 235523484;
insert into account (LastName, FirstName, Email, PassWord, Phone, Authorization) value 
('admin', 'admin', 'admin@doccoming.com', "$2b$07$agI47Yp3nBMhrz7oNNkMA.hfqPTbmWpnxGCuqmm8k11bbSr.1Zici", 0123456789, 0),
('Bac', 'Si', 'doctor@doccoming.com', "$2b$07$agI47Yp3nBMhrz7oNNkMA.hfqPTbmWpnxGCuqmm8k11bbSr.1Zici", 0123456789, 2),
('Benh', 'Nhan', 'patient@doccoming.com', "$2b$07$agI47Yp3nBMhrz7oNNkMA.hfqPTbmWpnxGCuqmm8k11bbSr.1Zici", 0123456789, 1);
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

create table inforDoctor(
id int not null primary key AUTO_INCREMENT,
idAccount int,
Degree varchar(30), -- trình độ
Introduce varchar(150), -- giới thiệu
idMajor int,
foreign key (idAccount) references account(id),
foreign key (idMajor) references major(id)
)
;
insert into inforDoctor (idAccount, Degree, Introduce, idMajor) values 
(235523485, "Tiến Sĩ", "Chuyên Ngành Tim Mạch", 1);

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
(29, 'Bệnh thận và đường tiết niệu') 
;

create table similarCategories (
id int not null primary key AUTO_INCREMENT,
idCategories int,
Similar nvarchar(100) not null
-- foreign key (idCategories) references categories(id)
); -- drop table similarCategories

insert into similarCategories (idCategories, Similar) values 
(1, "Đái Tháo đường"),
(1, "Sỏi Thận"),
(1, "Suy gan");

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


create table appointmentstatus(
id int not null primary key AUTO_INCREMENT,
Type nvarchar(200)
)
; -- drop table appointmentstatus
insert into appointmentstatus (id, Type) values(1, "success"),  (2, "warning"),  (3, "error"), (4, "waiting");

create table appointment(
id int not null primary key AUTO_INCREMENT,
idService int  not null CHECK (idService !=""),
idPatient int  not null CHECK (idPatient !=""),
idDoctor int  not null CHECK (idDoctor !=""),
DateBooking date,
TimeBooking TIME,
Price double not null,
Status int default 4, -- 4 đang chờ bác sĩ chấp nhận, 1 bác sĩ đã chấp nhận, 2 đã hoàn thành, 3 cuộc hẹn bị hủy 
Information text(1000),
foreign key (idPatient) references account(id),
foreign key (idService) references service(id),
foreign key (idDoctor) references account(id),
foreign key (Status) references appointmentstatus(id)
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
idDoctor int  not null,
FirstShiftStart TIME,
FirstShiftEnd TIME,
SecondShiftStart TIME,
SecondShiftEnd TIME,
ThirdShiftStart TIME,
ThirdShiftEnd TIME,
SpecificDay Date default null,
Status int default 1,    			-- 0 lịch mặc định cửa bác sĩ, 1 lịch theo ngày cụ thể 
foreign key (idDoctor) references account(id) 
)
; -- drop table schedule
insert into schedule (idDoctor, FirstShiftStart, FirstShiftEnd, SecondShiftStart, SecondShiftEnd) values 
(235523485, "08:30", "11:30", "17:00", "20:30");

create table notification(
id int not null primary key AUTO_INCREMENT,
idAccount int not null CHECK (idAccount !=""),
Notification text(500),
NotiTime datetime,
Status int default 0, -- 0 chưa đọc, 1 đọc rồi
foreign key (idAccount) references account(id)
);

create table comment(
id int not null primary key AUTO_INCREMENT,
idAccount int not null ,
idPost int not null ,
Cmt text(500),
NotiTime datetime,
Status int default 0, -- 0 chưa chỉnh sửa, 1 đã chỉnh sửa
foreign key (idAccount) references account(id),
foreign key (idPost) references post(id)
);
-- ------------------------------------------------------------------------------------------------------
delimiter $$
CREATE TRIGGER TG_DELETE_ACCOUNT before DELETE ON account FOR EACH ROW 
BEGIN
    DELETE FROM inforDoctor
    WHERE idAccount = old.id;
    DELETE FROM post
    WHERE idAuthor = old.id;
    DELETE FROM appointment
    WHERE idPatient = old.id or idDoctor = old.id;
    DELETE FROM notification
    WHERE idAccount = old.id;
END$$ -- drop TRIGGER TG_DELETE_ACCOUNT    chưa xử lý xonggg

delimiter $$
CREATE TRIGGER TG_INSERT_ACCOUNT_DOCTOR AFTER INSERT ON account FOR EACH ROW 
BEGIN
	if (new.Authorization = 2)
    then
    insert into schedule (idDoctor, Status) values 
	(new.id, 0);
    end if;
END$$

delimiter $$
CREATE TRIGGER TG_CHECK_EMAIL BEFORE INSERT ON account FOR EACH ROW 
BEGIN
    DECLARE Count int default 0;
    SET Count = (SELECT COUNT(*) FROM account WHERE Email = new.Email);
    IF Count > 0
    THEN SIGNAL sqlstate '45001' set message_text = "Email đã được dùng để đăng kí tài khoản!";
    END IF;
END$$

--------------------------------

delimiter $$
CREATE VIEW AllPost AS
SELECT *
FROM post;
 $$ -- drop view AllPost
 
delimiter $$
CREATE VIEW AvailablePost AS
	SELECT p.id, p.FeaturedImage, p.Title, p.Brief, p.Content, p.DatePost, a.FirstName, a.LastName, a.Avt, c.Categories
    FROM post p, account a, categories c
    WHERE p.idAuthor = a.id and p.idCategories = c.id AND p.Status = 1;
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
FROM  inforDoctor d, major m
WHERE d.idMajor = m.id) as dm
ON ta.id = dm.idAccount
 $$ -- drop view AllAccount

delimiter $$
CREATE VIEW AllAppointment AS
SELECT *
FROM appointment;
 $$
 -------------------------------------------------
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
CREATE PROCEDURE PostDetailById (IN id int)
BEGIN
    SELECT p.id, p.FeaturedImage, p.Title, p.Brief, p.Content, p.DatePost, a.FirstName, a.LastName, a.Avt, i.Degree, c.Categories
    FROM post p, account a, categories c, inforDoctor i
    WHERE p.idAuthor = a.id and p.idCategories = c.id and a.id = i.idAccount and p.id = id AND p.Status = 1;
END$$ -- drop PROCEDURE PostDetailById

DELIMITER $$
CREATE PROCEDURE PostByCategories(IN id int )
BEGIN
    SELECT p.id, p.FeaturedImage, p.Title, p.Brief, p.Content, p.DatePost, a.FirstName, a.LastName, a.Avt, i.Degree
    FROM post p, account a, inforDoctor i 
    WHERE p.idAuthor = a.id and a.id = i.idAccount and p.idCategories = id AND p.Status = 1;
END$$ 

DELIMITER $$
CREATE PROCEDURE ListSearch(IN search text )
BEGIN
    SELECT a.LastName, a.FirstName, c.Categories, p.Title, p.Brief, p.Content, p.id, p.idAuthor, p.DatePost
    FROM  account a, categories c, post p
    WHERE p.Status = 1 
    AND p.idCategories = c.id 
    AND a.id = p.idAuthor 
    AND (a.LastName like  search  or a.FirstName like  search or c.Categories like search or p.Title like search 
    or  p.Brief like search or p.Content like search) ;
END$$ -- drop PROCEDURE ListSearch

DELIMITER $$
CREATE PROCEDURE ListSearchService(IN search text )
BEGIN
    SELECT *
    FROM  service
    WHERE Service like  search  or Description like  search;
END$$ -- drop PROCEDURE ListSearchService

DELIMITER $$ 
CREATE PROCEDURE AppointmentData (IN idDoctor int, IN DateBooking date)
BEGIN
	SELECT a.id, sd.EstimatedTime, a.TimeBooking
    FROM servicedoctor sd, appointment a
    WHERE a.DateBooking = DateBooking and a.idDoctor = idDoctor and a.idDoctor = sd.idDoctor and sd.idService = a.idService and a.Status = 1
    ORDER BY a.TimeBooking asc;
END$$ -- drop PROCEDURE AppointmentData 

DELIMITER $$ 
CREATE PROCEDURE ScheduleData (IN idDoctor int, IN DateBooking date)
BEGIN
	declare COUNT INT default 0;
    SET COUNT = (select count(*) from schedule where SpecificDay = DateBooking);
    IF (COUNT >  0)
    THEN 
    SELECT id, FirstShiftStart, FirstShiftEnd, SecondShiftStart, SecondShiftEnd, ThirdShiftStart, ThirdShiftEnd, SpecificDay
    FROM schedule s
    WHERE s.idDoctor = idDoctor and s.SpecificDay = DateBooking;
    ELSE
    SELECT id, FirstShiftStart, FirstShiftEnd, SecondShiftStart, SecondShiftEnd, ThirdShiftStart, ThirdShiftEnd, SpecificDay
    FROM schedule s
    WHERE s.idDoctor = idDoctor and status = 0;
    END IF;
END$$ -- drop PROCEDURE ScheduleData