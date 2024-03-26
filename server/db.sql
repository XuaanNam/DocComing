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
Address nvarchar(300),
Email varchar(50) not null UNIQUE CHECK (Email !=""),
PassWord nvarchar(100) not null CHECK (PassWord !=""),
Phone varchar(15) not null,
Avt varchar(200),
Authorization int default 1 
)
;
ALTER TABLE account AUTO_INCREMENT = 235523484;
insert into account (LastName, FirstName, Email, PassWord, Phone, Authorization) value 
('admin', 'admin', 'admin@doccoming.com', '$2b$10$49gaTiDL9JLsckTIXI2cDekBBDBcHQrwf/oS5yLLr/KPVl6P4APJW', 0123456789, 0),
('Bac', 'Si', 'doctor@doccoming.com', '$2b$10$49gaTiDL9JLsckTIXI2cDekBBDBcHQrwf/oS5yLLr/KPVl6P4APJW', 0123456789, 2),
('Benh', 'Nhan', 'patient@doccoming.com', '$2b$10$49gaTiDL9JLsckTIXI2cDekBBDBcHQrwf/oS5yLLr/KPVl6P4APJW', 0123456789, 1);
-- drop table account;

create table authorization(
id int not null primary key AUTO_INCREMENT,
idAccount int ,
Role varchar(20) not null CHECK (Role !=""),
foreign key (idAccount) references account(id)
)
;
-- drop table authorization;
insert into authorization (idAccount, Role) values 
(235523484, 'Admin'),
(235523486, 'Patient'),
(235523485, 'doctor');

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

create table post(
id int not null primary key AUTO_INCREMENT,
FeaturedImage varchar(300),
Title nvarchar(200) not null CHECK (Title !=""),
Brief nvarchar(400) not null CHECK (Brief !=""),
Content text(4000) not null CHECK (Content !=""),
Images varchar(300),
Status int default 0 -- 0 chờ duyệt, 1 hiển thị trên site, 2 ẩn
)
;-- drop table post;

create table categories(
id int not null primary key AUTO_INCREMENT,
Categories nvarchar(100) not null CHECK (Categories !="")
)
;
insert into categories (Categories) values 
('Tiểu đường'),
('Bệnh tim mạch'),
('Bệnh hô hấp'),
('Ung thư - Ung bướu'),
('Bệnh tiêu hóa'),
('Tâm lí - Tâm thần'),
('Da liễu'),('Sức khỏe tình dục'),
('Dị ứng'),
('Bệnh cơ xương khớp'),
('Bệnh về máu'),
('Bệnh truyền nhiễm'),
('Sức khỏe mắt'), ('Bệnh thận và đường tiết niệu'), 
('Bệnh về não và Hệ thần kinh'),
('Ăn uống lành mạnh'),
('Thể dục thể thao'),
('Thuốc và thực phẩm chức năng'),
('Dược liệu'),
('Mang thai'),
('Nuôi day con'),
('Bệnh tai mũi họng'),
('Sức khỏe phụ nữ'),
('Sức khỏe'),
('Chăm sóc giấc ngủ'),
('Thói quen lành mạnh'),
('Sức khỏe nam giới'),
('Sức khỏe răng miệng'),
('Lão hóa lành mạnh') ;

create table appointment(
id int not null primary key AUTO_INCREMENT,
idService int  not null CHECK (idService !=""),
idPatient int  not null CHECK (idPatient !=""),
idDoctor int  not null CHECK (idDoctor !=""),
DateBooking date,
Price double not null,
Status int default 0, -- 2 cuộc hẹn bị hủy, 1 bác sĩ đã xác nhận, 0 đang chờ bác sĩ chấp nhận
Information text(1000),
foreign key (idPatient) references account(id),
foreign key (idService) references service(id),
foreign key (idDoctor) references account(id) 
)
; -- drop table appointment

create table notification(
id int not null primary key AUTO_INCREMENT,
idAccount int not null CHECK (idAccount !=""),
Notification text(500),
NotiTime datetime,
Status int default 0, -- 0 chưa đọc, 1 đọc rồi
foreign key (idAccount) references account(id)
);
