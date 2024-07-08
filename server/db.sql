create database doccoming -- drop database doccoming
;
use doccoming
;
ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY '123123123';
flush privileges;

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
Authorization int default 1,
CreatedAt date not null,
foreign key (Authorization) references authorization(id)
)
; 
ALTER TABLE account AUTO_INCREMENT = 235523484;
insert into account (LastName, FirstName, Email, PassWord, Phone, Authorization, CreatedAt) value 
('SUPER', 'ADMIMN', 'admin@doccoming.com', "$2b$07$agI47Yp3nBMhrz7oNNkMA.hfqPTbmWpnxGCuqmm8k11bbSr.1Zici", 0123456789, 0, now()),
('Dung', 'Nguyễn Thị Kim', 'kimdung@gmail.com', "$2b$07$agI47Yp3nBMhrz7oNNkMA.hfqPTbmWpnxGCuqmm8k11bbSr.1Zici", 0123456789, 2, now()),
('Lâm', 'Nguyễn Sơn', 'sonlamg@gmail.com', "$2b$07$agI47Yp3nBMhrz7oNNkMA.hfqPTbmWpnxGCuqmm8k11bbSr.1Zici", 0123456789, 2, now()),
('Nghi', 'Lê Hoàng Hạnh', 'hanhnghig@gmail.com', "$2b$07$agI47Yp3nBMhrz7oNNkMA.hfqPTbmWpnxGCuqmm8k11bbSr.1Zici", 0123456789, 2, now()),
('Hiếu', 'Trương Quang', 'quanghieu@gmail.com', "$2b$07$agI47Yp3nBMhrz7oNNkMA.hfqPTbmWpnxGCuqmm8k11bbSr.1Zici", 0123456789, 2, now());
-- drop table account;



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
('Điều dưỡng'), 
('Dinh dưỡng'),
 ('Hồi sức cấp cứu'),
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
('Tim mạch'),
('Ung bướu'),
('Đa khoa');
create table inforDoctor(
id int not null primary key AUTO_INCREMENT,
idAccount int,
Degree varchar(30), -- trình độ
Introduce varchar(1500), -- giới thiệu
idMajor int,
Experience int, 
Training varchar(100),
foreign key (idAccount) references account(id),
foreign key (idMajor) references major(id)
)
; -- drop table inforDoctor
INSERT INTO `doccoming`.`infordoctor` (`idAccount`, `Degree`, `Introduce`, `idMajor`, `Experience`, `Training`) VALUES ('235523486', 'Thạc sĩ Y khoa', '<ul><li>ThS. BS. CKI. Nguyễn Thị Kim Dung có 7 năm kinh nghiệm trong lĩnh vực Nhãn khoa, có chuyên môn sâu về điều trị bệnh lý về mi Mắt và bề mặt Nhãn cầu, bệnh lý kết giác mạc và một số bệnh lý khác (màng bồ đào, dịch kính, võng mạc,...).</li></ul><p><br></p><ul><li>ThS. BS. CKI. Nguyễn Thị Kim Dung đang công tác tại Bệnh viện Mắt Thành phố Hồ Chí Minh. Bác sĩ Dung đã tham giá các lớp đào tạo nâng cao chuyên môn được tổ chức trong nước.</li></ul><p><br></p><ul><li>ThS. BS. CKI. Nguyễn Thị Kim Dung hiện là bác sĩ điều trị Mắt của Phòng khám Đa khoa Jio Health.</li></ul><p><strong>Quá trình công tác</strong></p><ul><li>2018 - nay&nbsp;: Bệnh viện Mắt Thành phố Hồ Chí Minh.</li></ul><p><br></p><p><strong>Đào tạo</strong></p><ul><li>2015 - 2018:&nbsp;Bác sĩ Nội trú, Thạc sĩ Nhãn khoa, Đại học Y Dược Thành phố Hồ Chí Minh.</li></ul><p><br></p><ul><li>2009 - 2015: Bác sĩ Đa khoa, Đại học Y Khoa Phạm Ngọc Thạch.</li></ul>', '12', '7', 'Đại học Y dược thành phố Hồ Chí Minh');
INSERT INTO `doccoming`.`infordoctor` (`idAccount`, `Degree`, `Introduce`, `idMajor`, `Experience`, `Training`) VALUES ('235523487', 'Thạc sĩ Y Khoa', '<ul><li>ThS. BS. CKI. Nguyễn Sơn Lâm có 12 năm kinh nghiệm trong lĩnh vực Nội - Nội Thận, có chuyên môn sâu về điều trị bệnh Thận, nhiễm trùng đường niệu và các bệnh lý Nội khoa tổng quát.</li></ul><p><br></p><ul><li>ThS. BS. CKI. Nguyễn Sơn Lâm hiện đang công tác tại Bệnh viện Chợ Rẫy và Đại học Y Dược Thành phố Hồ Chí Minh. Bác sĩ Lâm đã tham gia các lớp đào tạo tập huấn nâng cao chuyên môn chuyên ngành Nội Thận và Y Học Gia Đình được tổ chức trong nước.</li></ul><p><br></p><p><strong>Quá trình công tác</strong></p><ul><li>2015 - nay:&nbsp;Khoa Khám bệnh, Đại học Y Dược Thành phố Hồ Chí Minh.</li></ul><p><br></p><ul><li>2014 - nay:&nbsp;Khoa Nội Thận, Bệnh viện Chợ Rẫy Thành phố Hồ Chí Minh.</li></ul><p><strong>Đào tạo</strong></p><ul><li>2011 - 2014:&nbsp;Bác sĩ Nội trú chuyên ngành Nội tổng quát, Đại học Y Dược Thành phố Hồ Chí Minh.</li></ul><p><br></p><ul><li>2004 - 2010:&nbsp;Bác sĩ Đa khoa, Đại học Y Dược Thành phố Hồ Chí Minh.</li></ul>', '20', '11', 'Đại học Y dược thành phố Hồ Chí Minh');
INSERT INTO `doccoming`.`infordoctor` (`idAccount`, `Degree`, `Introduce`, `idMajor`, `Experience`, `Training`) VALUES ('235523488', 'Thạc sĩ Y Khoa', '<ul><li>ThS. BS. Lê Hoàng Hạnh Nghi có 6 năm kinh nghiệm trong lĩnh vực Dinh dưỡng Nhi.</li></ul><p><br></p><ul><li>ThS. BS. Lê Hoàng Hạnh Nghi đang là Giảng viên bộ môn Dinh dưỡng của Đại học Y Khoa Phạm Ngọc Thạch và là bác sĩ khoa Dinh dưỡng tại Bệnh viện Nhi Đồng 2. Bác sĩ Nghi đã tham gia các lớp đào tạo tập huấn nâng cao chuyên môn của chuyên ngành Nhi khoa được tổ chức trong nước.</li></ul><p><br></p><p><strong>ThS.BS. Lê Hoàng Hạnh Nghi chuyên điều trị:</strong></p><p><br></p><ul><li>Bệnh lý liên quan dinh dưỡng trẻ em: suy dinh dưỡng, béo phì, thiếu vi chất, dị ứng trẻ em…</li></ul><p><br></p><ul><li>Bệnh lý cần dinh dưỡng hỗ trợ điều trị: Đái tháo đường, bệnh thận, hội chứng ruột ngắn, tim bẩm sinh, ung thư, rối loạn lipid máu…</li></ul><p><br></p><p><strong>Quá trình công tác</strong></p><p><br></p><ul><li>2017 - nay:&nbsp;Khoa Dinh dưỡng, Bệnh viện Nhi đồng 2 Thành phố Hồ Chí Minh.</li></ul><p><br></p><ul><li>2013 - nay:&nbsp;Bộ môn Dinh dưỡng – An toàn thực phẩm, Trường Đại Học Y khoa Phạm Ngọc Thạch Thành phố Hồ Chí Minh.</li></ul><p><br></p><p><strong>Đào tạo</strong></p><p><br></p><ul><li>2014 - 2017:&nbsp;Thạc sĩ chuyên ngành Dinh dưỡng, Đại Học Y Hà Nội Thành phố Hồ Chí Minh.</li></ul><p><br></p><ul><li>2006 - 2012:&nbsp;Bác sĩ đa khoa, Đại Học Y Phạm Ngọc Thạch Thành phố Hồ Chí Minh.</li></ul>', '6', '6', 'Đại học Y khoa Phạm Ngọc Thạch');
INSERT INTO `doccoming`.`infordoctor` (`idAccount`, `Degree`, `Introduce`, `idMajor`, `Experience`, `Training`) VALUES ('235523485', 'Thạc sĩ Y Khoa', '<ul><li>ThS. BS. Trương Quang Hiếu có 5 năm kinh nghiệm trong lĩnh vực Nhi Tổng Quát, có chuyên môn sâu về điều trị hô hấp, tiêu hóa, tiết niệu, thần kinh, nhiễm trùng, và vấn đề dinh dưỡng cho trẻ.</li></ul><p><br></p><ul><li>ThS. BS. Trương Quang Hiếu hiện đang công tác tại khoa Tiêu hóa tại Bệnh viện Nhi Đồng 1, và tham gia tích cực các khóa đào tạo chuyên sâu về Nhi khoa.</li></ul><p><br></p><p><strong>Quá trình công tác</strong></p><p><br></p><ul><li>2020 - nay: Bác sĩ điều trị - Khoa Tiêu Hoá - Bệnh viện Nhi Đồng 1.</li></ul><p><br></p><p><strong>Đào tạo</strong></p><p><br></p><ul><li>2018 - 2020: Thạc sĩ, Đại học Y dược thành phố Hồ Chí Minh.</li></ul><p><br></p><ul><li>2017 - 2020: Bác sĩ nội trú, chuyên ngành Nhi khoa, Đại Học Y Dược Thành phố Hồ Chí Minh.</li></ul><p><br></p><ul><li>2011 - 2017: Bác sĩ đa khoa, Đại Học Y Dược Thành phố Hồ Chí Minh.</li></ul>', '13', '5', 'Đại học Y dược thành phố Hồ Chí Minh');

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
INSERT INTO `doccoming`.`service` (`id`, `Service`) VALUES ('15', 'Khám tổng quát');
INSERT INTO `doccoming`.`service` (`id`, `Service`) VALUES ('12', 'Điều Dưỡng Tại Nhà');
INSERT INTO `doccoming`.`service` (`id`, `Service`) VALUES ('13', 'Khám Sức Khỏe Định Kỳ');
INSERT INTO `doccoming`.`service` (`id`, `Service`) VALUES ('14', 'Kiểm Tra Thị Lực');

create table categories(
id int not null primary key AUTO_INCREMENT,
Categories nvarchar(100) not null CHECK (Categories !=""),
Image nvarchar(200),
Description text(10000)
)
; -- drop table categories
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
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327128/Category1_nva3da.webp' WHERE (`id` = '1');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327127/Category2_w2ksne.webp' WHERE (`id` = '2');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327127/Category3_lgyfom.webp' WHERE (`id` = '3');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327127/Category4_znhl9y.webp' WHERE (`id` = '4');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327128/Category5_v23gwp.png' WHERE (`id` = '5');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327128/Category6_pjprpv.webp' WHERE (`id` = '6');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327129/Category7_q8ebs6.webp' WHERE (`id` = '7');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327129/Category9_vuwkj3.webp' WHERE (`id` = '8');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327129/Category10_e7xz9s.webp' WHERE (`id` = '9');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327130/Category11_rgsck7.webp' WHERE (`id` = '10');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327130/Category12_bbc5vu.webp' WHERE (`id` = '11');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327130/Category13_uvkhrz.png' WHERE (`id` = '12');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327130/Category14_gjwfr6.webp' WHERE (`id` = '13');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327128/Category15_exiojx.webp' WHERE (`id` = '14');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327128/Category17_hqxk72.webp' WHERE (`id` = '15');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327128/Category18_qancyj.webp' WHERE (`id` = '17');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327129/Category19_z563yu.webp' WHERE (`id` = '18');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327129/Category20_au5xk9.webp' WHERE (`id` = '19');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327129/Category21_swaabi.webp' WHERE (`id` = '20');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327129/Category22_rzr5ad.webp' WHERE (`id` = '21');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327129/Category23_gp1lu9.png' WHERE (`id` = '22');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327130/Category24_migfvj.webp' WHERE (`id` = '23');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327130/Category25_tabu1w.webp' WHERE (`id` = '24');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327130/Category26_x3cova.webp' WHERE (`id` = '25');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327131/Category27_tdqsyc.webp' WHERE (`id` = '26');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327131/Category28_iyfgav.webp' WHERE (`id` = '27');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327129/Category8_qsflrr.webp' WHERE (`id` = '28');
UPDATE `doccoming`.`categories` SET `Image` = 'https://res.cloudinary.com/doccomming/image/upload/v1717327127/Category16_dafsri.webp' WHERE (`id` = '29');


create table similarCategories (
id int not null primary key AUTO_INCREMENT,
idCategories int,
Similar nvarchar(100) not null,
Image nvarchar(200),
Description text(10000)
); -- drop table similarCategories

insert into similarCategories (idCategories, Similar) values 
(1, "Tiểu đường type 1"),
(1, "Tiểu đường type 2"),
(1, "Biến chứng tiểu đường"),
(2, "Tăng huyết áp"),
(2, "Suy tim"),
(2, "Động mạch vành"),
(2, "Bệnh tim");

create table classifypost(
id int not null primary key AUTO_INCREMENT,
Classify varchar(100)
);
insert into classifypost (id, Classify) values 
(1, "Bệnh lí"),
(2, "Thông tin sức khỏe");


create table post(
id int not null primary key AUTO_INCREMENT,
FeaturedImage varchar(300),
Title nvarchar(500) not null CHECK (Title !=""),
Brief nvarchar(1000) not null CHECK (Brief !=""),
Content text(4000) not null CHECK (Content !=""),
Images varchar(300),
idAuthor int,
DatePost datetime,
idCategories int,
idSimilar int,
idMajor int default null,
idClassify int default 1,
Status int default 0, -- 0 chờ duyệt, 1 hiển thị trên site, 2 ẩn
foreign key (idAuthor) references account(id),
foreign key (idCategories) references categories(id),
foreign key (idSimilar) references similarCategories(id),
foreign key (idMajor) references major(id),
foreign key (idClassify) references classifypost(id)
); 
INSERT INTO `doccoming`.`post` (`FeaturedImage`, `Title`, `Brief`, `Content`, `idAuthor`, `DatePost`, `idCategories`, `idSimilar`, `idMajor`, `Status`) VALUES ('https://res.cloudinary.com/doccomming/image/upload/v1715935949/hiwx3crgn1z8knaoxlh4.webp', 'Thuốc huyết áp uống ngày 2 lần được không?', 'Huyết áp cao là bệnh lý mạn tính cần phải điều trị suốt đời để ngăn ngừa các biến chứng nguy hiểm như bệnh tim, đột quỵ, giảm thị lực, bệnh thận mạn tính hay các bệnh về mạch máu khác. Trong một số trường hợp, bác sĩ sẽ chỉ định dùng một hoặc kết hợp nhiều loại thuốc điều trị cao huyết áp khác nhau cho bệnh nhân. Nhiều bệnh nhân vì phải dùng quá nhiều loại thuốc cùng lúc nên thắc mắc không biết thuốc huyết áp uống ngày 2 lần được không? Cùng Hello Bacsi đi tìm lời giải đáp trong bài viết ngay sau đây nhé!', '<h2><strong>Huyết áp cao bao nhiêu thì phải uống thuốc?</strong></h2><p><br></p><p>Bạn có thể cần dùng thuốc để hạ huyết áp nếu các biện pháp thay đổi lối sống không đủ để đưa huyết áp về mức mục tiêu. Vậy, huyết áp 140/90 mmHg có phải uống thuốc không? Việc có nên dùng thuốc hay không còn phụ thuộc vào chỉ số huyết áp ban đầu, tình trạng sức khỏe tổng thể và nguy cơ phát triển các vấn đề như đau tim hoặc đột quỵ trong tương lai. Bác sĩ sẽ xem xét và quyết định có nên kê đơn thuốc hay không.</p><p><br></p><p><img src=\"https://cdn.hellobacsi.com/wp-content/uploads/2024/04/huyet-ap-bao-nhieu-thi-phai-uong-thuoc.jpg\" alt=\"huyết áp cao bao nhiêu thì phải uống thuốc?\" height=\"563\" width=\"1000\"></p><p><br></p><p>Cụ thể như sau:</p><ul><li>Nếu huyết áp của bạn từ&nbsp;140/90 mmHg&nbsp;trở lên, có sức khỏe tổng thể tốt, nguy cơ bị đau tim và đột quỵ nói chung là thấp, việc thay đổi lối sống đơn thuần có thể là đủ mà không cần dùng thuốc. Tuy nhiên, nếu huyết áp luôn cao hơn 140/90 mmHg và nguy cơ mắc các vấn đề sức khỏe nghiêm trọng cao hơn, chẳng hạn như nếu bạn thừa cân hoặc mắc bệnh tiểu đường, bác sĩ sẽ cần chỉ định bắt đầu dùng thuốc kiểm soát huyết áp kết hợp với thay đổi lối sống.</li></ul><p><br></p><ul><li>Nếu huyết áp của bạn luôn trên 160/100 mmHg thì nguy cơ mắc các vấn đề nghiêm trọng sẽ càng cao hơn, bác sĩ sẽ kê cho bạn đơn thuốc hạ áp tích cực hơn, cũng như trao đổi về những thay đổi trong lối sống buộc phải áp dụng để kiểm soát huyết áp.</li></ul><p><br></p><p>Nếu bạn có nguy cơ mắc bệnh tim, tiểu đường hoặc có tiền sử đột quỵ, thuốc có thể được bắt đầu sử dụng ngay cả khi chỉ số huyết áp thấp hơn. Mục tiêu huyết áp được sử dụng phổ biến nhất cho những người mắc các vấn đề sức khỏe này là duy trì dưới 130/80 mmHg.</p><p><br></p><h2><strong>Thuốc huyết áp uống ngày 2 lần được không?</strong></h2><p><br></p><p>Chỉ định dùng nhiều loại thuốc huyết áp cùng lúc là khá phổ biến vì mỗi loại thuốc có tác dụng kiểm soát huyết áp theo những cơ chế khác nhau. Điều này khiến nhiều người bệnh không biết thuốc huyết áp uống ngày 2 lần được không? <strong>Câu trả lời là ĐƯỢC nhưng tùy vào thời gian bán thải của từng loại thuốc và chỉ định của bác sĩ</strong>.</p><p><br></p><p><img src=\"https://cdn.hellobacsi.com/wp-content/uploads/2024/04/thuoc-huyet-ap-uong-ngay-2-lan-duoc-khong-tuy-vao-loai-thuoc.jpg\" alt=\"thuốc huyết áp uống ngày 2 lần được không tùy vào loại thuốc\" height=\"667\" width=\"1000\"></p><p><br></p><p>Thời gian bán thải của thuốc sẽ quyết định đến số lần uống thuốc đó trong ngày. Nếu thời gian bán thải của thuốc càng ngắn thì số lần uống thuốc sẽ càng nhiều và ngược lại, nếu thời gian bán thải càng dài thì số lần uống thuốc càng ít. Vì vậy, một số loại thuốc chỉ cần uống với liều dùng 1 lần/ngày trong khi vẫn có một số thuốc huyết áp sẽ được chỉ định uống 2-3 lần/ngày hoặc hơn tùy trường hợp cụ thể.</p><p><br></p><p>Thông thường, bác sĩ sẽ chỉ định uống 2 viên/ngày chia 2 lần uống hoặc 3 viên/ngày chia 3 lần uống (đối với thuốc tác dụng ngắn) hoặc 1 viên/ngày (đối với thuốc tác dụng kéo dài).</p><p><br></p><p>Nếu thắc mắc thuốc huyết áp uống ngày 2 lần được không, người bệnh nên biết là ở một số đối tượng được chỉ định dùng thuốc một lần mỗi ngày, tác dụng kiểm soát huyết áp có thể giảm dần vào cuối khoảng thời gian dùng thuốc. Vì vậy, nên đo huyết áp ngay trước khi dùng thuốc để xác định xem bản thân có đạt được mức kiểm soát huyết áp mong muốn hay không. Sau đó, hỏi ý kiến bác sĩ về việc tăng liều lượng hoặc tần suất dùng thuốc lên 2 lần/ngày có nên hay không nếu chỉ số huyết áp chưa đạt mục tiêu.</p><p><br></p><p><br></p><h2>Một số lưu ý khác khi dùng thuốc huyết áp</h2><p><br></p><p><br></p><p><img src=\"https://cdn.hellobacsi.com/wp-content/uploads/2024/04/thuoc-huyet-ap-uong-ngay-2-lan-duoc-khong-va-nhung-luu-y.jpg\" alt=\"thuốc huyết áp uống ngày 2 lần được không và những lưu ý khác\" height=\"667\" width=\"1000\"></p><p><br></p><p><br></p><p><br></p><p><strong><em>Dùng thuốc huyết áp liên tục, suốt đời.</em></strong> Nếu bạn bắt đầu dùng thuốc điều trị huyết áp cao, bạn nên ý thức rằng sẽ cần phải dùng thuốc trong thời gian dài, thậm chí là suốt đời để có thể kiểm soát tốt huyết áp và sống lâu hơn. Ngay cả khi huyết áp đã hạ xuống mức mục tiêu, người bệnh vẫn phải tuân thủ nguyên tắc điều trị liên tục. Nếu huyết áp được kiểm soát tốt trong vài năm, bạn có thể dùng liều thấp hơn hoặc ngừng dùng thuốc hoàn toàn mà vẫn đảm bảo chỉ số huyết áp vẫn ổn định. Tuy nhiên, điều này sẽ cần sự chỉ định và theo dõi chặt chẽ của bác sĩ.</p><p><br></p><p><strong><em>Dùng thuốc đúng giờ mỗi ngày.</em></strong> Tập thói quen dùng tất cả các loại thuốc huyết áp vào cùng một thời điểm mỗi ngày để giúp bạn nhớ uống thuốc và hạn chế nguy cơ bỏ quên liều. Uống thuốc đúng giờ, không nên nhớ lúc nào uống lúc nấy, uống thuốc thất thường sẽ khiến huyết áp cao không được kiểm soát, dễ gây ra các biến chứng nguy hiểm, như đột quỵ.</p><p><br></p><p><strong><em>Dùng thuốc đủ liều lượng và tần suất được chỉ định.</em></strong> Đối với thuốc dùng một lần trong ngày, cần uống vào một thời điểm cố định. Đối với thuốc uống 2 lần trong ngày, cần chia đều trong 24 giờ (tức là cứ cách 12 giờ uống thuốc một lần). Ví dụ: nếu uống thuốc lần đầu tiên trong ngày vào 8 giờ sáng thì uống lần 2 sẽ vào 8 giờ tối. Tuân thủ liều lượng và tần suất dùng thuốc được chỉ định để đảm bảo thuốc có hiệu quả kiểm soát huyết áp tốt nhất.</p><p><br></p><p><strong><em>Không tự ý giảm liều hay ngừng dùng thuốc.</em></strong> Khi thấy huyết áp ổn định, cảm thấy khỏe hơn và vì sợ gặp phải tác dụng phụ nên một số người bệnh tự ý giảm liều (uống thuốc cách ngày hoặc chia đôi viên thuốc để uống) hoặc thậm chí là ngừng dùng thuốc mà không hỏi ý kiến bác sĩ. Điều này hết sức nguy hiểm vì làm cho nồng độ thuốc trong máu không đủ để kiểm soát huyết áp. Hậu quả dẫn đến là huyết áp nhanh chóng tăng trở lại, tăng nguy cơ đột quỵ và tử vong.</p><p><br></p><p><strong><em>Không tự ý tăng liều thuốc.</em></strong> Thuốc huyết áp uống ngày 2 lần được không? Một số bệnh nhân được chỉ định chỉ dùng thuốc một lần/ngày nhưng vì không biết tại sao uống thuốc rồi mà huyết áp vẫn tăng nên tự ý tăng liều lên uống 2 lần/ngày. Khi dùng quá liều có thể gây tụt huyết áp quá mức, thậm chí gây trụy mạch, tử vong… và các tác dụng phụ khác của thuốc.</p><p><br></p><p><strong><em>Xử trí khi quên liều.</em></strong> Quên uống thuốc huyết áp 1 ngày có sao không? Nếu bạn bỏ lỡ một liều, đừng dùng gấp đôi liều. Điều quan trọng là không dùng quá nhiều thuốc huyết áp cùng một lúc vì huyết áp của bạn có thể giảm quá thấp. Nếu bạn quên uống một viên, hãy uống ngay khi nhớ ra, trừ khi đã gần đến liều tiếp theo, trong trường hợp đó, chỉ cần uống một viên rồi tiếp tục dùng thuốc như bình thường theo kế hoạch.</p><p><br></p><p><strong><em>Lưu ý đến tác dụng phụ của thuốc.</em></strong> Thuốc huyết áp có thể gây ra một số tác dụng phụ nhưng hầu hết trường hợp đều không gặp phải bất kỳ tác dụng phụ nghiêm trọng nào. Hãy báo cho bác sĩ điều trị càng sớm càng tốt nếu bạn gặp phải tác dụng phụ bất kỳ, nhất là các tác dụng phụ đang gây ra vấn đề sức khỏe làm ảnh hưởng đến cuộc sống hàng ngày. Trong hầu hết các trường hợp, việc thay đổi liều lượng thuốc hoặc thời điểm dùng thuốc có thể giúp giảm tác dụng phụ nhưng cần phải được bác sĩ chỉ định.</p><p><br></p><p><strong><em>Trao đổi với bác sĩ điều trị.</em></strong> Hãy cho bác sĩ điều trị biết về tất cả các loại thuốc kê đơn, thuốc không kê đơn và thực phẩm chức năng mà bạn đang dùng. Một số loại thuốc có thể gây tác dụng phụ là làm tăng huyết áp và/hoặc cản trở hiệu quả của thuốc huyết áp.</p><p><br></p><p><strong><em>Đo huyết áp và thăm khám sức khỏe định kỳ.</em></strong> Thăm khám sức khỏe định kỳ và tái khám theo đúng lịch hẹn của bác sĩ để được theo dõi tình trạng sức khỏe, điều chỉnh thuốc và liều lượng kịp thời nếu cần. Đồng thời, người bệnh phải biết cách tự theo dõi chỉ số huyết áp tại nhà thường xuyên.</p><p><br></p><p><strong><em>Kết hợp thay đổi lối sống lành mạnh.</em></strong> Giảm huyết áp bằng lối sống lành mạnh đồng nghĩa là bạn có thể ít phụ thuộc vào thuốc hơn. Một lối sống lành mạnh cũng có thể giúp thuốc huyết áp cho tác dụng hiệu quả hơn. Các biện pháp này cụ thể là: ăn nhạt, ăn nhiều trái cây và rau quả tươi, giảm stress, bỏ thuốc lá, hạn chế rượu bia, tập thể dục vừa sức và duy trì cân nặng phù hợp.</p><p><br></p><p><span style=\"color: rgb(38, 38, 38);\">Tóm lại, bác sĩ sẽ cho bạn biết bạn cần uống bao nhiêu viên thuốc huyết áp mỗi ngày, thuốc huyết áp uống ngày 2 lần được không, cũng như bất kỳ điều gì khác mà bạn còn thắc mắc trong quá trình điều trị. Chẳng hạn như: liệu bạn có thể dùng chúng vào một thời điểm cụ thể trong ngày hay không, liệu bạn có thể dùng chúng cùng với thức ăn hay không và liệu bạn có thể dùng tất cả các loại thuốc của mình cùng nhau hay không. Điều bạn cần làm duy nhất là thẳng thắn trao đổi trực tiếp để thấu hiểu và tuân thủ đúng theo chỉ định điều trị từ bác sĩ của mình.</span></p>', '235523484', '2024-05-17 15:52:30', '2', '5', '1');
INSERT INTO `doccoming`.`post` (`FeaturedImage`, `Title`, `Brief`, `Content`, `idAuthor`, `DatePost`, `idCategories`, `idSimilar`, `idMajor`, `Status`) VALUES ('https://res.cloudinary.com/doccomming/image/upload/v1715936788/rpscgogoo9ojvjun0jzr.jpg', 'Tìm hiểu về các loại insulin điều trị tiểu đường và cách sử dụng', 'Insulin đã được sử dụng từ hơn 100 năm trước để điều trị đái tháo đường nhằm giúp kiểm soát đường huyết và cải thiện chất lượng cuộc sống cho bệnh nhân. Các loại insulin hiện có được chia thành 5 loại dựa vào thời gian tác động, bao gồm: insulin tác dụng nhanh, ngắn, trung bình, kéo dài và cuối cùng là insulin hỗn hợp.', '<p>Các loại insulin khác nhau có thời gian khởi đầu, thời gian đạt đỉnh và thời gian hoạt động khác nhau. Vì vậy, tác dụng và thời điểm sử dụng cũng khác nhau ở từng loại. Nắm thông tin về chúng giúp người bệnh sử dụng insulin một cách an toàn và hiệu quả.</p><p><br></p><h2><strong>Insulin và đái tháo đường</strong></h2><p>Insulin là một hormone tạo ra bởi các tế bào beta tuyến tụy để giữ đường huyết ở mức bình thường. Chức năng của insulin là chuyển glucose (đường) từ máu vào tế bào để tạo năng lượng. Nếu thiếu insulin, đường sẽ tích tụ quá nhiều trong máu và theo thời gian sẽ gây ra bệnh đái tháo đường.</p><p>Với bệnh tiểu đường tuýp 1, cơ thể không tạo ra insulin nên người bệnh phải bổ sung insulin từ bên ngoài hàng ngày để duy trì sự sống. Với tiểu đường tuýp 2, cơ thể không sản xuất đủ insulin hoặc insulin không hoạt động tốt. Trong một vài trường hợp cụ thể, người bệnh tiểu đường tuýp 2 sẽ được bác sĩ chỉ định tiêm insulin để kiểm soát lượng đường trong máu.</p><p><br></p><h2>Các loại insulin: Phân loại insulin theo thời gian tác động</h2><p>Hầu hết người bệnh tiểu đường tuýp 1 và một số trường hợp mắc tiểu đường tuýp 2 được bác sĩ chỉ định dùng 2 loại insulin sau đây:&nbsp;</p><p><br></p><p>Insulin bữa ăn (insulin bolus): loại tác dụng nhanh dùng trong bữa ăn.</p><p><br></p><p>Insulin nền (insulin basal): loại tác dụng chậm hơn, thường dùng 1 hoặc 2 lần trong một ngày, có tác dụng trong suốt cả ngày.</p><p><br></p><p>Một số bệnh nhân khác được kê đơn một loại insulin duy nhất những loại này được kết hợp giữa loại tác dụng nhanh/ngắn và loại tác dụng trung bình/chậm, được gọi là insulin hỗn hợp.</p><p><br></p><p>Cụ thể như sau:</p><p><br></p><p><img src=\"https://cdn.hellobacsi.com/wp-content/uploads/2024/01/cac-loai-insulin-theo-thoi-gian-tac-dong.jpg\" alt=\"các loại insulin theo thời gian tác động\" height=\"667\" width=\"1000\"></p><p><br></p><h3><strong>Insulin bữa ăn (insulin bolus)</strong></h3><p>Insulin bolus cung cấp insulin một cách nhanh chóng để xử lý lượng đường tạo ra từ bữa ăn. Có 2 loại chính bao gồm:</p><p><br></p><ul><li><strong>Insulin nhanh</strong>&nbsp;(Insulin tác dụng tức thời): dùng ngay trước hoặc sau bữa ăn. Thuốc bắt đầu có tác dụng trong vòng vài phút và kéo dài từ 3 đến 5 giờ tùy nhãn hiệu.</li></ul><p><br></p><ul><li><strong>Insulin regular</strong>&nbsp;(Insulin tác dụng ngắn): tương tự như insulin tác dụng nhanh nhưng tác dụng chậm hơn. Dùng trước khi ăn khoảng 30 đến 60 phút. Loại này mất khoảng 30 đến 60 phút để bắt đầu có tác dụng và kéo dài từ 5 đến 8 giờ.</li></ul><p><br></p><h3><strong>Insulin nền (insulin basal)</strong></h3><p>Insulin nền thường được dùng 1 hoặc 2 lần trong ngày. Nó giúp xử lý lượng đường mà cơ thể tạo ra hoặc chuyển hóa thành. Các loại insulin này bao gồm:</p><p><br></p><ul><li><strong>Insulin NPH</strong>&nbsp;(Insulin tác dụng trung bình): là hỗn dịch insulin kết tinh với protamine và kẽm nên có màu đục, cần được trộn đều, dùng 1 – 2 lần trong ngày.</li></ul><p><br></p><ul><li><strong>Insulin chậm</strong>&nbsp;(Insulin tác dụng kéo dài): có thời gian khởi phát tác dụng chậm hơn insulin NPH, thường dùng 1 lần một ngày, vào cùng một thời điểm mỗi ngày.</li></ul><p><br></p><h3><strong>Insulin dạng hỗn hợp (pre-mix)</strong></h3><p>Insulin hỗn hợp là sự kết hợp giữa insulin tác dụng nhanh/ngắn với loại tác dụng trung bình/chậm. Thường được sử dụng trước bữa ăn mà không cần đến insulin nền, tần suất tiêm khoảng 1 – 2 lần trong ngày.</p><p><br></p><h2>Các loại insulin theo nguồn gốc sản xuất</h2><p><br></p><p>Insulin được sản xuất theo nhiều cách khác nhau.&nbsp;Phân tử insulin giống như hai chuỗi hạt được nối với nhau. Các loại insulin theo nguồn gốc sản xuất bao gồm:</p><p><br></p><p><strong>Insulin người:</strong>&nbsp;Đây là loại insulin tổng hợp và được sản xuất trong phòng thí nghiệm giống như insulin được tạo ra trong cơ thể người.</p><p><br></p><p><strong>Insulin analog:</strong> Đây cũng là loại insulin tổng hợp và được sản xuất trong phòng thí nghiệm nhưng các nhà khoa học đã tìm cách thay đổi vị trí của một số hạt để tạo ra insulin biến đổi gen được gọi là insulin analog.</p><p><br></p><p><strong>Insulin động vật:</strong> Hiện nay, loại này không còn được sử dụng nhiều nữa, nhưng một số người thấy rằng insulin tinh khiết (đã được làm sạch) từ động vật (bò hoặc lợn) có tác dụng tốt nhất đối với họ.</p><p><br></p><h2><strong>Cách sử dụng và bảo quản các loại insulin</strong></h2><h3>Thời điểm tiêm</h3><ul><li><strong>Insulin nhanh</strong>&nbsp;dùng ngay trước hoặc sau bữa ăn.&nbsp;</li></ul><p><br></p><ul><li><strong>Insulin regular</strong>&nbsp;dùng trước khi ăn khoảng 30-60 phút.&nbsp;</li></ul><p><br></p><ul><li><strong>Insulin NPH</strong>&nbsp;dùng 1 – 2 lần trong ngày.</li></ul><p><br></p><ul><li><strong>Insulin chậm, tác dụng kéo dài</strong>&nbsp;dùng 1 lần, vào cùng một thời điểm mỗi ngày.</li></ul><p><br></p><ul><li><strong>Insulin hỗn hợp</strong>&nbsp;dùng trước bữa ăn.</li></ul><h3><strong>Vị trí tiêm</strong></h3><p>Các loại insulin tiêm được tiêm dưới da, không được tiêm vào cơ hoặc vào mạch máu vì điều này sẽ làm thay đổi tốc độ hấp thụ và hoạt động của insulin.</p><p><br></p><p>Sự hấp thu insulin thay đổi tùy theo vị trí được tiêm vào cơ thể. Bụng là vị trí tiêm hấp thụ insulin tốt và ổn định nhất. Cánh tay trên, mông và đùi có tốc độ hấp thụ ít ổn định hơn.</p><p><br></p><p><strong><em>Các yếu tố làm tăng tốc độ hấp thụ insulin:</em></strong></p><p><br></p><ul><li>Tiêm vào vùng vận động nhiều như đùi hoặc cánh tay</li></ul><p><br></p><ul><li>Nhiệt độ cao do tắm nước nóng, spa hoặc phòng tắm hơi</li></ul><p><br></p><ul><li>Xoa bóp vùng xung quanh chỗ tiêm</li></ul><p><br></p><ul><li>Tiêm vào cơ&nbsp;khiến insulin được hấp thụ nhanh hơn và có thể khiến lượng đường trong máu hạ quá thấp.</li></ul><p><br></p><p><strong><em>Các yếu tố làm chậm sự hấp thu insulin:</em></strong></p><p><br></p><ul><li>Tiêm quá nhiều cùng một vị trí, khiến vùng da bị sần hoặc có sẹo (được gọi là chứng loạn dưỡng mô mỡ)</li></ul><p><br></p><ul><li>Insulin lạnh (ví dụ: nếu insulin được tiêm ngay sau khi lấy từ tủ lạnh)</li></ul><p><br></p><ul><li>Hút thuốc lá.</li></ul><p><br></p><h3><strong>Kỹ thuật tiêm</strong></h3><p><br></p><p><img src=\"https://cdn.hellobacsi.com/wp-content/uploads/2024/01/cach-tiem-cac-loai-insulin.jpg\" alt=\"cách tiêm insulin\" height=\"667\" width=\"1000\"></p><p><br></p><p><strong><em>Chuẩn bị lọ insulin và ống tiêm:</em></strong></p><p><br></p><ul><li>Nếu insulin ở dạng hỗn dịch (đục), cần lắc nhẹ và làm ấm khoảng 10 – 15 lần để làm đều hỗn dịch.</li></ul><p><br></p><ul><li>Khử trùng nắp lọ insulin với một miếng bông có dung dịch sát khuẩn.</li></ul><p><br></p><ul><li>Trước khi rút insulin, hút không khí vào trong bơm kim tiêm một thể tích khí bằng với liều insulin cần lấy.</li></ul><p><br></p><ul><li>Bơm không khí đã hút vào lọ insulin.</li></ul><p><br></p><ul><li>Lấy insulin nhẹ nhàng, tránh làm xoáy dung dịch trong lọ.</li></ul><p><br></p><ul><li>Loại bỏ bọt khí.</li></ul><p><br></p><p><strong><em>Chuẩn bị bút tiêm insulin:</em></strong></p><p><br></p><ul><li>Đầu tiên vẫn là làm ấm và đồng nhất thuốc bằng cách lăn trong lòng bàn tay và lắc lên xuống 10-15 lần.</li></ul><p><br></p><ul><li>Lắp mũi tiêm vào bút tiêm.</li></ul><p><br></p><ul><li>Vặn bút tiêm&nbsp;ở mức 2 đơn vị. Bơm hết 2 đơn vị này để loại bọt khí. Nếu nhìn thấy có giọt nước ở đầu bút tiêm là được. Nếu không, làm lại một lần nữa, cho đến khi thấy giọt nước ở đầu mũi tiêm.</li></ul><p><br></p><ul><li>Chọn mức liều insulin tương ứng và tiêm.</li></ul><p><strong><em>Thực hiện tiêm</em>:</strong></p><ul><li>Chú ý sử dụng cồn để sát khuẩn da trước khi tiêm.</li><li>Chọn vị trí tiêm. Lưu ý phải thay đổi vị trí tiêm thường xuyên để tránh bị sần cứng vùng da nơi tiêm</li><li>Tiêm một góc 90° (đối với bút tiêm) hoặc 45° và véo da (đối với lọ tiêm), có thể tiêm tại trạng thái bình thường hoặc kéo nhẹ da ở vùng tiêm.</li><li>Đợi 10 giây trước khi rút mũi tiêm để insulin có thể khuếch tán.</li><li>Rút nhanh kim tiêm để tránh làm cho insulin thoát ra ở vị trí tiêm.</li><li>Không xoa bóp ở vùng đã tiêm do có thể làm thay đổi mức độ giải phóng của insulin.</li></ul><h3><strong>Bảo quản</strong></h3><ul><li>Bảo quản các loại insulin chưa mở gọn gàng ở một bên trong tủ lạnh, tránh để quá gần bộ phận làm lạnh, không để ở ngăn đá. Giữ nhiệt độ tủ lạnh từ 2 đến 8°C. Đảm bảo rằng insulin không bị đông cứng.</li></ul><p><br></p><ul><li>Sau khi mở, bảo quản ở nhiệt độ phòng (dưới 25°C) không quá 1 tháng. Tránh để insulin dưới ánh nắng trực tiếp, nhiệt độ trên 30°C để đảm bảo insulin tiêm dưới da sẽ gần với nhiệt độ cơ thể, giúp giảm đau và điều hòa quá trình khuếch tán dưới da.</li></ul><p><br></p><ul><li>Ống tiêm, kim bút, kim bơm đã qua sử dụng phải được vứt bỏ trong hộp đựng chống thủng và có nắp đậy an toàn.</li></ul><p><br></p><ul><li>Không sử dụng insulin nếu:</li></ul><p><br></p><ul><li class=\"ql-indent-1\">Insulin trong suốt chuyển sang màu đục</li></ul><p><br></p><ul><li class=\"ql-indent-1\">Insulin đục (loại có tác dụng trung bình) bị vón cục hoặc đóng cặn bên trong lọ, ống bút hoặc hộp mực và không thể hòa tan bằng cách xoay nhẹ</li></ul><p><br></p><ul><li class=\"ql-indent-1\">Sản phẩm hết hạn</li></ul><p><br></p><ul><li class=\"ql-indent-1\">Sản phẩm bị đóng băng hoặc tiếp xúc với nhiệt độ cao</li></ul><p><br></p><ul><li class=\"ql-indent-1\">Lọ đựng, bút hoặc hộp mực đã được sử dụng hoặc đã để ngoài tủ lạnh lâu hơn 1 tháng</li></ul><p><br></p><h2><strong>Một số lưu ý khi sử dụng các loại insulin</strong></h2><p><img src=\"https://cdn.hellobacsi.com/wp-content/uploads/2024/01/mot-so-luu-y-khi-dung-cac-loai-insulin.jpg\" alt=\"một số lưu ý khác khi dùng insulin\" height=\"667\" width=\"1000\"></p><p><br></p><ul><li>Hầu hết insulin đều trong suốt nhưng một số loại lại có màu đục (do được thêm hợp chất giúp làm chậm tốc độ hấp thu). Nếu bạn dùng các loại insulin này, nên lắc kỹ trước khi sử dụng bằng cách nhẹ nhàng lộn ngược 10-15 lần. Không nên lắc mạnh vì sẽ tạo ra bọt khí dẫn đến chia liều lượng không chính xác.</li></ul><p><br></p><ul><li>Liều insulin có thể cần thay đổi theo thời gian và vì nhiều lý do, chẳng hạn thay đổi chế độ tập luyện, ăn uống, thuốc, bệnh mắc kèm, tăng cân hoặc giảm cân,… Tái khám thường xuyên để bác sĩ đánh giá và hiệu chỉnh liều.</li></ul><p><br></p><ul><li>Ghi lại mức đường huyết thường xuyên (ít nhất 1 lần trước bữa ăn, nhiều hơn nếu được yêu cầu) giúp bạn và bác sĩ biết khi nào cần điều chỉnh liều lượng insulin.</li><li>Trước khi sử dụng bệnh nhân cần học cách tính toán lượng carbohydrate nạp vào để tính toán lượng insulin.</li></ul><p><br></p><ul><li>Tác dụng không mong muốn thường gặp là hạ đường huyết, phản ứng dị ứng, loạn dưỡng mô mỡ và tăng cân.&nbsp;Hạ đường huyết&nbsp;là một tác dụng phụ nguy hiểm đến tính mạng, bệnh nhân và người chăm sóc cần nắm rõ về tình trạng này để nhận biết và xử trí kịp thời.</li></ul><p><br></p><p><span style=\"color: rgb(38, 38, 38);\">Nếu bắt đầu sử dụng, người bệnh có thể cảm thấy choáng ngợp vì có quá nhiều các loại insulin. Hãy từ từ làm quen và trao đổi với bác sĩ khi có bất kỳ thắc mắc hay khó khăn nào để đảm bảo liệu trình điều trị hiệu quả, an toàn nhé!</span></p>', '235523484', '2024-05-17 16:02:01', '1', '6', '1', '20');
INSERT INTO `doccoming`.`post` (`FeaturedImage`, `Title`, `Brief`, `Content`, `idAuthor`, `DatePost`, `idCategories`, `idSimilar`, `idMajor`, `Status`) VALUES ('https://res.cloudinary.com/doccomming/image/upload/v1715937057/enzccmw4ofqhjugeskqw.webp', 'Bệnh tiểu đường nguy hiểm như thế nào?', 'Tiểu đường là một căn bệnh mạn tính và ngày càng trở nên phổ biến trên toàn thế giới. Bệnh ảnh hưởng đến hàng triệu người, có thể gây ra nhiều biến chứng và nguy hiểm đáng kể nếu không được kiểm soát tốt. Trên thực tế, tiểu đường có thể ảnh hưởng đến nhiều cơ quan và hệ thống trong cơ thể, gây ra nhiều vấn đề sức khỏe nghiêm trọng. Trong bài viết này, chúng ta sẽ tìm hiểu bệnh tiểu đường nguy hiểm như thế nào và tại sao nó cần được kiểm soát một cách nghiêm túc?', '<h2><strong>Bệnh tiểu đường là gì?</strong></h2><p><br></p><p>Bệnh tiểu đường (đái tháo đường) là một căn bệnh mạn tính ảnh hưởng đến cách cơ thể sử dụng đường (glucose). Glucose là nguồn cung cấp năng lượng chính cho cơ thể và đến từ thực phẩm bạn ăn. Insulin – một loại hormone được sản xuất bởi tuyến tụy – giúp glucose từ máu đi vào tế bào để sử dụng làm năng lượng. Nếu mắc bệnh tiểu đường, cơ thể không thể hấp thụ đường (glucose) vào tế bào và sử dụng nó làm năng lượng. Điều này dẫn đến sự tích tụ đường trong máu.</p><p>Có 2 loại bệnh tiểu đường chính:</p><p><br></p><ul><li><strong>Tiểu đường tuýp 1:</strong>&nbsp;Cơ thể không thể sản xuất insulin. Điều này thường xảy ra ở trẻ em và thanh thiếu niên, nhưng cũng có thể xảy ra ở người lớn.</li></ul><p><br></p><ul><li><strong>Tiểu đường tuýp 2:</strong>&nbsp;Cơ thể không sử dụng insulin hiệu quả hoặc không sản xuất đủ insulin. Đây là dạng bệnh tiểu đường phổ biến nhất.</li></ul><p><br></p><h2><strong>Bệnh tiểu đường nguy hiểm như thế nào?</strong></h2><p><br></p><h3><strong>Biến chứng của bệnh tiểu đường</strong></h3><p><br></p><p><img src=\"https://cdn.hellobacsi.com/wp-content/uploads/2024/04/Benh-tieu-duong-nguy-hiem-nhu-the-nao-va-cac-bien-chung.jpg\" alt=\"Bệnh tiểu đường nguy hiểm như thế nào và các biến chứng\" height=\"667\" width=\"1000\"></p><p><br></p><p>Bệnh tiểu đường nguy hiểm như thế nào? Bệnh ảnh hưởng đến nhiều cơ quan và hệ thống trong cơ thể, cụ thể như sau:</p><ul><li><strong>Tác động lên hệ thống tim mạch:</strong>&nbsp;Một trong những tác động nguy hiểm nhất của bệnh là tác động lên hệ thống&nbsp;tim mạch. Người mắc bệnh tiểu đường có nguy cơ cao mắc bệnh động mạch vành, đau tim, suy tim, tăng huyết áp và đột quỵ. Bệnh tim mạch là nguyên nhân hàng đầu gây tử vong ở người mắc bệnh tiểu đường.</li></ul><p><br></p><ul><li><strong>Tác động lên hệ thống thần kinh:&nbsp;</strong>Tiểu đường có thể gây tổn thương dây thần kinh, gọi là&nbsp;bệnh thần kinh tiểu đường. Điều này gây ra các triệu chứng như đau nhức, tê bì, ngứa ran và giảm cảm giác ở các chi (bàn tay, bàn chân). Tổn thương thần kinh ở bàn chân có thể dẫn đến cắt cụt chi. Tổn thương dây thần kinh liên quan đến hệ thống tiêu hóa có thể gây ra vấn đề với dạ dày và ruột.</li></ul><p><br></p><ul><li><strong>Tác động lên thận:</strong>&nbsp;Bệnh tiểu đường có thể gây suy thận, một biến chứng nguy hiểm khác. Khi thận bị tổn thương, chức năng lọc và loại bỏ chất thải khỏi cơ thể bị suy giảm, dẫn đến tăng nguy cơ mắc&nbsp;bệnh thận&nbsp;mạn tính và thậm chí là suy thận hoàn toàn.</li></ul><p><br></p><ul><li><strong>Tác động lên mắt:</strong>&nbsp;Bệnh tiểu đường có thể gây tổn thương mạch máu và thần kinh trong mắt, gây ra các vấn đề về thị lực. Một trong những biến chứng phổ biến nhất của bệnh tiểu đường là đục thủy tinh thể, một tình trạng mờ mắt có thể dẫn đến mất thị lực (mù lòa).&nbsp;Bệnh tiểu đường là nguyên nhân hàng đầu gây mù lòa ở người lớn tuổi.</li></ul><p><br></p><h3><strong>Bệnh tiểu đường nguy hiểm như thế nào? Bệnh làm suy yếu hệ thống miễn dịch</strong></h3><p><br></p><p>Bệnh tiểu đường cũng có thể làm suy yếu hệ miễn dịch trong cơ thể, làm tăng nguy cơ mắc các bệnh nhiễm trùng. Người bệnh tiểu đường thường dễ bị nhiễm trùng da, nhiễm trùng nướu răng, nhiễm trùng đường tiết niệu và viêm phổi. Nếu không được điều trị kịp thời, các nhiễm trùng này có thể lan rộng và gây ra thêm nhiều biến chứng nguy hiểm khác.</p><p><br></p><h3><strong>Ảnh hưởng tâm lý</strong></h3><p><img src=\"https://cdn.hellobacsi.com/wp-content/uploads/2024/04/Benh-tieu-duong-nguy-hiem-nhu-the-nao-anh-huong-tam-ly.jpg\" alt=\"Bệnh tiểu đường nguy hiểm như thế nào? Ảnh hưởng tâm lý\" height=\"667\" width=\"1000\"></p><p><br></p><p>Bệnh tiểu đường nguy hiểm như thế nào? Bệnh tiểu đường còn liên quan mật thiết đến các vấn đề sức khỏe tâm lý. Các nghiên cứu cho thấy người mắc tiểu đường có nguy cơ cao hơn mắc các rối loạn tâm lý như trầm cảm và lo âu. Thêm vào đó, căng thẳng trong quá trình điều trị và kiểm soát đường huyết, cũng như đối mặt với các biến chứng có thể tạo ra áp lực lớn cho người bệnh.</p><p><br></p><h3><strong>Giảm chất lượng cuộc sống</strong></h3><p><br></p><p>Sự nguy hiểm của bệnh tiểu đường cũng được thể hiện qua việc tác động tiêu cực đến chất lượng cuộc sống. Đây là một căn bệnh mạn tính nên người bệnh tiểu đường thường phải tuân thủ chế độ ăn uống nghiêm ngặt, kiểm soát mức đường huyết hàng ngày và thường xuyên uống thuốc trong suốt quãng đời còn lại. Điều này có thể gây ra nhiều khó khăn trong sinh hoạt và căng thẳng trong cuộc sống hàng ngày. Bên cạnh đó, bệnh tiểu đường có thể dẫn đến giảm chất lượng cuộc sống do các biến chứng và hạn chế về hoạt động thể chất.</p><p><br></p><h2><strong>Hiểu rõ bệnh tiểu đường nguy hiểm như thế nào để chủ động kiểm soát bệnh</strong></h2><p><br></p><p>Để giảm mức độ nguy hiểm của bệnh tiểu đường, việc kiểm soát bệnh là vô cùng quan trọng. Mục tiêu là luôn duy trì mức đường huyết ổn định. Bệnh nhân nên thực hiện kiểm soát bệnh bằng cách:</p><p><br></p><p><img src=\"https://cdn.hellobacsi.com/wp-content/uploads/2024/04/Benh-tieu-duong-nguy-hiem-nhu-the-nao-va-cach-kiem-soat.jpg\" alt=\"Bệnh tiểu đường nguy hiểm như thế nào và cách kiểm soát\" height=\"667\" width=\"1000\"></p><p><br></p><ul><li><strong><em>Duy trì chế độ ăn uống lành mạnh:&nbsp;</em></strong>Một chế độ ăn uống lành mạnh và cân đối là yếu tố quan trọng trong việc kiểm soát bệnh tiểu đường. Hãy tăng cường tiêu thụ các loại thực phẩm giàu chất xơ, ít tinh bột, ít đường và ít chất béo trong khẩu phần ăn hàng ngày. Đồng thời, quan tâm đến lượng calo tiêu thụ để duy trì cân nặng và cân bằng mức đường huyết.</li></ul><p><br></p><ul><li><strong><em>Tập thể dục đều đặn:</em></strong>&nbsp;Hoạt động thể chất đều đặn giúp cải thiện độ nhạy insulin trong cơ thể, giúp kiểm soát đường huyết và giảm nguy cơ mắc các biến chứng của bệnh tiểu đường. Tập thể dục thường xuyên cũng giúp duy trì cân nặng hợp lý, cải thiện sức khỏe tim mạch và tăng cường sức khỏe tổng thể.</li></ul><p><br></p><ul><li><strong><em>Đo đường huyết định kỳ:</em></strong>&nbsp;Việc đo đường huyết định kỳ và theo dõi mức độ kiểm soát bệnh tiểu đường là rất quan trọng. Điều này giúp phát hiện sớm các biến chứng có thể xảy ra và điều chỉnh phương pháp điều trị một cách thích hợp.&nbsp;Mục tiêu là ngăn chặn hoặc giảm thiểu mức độ nguy hiểm của bệnh tiểu đường.</li></ul><p><br></p><ul><li><strong><em>Tuân thủ điều trị:</em></strong>&nbsp;Việc tuân thủ đúng chỉ định điều trị bệnh tiểu đường của bác sĩ là rất quan trọng. Điều này bao gồm việc sử dụng thuốc đường uống, tiêm insulin (nếu cần), kiểm soát cân nặng, tuân thủ chế độ ăn uống và lịch tập thể dục. Đồng thời, thăm khám sức khỏe định kỳ thường xuyên để phát hiện và điều trị các vấn đề sức khỏe liên quan đến bệnh tiểu đường nếu có.</li></ul><p><br></p><ul><li><strong><em>Chuẩn bị tâm lý và kiến thức:</em></strong>&nbsp;Người bệnh cần có kiến thức đúng về bệnh, hiểu rõ tác động của nó và biết cách xử lý các biến chứng có thể xảy ra.&nbsp;Việc thông tin và giáo dục về bệnh tiểu đường cũng rất quan trọng để nâng cao nhận thức và khả năng tự quản lý cho bệnh nhân.&nbsp;Đồng thời, người bệnh cũng nên tham gia vào các nhóm hỗ trợ và kết nối với&nbsp;cộng đồng&nbsp;người bệnh tiểu đường để có thêm sự hỗ trợ và khích lệ trong quá trình điều trị bệnh.</li></ul><p><br></p><p>Tóm lại, nếu thắc mắc bệnh tiểu đường nguy hiểm như thế nào thì đây là một căn bệnh nguy hiểm có thể gây ra nhiều biến chứng và ảnh hưởng đến nhiều cơ quan, hệ thống trong cơ thể. Việc quản lý bệnh tiểu đường một cách nghiêm túc và kiểm soát tốt đường huyết là cần thiết để giảm nguy cơ các biến chứng và duy trì sức khỏe tổng thể. Bằng cách tuân thủ chế độ ăn uống lành mạnh, tập thể dục đều đặn và tuân thủ đúng quy trình điều trị, người mắc bệnh tiểu đường có thể sống một cuộc sống khỏe mạnh và giảm mức độ nguy hiểm của bệnh ở mức tối thiểu.</p>', '235523484', '2024-05-17 16:10:58', '1', '4', '1', '20');
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
; -- drop table appointment alter table appointment DROP  column idGroupAppointment 

create table servicedoctor(
id int not null primary key AUTO_INCREMENT,
idService int  not null CHECK (idService !=""),
idDoctor int  not null CHECK (idDoctor !=""),
EstimatedTime TIME,
Price double,
Status int default 0, -- 0 hiển thị dịch vụ, 1 doctor ẩn dịch vụ  
foreign key (idService) references service(id),
foreign key (idDoctor) references account(id) 
)
; -- drop table servicedoctor
INSERT INTO `doccoming`.`servicedoctor` (`idService`, `idDoctor`, `EstimatedTime`, `Price`, `Status`) VALUES ('11', '235523487', '00:30:00', '200000', '0');
INSERT INTO `doccoming`.`servicedoctor` (`idService`, `idDoctor`, `EstimatedTime`, `Price`, `Status`) VALUES ('10', '235523487', '01:00:00', '300000', '0');
INSERT INTO `doccoming`.`servicedoctor` (`idService`, `idDoctor`, `EstimatedTime`, `Price`, `Status`) VALUES ('11', '235523488', '01:30:00', '300000', '0');
INSERT INTO `doccoming`.`servicedoctor` (`idService`, `idDoctor`, `EstimatedTime`, `Price`, `Status`) VALUES ('10', '235523488', '01:00:00', '200000', '0');
INSERT INTO `doccoming`.`servicedoctor` (`idService`, `idDoctor`, `EstimatedTime`, `Price`, `Status`) VALUES ('7', '235523485', '01:00:00', '300000', '0');
INSERT INTO `doccoming`.`servicedoctor` (`idService`, `idDoctor`, `EstimatedTime`, `Price`, `Status`) VALUES ('1', '235523485', '01:00:00', '200000', '0');
INSERT INTO `doccoming`.`servicedoctor` (`idService`, `idDoctor`, `EstimatedTime`, `Price`, `Status`) VALUES ('4', '235523486', '01:00:00', '400000', '0');
INSERT INTO `doccoming`.`servicedoctor` (`idService`, `idDoctor`, `EstimatedTime`, `Price`, `Status`) VALUES ('3', '235523486', '01:00:00', '300000', '0');

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

insert into schedule (idDoctor, Status) values (235523486, 0) ,(235523487, 0) ,(235523488, 0) ,(235523485, 0) ;



create table notification(
id int not null primary key AUTO_INCREMENT,
idAccount int not null CHECK (idAccount !=""),
Notification text(500),
Type varchar(100),
NotiTime datetime default now(),
Status int default 0, -- 0 chưa đọc, 1 đọc rồi
foreign key (idAccount) references account(id)
); -- drop table notification

create table comment(
id int not null primary key AUTO_INCREMENT,
idAccount int not null,
idPost int not null ,
Cmt text(500),
CmtTime datetime,
Love int default 0,
Status int default 0, -- 0 chưa chỉnh sửa, 1 đã chỉnh sửa
foreign key (idAccount) references account(id),
foreign key (idPost) references post(id)
); -- drop table comment

-- alter table replycomment add Love int default 0;

create table replycomment(
id int not null primary key AUTO_INCREMENT,
idAccount int not null,
idComment int not null,
Cmt text(1000),
CmtTime datetime,
Love int default 0,
Status int default 0, -- 0 chưa chỉnh sửa, 1 đã chỉnh sửa
foreign key (idAccount) references account(id),
foreign key (idComment) references comment(id)
); -- drop table replycomment

create table lovecomment(
id int not null primary key AUTO_INCREMENT,
idAccount int not null,
idComment int,
idReplycomment int,
idPost int,
Status int default 0,   -- Status = 0 comment, Status = 1 replyCMT
foreign key (idAccount) references account(id),
foreign key (idComment) references comment(id),
foreign key (idReplycomment) references replycomment(id)
); -- drop table lovecomment

create table ratedoctor(
id int not null primary key AUTO_INCREMENT,
idAppointment int not null unique, 
Star int,
Comment text(1000),
foreign key (idAppointment) references appointment(id)
); -- drop table ratedoctor

create table appointmentnote( 
id int not null primary key AUTO_INCREMENT,
idAppointment int not null unique, 
Advice text(1000),
ReExaminationDate datetime,
Price double,
Status int default 0, -- 0 là bệnh nhân chưa đồng ý, 1 là đã đồng ý, 2 là từ chối
foreign key (idAppointment) references appointment(id)
); -- drop table appointmentnote

create table medicalrecord( 
id int not null primary key AUTO_INCREMENT,
idAppointment int not null unique, 
Record text(1000),
IllnessDate date,
Note text(1000),
foreign key (idAppointment) references appointment(id)
); -- drop table medicalrecord 
-- ------------------------------------------------------------------------------------------------------
delimiter $$
CREATE TRIGGER TG_DELETE_APPOINTMENT before DELETE ON appointment FOR EACH ROW 
BEGIN
    DELETE FROM ratedoctor
    WHERE idAppointment = old.id;
    DELETE FROM appointmentnote
    WHERE idAppointment = old.id;
END$$ -- drop TRIGGER TG_DELETE_APPOINTMENT    

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
END$$ -- drop TRIGGER TG_DELETE_ACCOUNT   

delimiter $$
CREATE TRIGGER TG_INSERT_ACCOUNT_DOCTOR AFTER INSERT ON account FOR EACH ROW 
BEGIN
	if (new.Authorization = 2)
    then
    insert into schedule (idDoctor, Status) values 
	(new.id, 0);
    insert into infordoctor (idAccount) value (new.id);
    end if;
END$$ -- drop trigger TG_INSERT_ACCOUNT_DOCTOR

delimiter $$
CREATE TRIGGER TG_INSERT_ACCOUNT_PATIENT AFTER INSERT ON account FOR EACH ROW 
BEGIN
	if (new.Authorization = 1)
    then
    insert into notification (idAccount, Notification, Type) values  
	(new.id, "Thiết Lập thông tin cá nhân của bạn để đặt lịch khám và khám phá nhiều tính năng hơn trên Doctor Comming!", "Profile");
		if new.PassWord = "Default Password"
		then 
		insert into notification (idAccount, Notification, Type) values  
		(new.id, "Bạn vừa đăng nhập bằng Tài Khoản Google, vui lòng kiểm tra Email để thiết lập mật khẩu mới cho Tài khoản của bạn!", "Email");
		end if;
    end if;
END$$ -- drop trigger TG_INSERT_ACCOUNT_PATIENT

delimiter $$
CREATE TRIGGER TG_UPDATE_PASSWORD AFTER UPDATE ON account FOR EACH ROW 
BEGIN
	if (new.PassWord != old.PassWord)
    then
    insert into notification (idAccount, Notification, Type) values  
	(new.id, "Bạn đã thay đổi mật khẩu cho tài khoản Doccoming!", "None");
    end if;
END$$ -- drop trigger TG_UPDATE_PASSWORD

delimiter $$
CREATE TRIGGER TG_INSERT_APPOINTMENTNOTE AFTER INSERT ON appointmentnote FOR EACH ROW 
BEGIN
    DECLARE Notification varchar(200);
    DECLARE idP int;
    set Notification = CONCAT("Bác sĩ ", (select FullNameDoctor from InforAppointment where id = new.idAppointment), " đã gửi cho bạn một ghi chú sau lần hẹn khám vừa qua!");
    set idP = (select idPatient from appointment where id = new.idAppointment);
    insert into notification (idAccount, Notification, Type) values  
	(idP, Notification, "/patient/appointment");
END$$ -- drop trigger TG_INSERT_APPOINTMENTNOTE	

delimiter $$
CREATE TRIGGER TG_UPDATE_APPOINTMENTNOTE AFTER UPDATE ON appointmentnote FOR EACH ROW 
BEGIN
    DECLARE Notification varchar(200);
    DECLARE idA int;
	
    if (new.Status = 1 and old.Status = 0)
    then
    set Notification = CONCAT("Bệnh nhân ", (select FullNamePatient from InforAppointment where id = new.idAppointment), " đã đồng ý đặt lịch hẹn tái khám!");
    set idA = (select idDoctor from appointment where id = new.idAppointment);
    insert into notification (idAccount, Notification, Type) values  
	(idA, Notification, "/doctor/appointment");
    
    elseif (new.Status = 2)
    then
    set Notification = CONCAT("Bệnh nhân ", (select FullNamePatient from InforAppointment where id = new.idAppointment), " đã từ chối đặt lịch hẹn tái khám!");
    set idA = (select idDoctor from appointment where id = new.idAppointment);
    insert into notification (idAccount, Notification, Type) values  
	(idA, Notification, "/doctor/appointment");
    
    elseif (new.ReExaminationDate = old.ReExaminationDate and new.Price = old.Price)
    then
    set Notification = CONCAT("Bác sĩ ", (select FullNameDoctor from InforAppointment where id = new.idAppointment), " đã chỉnh sửa ghi chú!");
    set idA = (select idPatient from appointment where id = new.idAppointment);
    insert into notification (idAccount, Notification, Type) values  
	(idA, Notification, "/patient/appointment");
    
    elseif (new.Advice = old.Advice)
    then
    set Notification = CONCAT("Bác sĩ ", (select FullNameDoctor from InforAppointment where id = new.idAppointment), " đã chỉnh sửa thông tin tái khám!");
    set idA = (select idPatient from appointment where id = new.idAppointment);
    insert into notification (idAccount, Notification, Type) values  
	(idA, Notification, "/patient/appointment");
    end if;
    
END$$ -- drop trigger TG_UPDATE_APPOINTMENTNOTE	

delimiter $$
CREATE TRIGGER TG_INSERT_MEDICALRECORD AFTER INSERT ON medicalrecord FOR EACH ROW 
BEGIN
    DECLARE Notification varchar(200);
	DECLARE idA int;
    set Notification = CONCAT("Bác sĩ ", (select FullNameDoctor from InforAppointment where id = new.idAppointment), " đã thêm dữ liệu vào lịch sử bệnh án của bạn!");
    set idA = (select idPatient from appointment where id = new.idAppointment);
    insert into notification (idAccount, Notification, Type) values  
	(idA, Notification, "/patient/appointment");
END$$ -- drop trigger TG_INSERT_MEDICALRECORD	

delimiter $$
CREATE TRIGGER TG_UPDATE_MEDICALRECORD AFTER UPDATE ON medicalrecord FOR EACH ROW 
BEGIN
    DECLARE Notification varchar(200);
    DECLARE idA int;
    set Notification = CONCAT("Bác sĩ ", (select FullNameDoctor from InforAppointment where id = new.idAppointment), " đã chỉnh sửa lịch sử bệnh án của bạn!");
	set idA = (select idPatient from appointment where id = new.idAppointment);
    insert into notification (idAccount, Notification, Type) values  
	(idA, Notification, "/patient/appointment");
END$$ -- drop trigger TG_UPDATE_MEDICALRECORD	

delimiter $$
CREATE TRIGGER TG_CHECK_EMAIL BEFORE INSERT ON account FOR EACH ROW 
BEGIN
    DECLARE Count int default 0;
    SET Count = (SELECT COUNT(*) FROM account WHERE Email = new.Email);
    IF Count > 0
    THEN SIGNAL sqlstate '45001' set message_text = "Email đã được dùng để đăng kí tài khoản!";
    END IF;
END$$

delimiter $$
CREATE TRIGGER TG_CHECK_LOVE_CMT BEFORE INSERT ON lovecomment FOR EACH ROW 
BEGIN
    DECLARE Count int default 0;
    DECLARE Notification varchar(200);
	DECLARE idA int;
    DECLARE Type varchar(70);
    set Notification = CONCAT((select CONCAT(FirstName, " ", LastName) from account where id = new.idAccount), " đã thích bình luận của bạn!");
	set Type = CONCAT("/blog/", new.idPost);
    
    SET Count = (SELECT COUNT(*) FROM lovecomment WHERE idAccount = new.idAccount and (idComment = new.idComment or idReplycomment = new.idReplycomment));
    IF Count > 0
    THEN SIGNAL sqlstate '45001' set message_text = "Bạn đã thích bình luận này !";
    ELSEIF new.Status = 0
    THEN
    update comment set Love = Love + 1 where id = new.idComment; 
    set idA = (select idAccount from comment where id = new.idComment);
    insert into notification (idAccount, Notification, Type) values  
	(idA, Notification, Type);
    ELSE
    update replycomment set Love = Love + 1 where id = new.idReplycomment;
    set idA = (select idAccount from replycomment where id = new.idReplycomment);
    insert into notification (idAccount, Notification, Type) values  
	(idA, Notification, Type);
    END IF;
END$$ -- drop trigger TG_CHECK_LOVE_CMT

delimiter $$
CREATE TRIGGER TG_INSERT_COMMENT AFTER INSERT ON comment FOR EACH ROW 
BEGIN
    DECLARE Notification varchar(200);
	DECLARE idA int;
    DECLARE Type varchar(70);
	set Type = CONCAT("/blog/", new.idPost);
    set Notification = CONCAT((select CONCAT(FirstName, " ", LastName) from account where id = new.idAccount), " vừa bình luận vào bài viết của bạn: ", new.Cmt);
    set idA = (select idAuthor from post where id = new.idPost);
    insert into notification (idAccount, Notification, Type) values  
	(idA, Notification, Type);
END$$ -- drop trigger TG_INSERT_COMMENT	

delimiter $$
CREATE TRIGGER TG_INSERT_REPLYCOMMENT AFTER INSERT ON replycomment FOR EACH ROW 
BEGIN
    DECLARE Notification varchar(200);
	DECLARE idA int;
    DECLARE Type varchar(70);
    set Notification = CONCAT((select CONCAT(FirstName, " ", LastName) from account where id = new.idAccount), " vừa trả lời bình luận của bạn: ", new.Cmt);
    set idA = (select idAccount from comment where id = new.idComment);
	set Type = CONCAT("/blog/", (select idPost from comment where id = new.idComment));
    
    insert into notification (idAccount, Notification, Type) values  
	(idA, Notification, Type);
END$$ -- drop trigger TG_INSERT_REPLYCOMMENT	

delimiter $$
CREATE TRIGGER TG_DEL_REP_CMT BEFORE Delete ON replycomment FOR EACH ROW 
BEGIN
    delete from lovecomment where idReplycomment = old.id;
  
END$$ -- drop trigger TG_DEL_CMT

delimiter $$
CREATE TRIGGER TG_DEL_CMT BEFORE Delete ON comment FOR EACH ROW 
BEGIN
    delete from lovecomment where idComment = old.id;
    delete from replycomment where idComment = old.id;
END$$ -- drop trigger TG_DEL_REP_CMT

delimiter $$
CREATE TRIGGER TG_INSERT_RATE_DOCTOR AFTER INSERT ON ratedoctor FOR EACH ROW 
BEGIN
	DECLARE Notification varchar(200);
    DECLARE idA int;
	
    set Notification = CONCAT("Bệnh nhân ", (select FullNamePatient from InforAppointment where id = new.idAppointment), " đã đánh giá ", new.Star, " sao cho bạn!");
    set idA = (select idDoctor from appointment where id = new.idAppointment);
    insert into notification (idAccount, Notification, Type) values  
	(idA, Notification, "/doctor/appointment");
END$$ -- drop trigger TG_INSERT_RATE_DOCTOR

delimiter $$
CREATE TRIGGER TG_UPDATE_RATE_DOCTOR AFTER UPDATE ON ratedoctor FOR EACH ROW 
BEGIN
	DECLARE Notification varchar(200);
    DECLARE idA int;
	
    set Notification = CONCAT("Bệnh nhân ", (select FullNamePatient from InforAppointment where id = new.idAppointment), " đã chỉnh sửa đánh giá cuộc hẹn vừa qua thành ", new.Star, " sao!");
    set idA = (select idDoctor from appointment where id = new.idAppointment);
    insert into notification (idAccount, Notification, Type) values  
	(idA, Notification, "/doctor/appointment");
END$$ -- drop trigger TG_UPDATE_RATE_DOCTOR

delimiter $$
CREATE TRIGGER TG_INSERT_APPOINTMENT AFTER INSERT ON appointment FOR EACH ROW 
BEGIN
    insert into notification (idAccount, Notification, Type) values 
	(new.idPatient, "Bạn đã đặt lịch hẹn khám thành công, vui lòng đợi bác sĩ chấp nhận cuộc hẹn này", "/patient/appointment"),
    (new.idDoctor, "Bạn có một cuộc hẹn mới! Nhanh chóng chấp nhận cuộc hẹn này nào!", "/doctor/appointment");
END$$ -- drop trigger TG_INSERT_APPOINTMENT

delimiter $$
CREATE TRIGGER TG_UPDATE_APPOINTMENT_STATUS AFTER UPDATE ON appointment FOR EACH ROW 
BEGIN
	DECLARE idA int;
	if (new.Status = 1 and  old.Status = 4)
    then
    insert into notification (idAccount, Notification, Type) values 
	(new.idPatient, "Cuộc hẹn của bạn đã được bác sĩ chấp nhận!", "/patient/appointment");
    elseif (new.Status = 2 and  old.Status = 1)
    then
    insert into notification (idAccount, Notification, Type) values 
	(new.idPatient, "Cuộc hẹn của bạn đã hoàn thành!", "/patient/appointment");
    end if;
END$$ -- drop trigger TG_UPDATE_APPOINTMENT_STATUS

delimiter $$
CREATE TRIGGER TG_INSERT_POST AFTER INSERT ON post FOR EACH ROW 
BEGIN
	if (new.idAuthor != 235523484)
    then
    insert into notification (idAccount, Notification, Type) values 
    (235523484, CONCAT('Có một bài viết mới cần kiểm duyệt: ', new.Title), "/admin/manage-post");
    end if;
END$$ -- drop trigger TG_INSERT_POST

delimiter $$
CREATE TRIGGER TG_UPDATE_POST_STATUS AFTER UPDATE ON post FOR EACH ROW 
BEGIN
	DECLARE idAuthor INT;
    DECLARE Title varchar(500);
    SET idAuthor = (SELECT idAuthor FROM post WHERE id = new.id);
    SET Title = (SELECT Title FROM post WHERE id = new.id);
	if (new.Status = 1 and  old.Status = 0)
    then
    insert into notification (idAccount, Notification, Type) values 
	(new.idAuthor, "Bài viết của bạn đã được Admin chấp nhận. Mau đến xem nào!", CONCAT("/blog/", new.id));
    elseif (new.Status = 2 and  old.Status = 1)
    then
    insert into notification (idAccount, Notification, Type) values 
	(new.idAuthor, CONCAT("Bài viết ", Title, " của bạn đã bị Admin ẩn khỏi hệ thống!"), "None");
    elseif (new.Status = 1 and  old.Status = 2)
    then
    insert into notification (idAccount, Notification, Type) values 
	(new.idAuthor, CONCAT("Bài viết ", Title, " của bạn đã được Admin khôi phục và hiển thị lại trên hệ thống!"), CONCAT("/blog/", new.id));
    end if;
END$$ -- drop trigger TG_UPDATE_POST_STATUS


--------------------------------
delimiter $$
CREATE VIEW AllPost AS
select pacs.id, pacs.FeaturedImage, pacs.Title, pacs.Brief, pacs.Content, pacs.DatePost, pacs.idAuthor, pacs.FirstName, pacs.LastName, pacs.Avt, pacs.idCategories, pacs.Categories,
 pacs.idSimilar, pacs.Similar, pacs.idMajor, m.Major, pacs.idClassify, pacs.Classify, pacs.Status
from
(SELECT p.id, p.FeaturedImage, p.Title, p.Brief, p.Content, p.DatePost, a.id as idAuthor, a.FirstName, a.LastName, a.Avt, p.idCategories, c.Categories, p.idSimilar, s.Similar, p.idMajor,
 p.idClassify, cp.Classify, p.Status
FROM post p, account a, categories c, similarcategories s, classifypost cp
WHERE p.idAuthor = a.id and p.idCategories = c.id and p.idSimilar = s.id and p.idClassify = cp.id) as pacs
left join major m
on pacs.idMajor = m.id
order by pacs.DatePost desc
$$ -- drop view AllPost --  select * from AllPost
 
delimiter $$
CREATE VIEW AvailablePost AS
select pacs.id, pacs.FeaturedImage, pacs.Title, pacs.Brief, pacs.Content, pacs.DatePost, pacs.idAuthor, pacs.FirstName, pacs.LastName, pacs.Avt, pacs.Categories, pacs.Similar,
 pacs.idMajor, m.Major, pacs.idClassify, pacs.Classify
from
(SELECT p.id, p.FeaturedImage, p.Title, p.Brief, p.Content, p.DatePost, a.id as idAuthor, a.FirstName, a.LastName, a.Avt, c.Categories, s.Similar, p.idMajor, p.idClassify, cp.Classify
FROM post p, account a, categories c, similarcategories s, classifypost cp
WHERE p.idAuthor = a.id and p.idCategories = c.id and p.idSimilar = s.id AND p.Status = 1 order by p.DatePost desc) as pacs
left join major m
on pacs.idMajor = m.id
$$ -- drop view AvailablePost

delimiter $$
CREATE VIEW AllAccount AS
SELECT ta.id, ta.FirstName, ta.LastName, ta.BirthDate, ta.Gender, ta.Address, ta.Email, ta.Phone, ta.Avt, ta.Role, ta.CreatedAt , dm.Major, dm.Degree, dm.Introduce, dm.Experience, dm.Training
FROM
(SELECT a.id, a.FirstName, a.LastName, a.BirthDate, a.Gender, a.Address, a.Email, a.Phone, a.Avt, t.Role, a.CreatedAt
FROM account a, authorization t
WHERE a.Authorization = t.id) as ta
LEFT JOIN
(SELECT d.idAccount, m.Major, d.Degree, d.Introduce, d.Experience, d.Training
FROM  inforDoctor d, major m
WHERE d.idMajor = m.id) as dm
ON ta.id = dm.idAccount where ta.Role != "Admin" order by CreatedAt desc
$$ -- drop view AllAccount

delimiter $$
CREATE VIEW InforAppointment AS
select aac.id, CONCAT(ac.FirstName, " ", ac.LastName) as FullNamePatient, aac.FullNameDoctor
from
(select a.id, CONCAT(acc.FirstName, " ", acc.LastName) as FullNameDoctor, a.idPatient
from appointment a, account acc
where a.idDoctor = acc.id) as aac
left join account ac
on aac.idPatient = ac.id 
$$

delimiter $$
CREATE VIEW AllAppointment AS
SELECT acs.id, acs.idService, acs.Service, acs.idPatient, acs.FullNamePatient, 
acs.GenderPatient, acs.AddressPatient, acs.EmailPatient, acs.PhonePatient, acs.AvtPatient, 
acs.idDoctor, CONCAT(acc.FirstName, " ", acc.LastName) as FullNameDoctor, acc.Gender as GenderDoctor, acc.Email as EmailDoctort, 
acc.Phone as PhoneDoctor, acc.Avt as AvtDoctor, acs.DateBooking, acs.TimeBooking, acs.Price, acs.Status, acs.Information, ast.Type, r.id as rateid, r.Star, r.Comment, 
apptn.Advice, apptn.ReExaminationDate, apptn.Price as ReExaminationPrice, apptn.Status as NoteStatus,
mr.id as idMedicalRecord, mr.Record, mr.IllnessDate, mr.Note as NoteRecord
From
(SELECT a.id, a.idService, s.Service, a.idPatient, a.idDoctor, CONCAT(ac.FirstName, " ", ac.LastName) as FullNamePatient, 
ac.Gender as GenderPatient, ac.Address as AddressPatient, ac.Email as EmailPatient, ac.Phone as PhonePatient, ac.Avt as AvtPatient, a.DateBooking, a.TimeBooking, a.Price, a.Status, a.Information
FROM appointment a, account ac, service s
where a.idPatient = ac.id and a.idService = s.id) as acs
left join account acc
on acs.idDoctor = acc.id 
left join  appointmentstatus ast
on ast.id = acs.Status 
left join appointmentnote apptn
on apptn.idAppointment = acs.id
left join ratedoctor r
on r.idAppointment = acs.id 
left join medicalrecord mr
on mr.idAppointment = acs.id 
order by acs.DateBooking desc, acs.TimeBooking desc
$$ -- drop view AllAppointment

delimiter $$
CREATE VIEW AllCategory AS
SELECT c.id, c.Categories, c.Image, c.Description, s.id as idSimilar, s.Similar, s.Image as ImageSimilar, s.Description as DescriptionSimilar
FROM categories c 
LEFT JOIN similarCategories s 
on c.id = s.idCategories 
ORDER BY c.id, idsimilar
$$ 

delimiter $$
CREATE VIEW AllDoctor AS
select aim.id, aim.FirstName, aim.LastName, aim.Gender, aim.Avt, aim.Email, aim.Degree, aim.Introduce, aim.idMajor, aim.Major, aim.Experience, aim.Training, ra.Star
FROM
(select a.id, a.FirstName, a.LastName, a.Gender, a.Avt, a.Email, i.Degree, i.Introduce, i.idMajor, m.Major, i.Experience, i.Training 
FROM account a, inforDoctor i, major m 
where a.id = i.idAccount 
and m.id = i.idMajor) as aim
left join
(select idDoctor, avg(Star) as Star from ratedoctor r, appointment a where r.idAppointment = a.id group by a.idDoctor) as ra
on aim.id = ra.idDoctor;
$$ -- drop view AllDoctor
 
delimiter $$
CREATE VIEW AllMajorDoctor AS
SELECT *
FROM major
$$
 
delimiter $$
CREATE VIEW getAvgPriceService AS
select s.id, s.Service, avg(sd.Price) as FriceFloor
from servicedoctor sd, service s
where sd.idService = s.id
group by s.id
order by s.id
$$ -- drop VIEW getAvgPriceService    


delimiter $$
CREATE view countTotal as
select ca.y as year, ca.m as month, ca.TotalApptn, cp.TotalPost, cacc.TotalAcc
From
countAllAppointment ca, countAllPost cp, countAllAccount cacc
where ca.y = cp.y and ca.m = cp.m and cp.y = cacc.y and cp.m = cacc.m
$$ -- drop view countTotal -- select * from countTotal


delimiter $$
CREATE view countAllAppointment as
SELECT  y, m ,  Count(DateBooking)  as TotalApptn 
FROM 
	(SELECT y, m
	FROM
		(SELECT YEAR(CURDATE()) y UNION ALL SELECT YEAR(CURDATE())-1) years,
		(SELECT 1 m UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
		UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8
		UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12) months) ym
	LEFT JOIN  AllAppointment a
	ON ym.y = YEAR(DateBooking) AND ym.m = MONTH(DateBooking)
WHERE (y = YEAR(CURDATE()) AND m <= MONTH(CURDATE())) OR (y < YEAR(CURDATE()) AND m > MONTH(CURDATE()))
GROUP BY y, m
order by y, m;
$$ 

delimiter $$
CREATE view countAllPost as
SELECT  y, m , Count(DatePost) as TotalPost
FROM 
	(SELECT y, m
	FROM
		(SELECT YEAR(CURDATE()) y UNION ALL SELECT YEAR(CURDATE())-1) years,
		(SELECT 1 m UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
		UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8
		UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12) months) ym
    LEFT JOIN  AllPost 
	ON ym.y = YEAR(DatePost) AND ym.m = MONTH(DatePost)
WHERE (y = YEAR(CURDATE()) AND m <= MONTH(CURDATE())) OR (y < YEAR(CURDATE()) AND m > MONTH(CURDATE()))
GROUP BY y, m
order by y, m;
$$ 

delimiter $$
CREATE view countAllAccount as
SELECT  y, m , Count(CreatedAt) as TotalAcc
FROM 
	(SELECT y, m
	FROM
		(SELECT YEAR(CURDATE()) y UNION ALL SELECT YEAR(CURDATE())-1) years,
		(SELECT 1 m UNION ALL SELECT 2 UNION ALL SELECT 3 UNION ALL SELECT 4
		UNION ALL SELECT 5 UNION ALL SELECT 6 UNION ALL SELECT 7 UNION ALL SELECT 8
		UNION ALL SELECT 9 UNION ALL SELECT 10 UNION ALL SELECT 11 UNION ALL SELECT 12) months) ym
    LEFT JOIN  AllAccount 
	ON ym.y = YEAR(CreatedAt) AND ym.m = MONTH(CreatedAt)
WHERE (y = YEAR(CURDATE()) AND m <= MONTH(CURDATE())) OR (y < YEAR(CURDATE()) AND m > MONTH(CURDATE()))
GROUP BY y, m
order by y, m;
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
    declare Auth INT default 0;
    SET Auth = (select a.Authorization from post p, account a where p.idAuthor = a.id and p.id = id );
    IF (Auth = 2)
    THEN
    SELECT pacis.id, pacis.FeaturedImage, pacis.Title, pacis.Brief, pacis.Content, pacis.DatePost, pacis.idAuthor, pacis.FirstName, pacis.LastName, pacis.Avt, pacis.Degree, pacis.idCategories, 
    pacis.Categories, pacis.idSimilar, pacis.Similar, pacis.idMajor, m.Major, pacis.idClassify, pacis.Classify
    FROM
    (SELECT p.id, p.FeaturedImage, p.Title, p.Brief, p.Content, p.DatePost, a.id as idAuthor, a.FirstName, a.LastName, a.Avt, i.Degree, c.id as idCategories, c.Categories, s.id as idSimilar,
    s.Similar, p.idMajor, p.idClassify, cp.Classify
    FROM post p, account a, categories c, inforDoctor i, similarcategories s, classifypost cp
    WHERE p.idAuthor = a.id and p.idCategories = c.id and a.id = i.idAccount and p.idSimilar = s.id and p.idClassify = cp.id and p.id = id AND p.Status = 1) as pacis
    left join major m
    on pacis.idMajor = m.id ;
    else
    SELECT pacs.id, pacs.FeaturedImage, pacs.Title, pacs.Brief, pacs.Content, pacs.DatePost, pacs.idAuthor, pacs.FirstName, pacs.LastName, pacs.Avt, pacs.idCategories, 
    pacs.Categories, pacs.idSimilar, pacs.Similar, pacs.idMajor, m.Major, pacs.idClassify, pacs.Classify
    FROM
    (SELECT p.id, p.FeaturedImage, p.Title, p.Brief, p.Content, p.DatePost, a.id as idAuthor, a.FirstName, a.LastName, a.Avt, c.id as idCategories, c.Categories, s.id as idSimilar, s.Similar,
    p.idMajor, p.idClassify, cp.Classify
    FROM post p, account a, categories c, similarcategories s, classifypost cp
    WHERE p.idAuthor = a.id and p.idCategories = c.id and p.idSimilar = s.id and p.idClassify = cp.id and p.id = id AND p.Status = 1) as pacs
    left join major m
    on pacs.idMajor = m.id ;
    END IF;
END$$ -- drop PROCEDURE PostDetailById -- call PostDetailById (1)

DELIMITER $$ 
CREATE PROCEDURE SimilarDoctorById (IN idP int)
BEGIN
    declare idM INT default 0;
    SET idM = (select idMajor from post where id = idP );
    SELECT a.id, a.FirstName, a.LastName, a.Avt, i.Degree
    FROM account a, inforDoctor i
    WHERE a.id = i.idAccount and i.idMajor = idM;
END$$ -- drop PROCEDURE SimilarDoctorById

DELIMITER $$
CREATE PROCEDURE PostByCategories(IN id int )
BEGIN
	SELECT  pa.id, pa.FeaturedImage, pa.Title, pa.Brief, pa.Content, pa.DatePost, pa.Similar, pa.FirstName, pa.LastName, pa.Avt, i.Degree, pa.idMajor, pa.idClassify, pa.Classify
    FROM
    (SELECT p.id, p.FeaturedImage, p.Title, p.Brief, p.Content, p.DatePost, s.Similar, a.FirstName, a.LastName, a.Avt, p.idMajor, p.idClassify, cp.Classify
    FROM post p, account a, similarcategories s, classifypost cp
    WHERE p.idAuthor = a.id and p.idCategories = id and p.idSimilar = s.id and p.idClassify = cp.id  and p.Status = 1) as pa
    LEFT JOIN infordoctor i
    on pa.id = i.idAccount; 
END$$ -- drop procedure PostByCategories -- 


DELIMITER $$
CREATE PROCEDURE PostBySimilarCategories(IN id int )
BEGIN
	SELECT  pa.id, pa.FeaturedImage, pa.Title, pa.Brief, pa.Content, pa.DatePost, pa.Categories, pa.FirstName, pa.LastName, pa.Avt, i.Degree, pa.idMajor, pa.idClassify, pa.Classify
    FROM
    (SELECT p.id, p.FeaturedImage, p.Title, p.Brief, p.Content, p.DatePost, c.Categories, a.FirstName, a.LastName, a.Avt, p.idMajor, p.idClassify, cp.Classify
    FROM post p, account a, categories c, classifypost cp
    WHERE p.idAuthor = a.id and p.idSimilar = id and p.idCategories = c.id and p.idClassify = cp.id  AND p.Status = 1 ) as pa
    LEFT JOIN infordoctor i
    on pa.id = i.idAccount; 
END$$ -- drop procedure PostBySimilarCategories

DELIMITER $$
CREATE PROCEDURE ListSearch(IN search text )
BEGIN
	SELECT  pa.id, pa.LastName, pa.FirstName, pa.Categories, pa.FeaturedImage, pa.Similar, pa.Title, pa.Brief, pa.Content, pa.idAuthor,
    pa.DatePost, pa.Avt, i.Degree, pa.idMajor, pa.idClassify, pa.Classify
    FROM
    (SELECT a.LastName, a.FirstName, c.Categories, p.FeaturedImage, s.Similar, p.Title, p.Brief, p.Content, p.id, p.idAuthor, p.DatePost, a.Avt, p.idMajor, p.idClassify, cp.Classify
    FROM  account a, categories c, post p, similarcategories s, classifypost cp
    WHERE p.Status = 1 
    AND p.idCategories = c.id 
    AND a.id = p.idAuthor 
    AND p.idSimilar = s.id
	and p.idClassify = cp.id
    AND (c.Categories like search or p.Title like search 
    or  p.Brief like search or s.Similar like search) ) as pa
	LEFT JOIN infordoctor i
    on pa.id = i.idAccount;
END$$ -- drop PROCEDURE ListSearch

DELIMITER $$
CREATE PROCEDURE SearchDoctor(IN search text )
BEGIN
	SELECT aim.id, aim.LastName, aim.FirstName, aim.Avt, aim.Gender, aim.Email, aim.Degree, aim.Introduce, aim.major, aim.Experience, aim.Training, ra.Star
    FROM
    (SELECT a.id, a.LastName, a.FirstName, a.Avt, a.Gender, a.Email, i.Degree, i.Introduce, m.major, i.Experience, i.Training
    FROM  account a, infordoctor i, major m
    WHERE a.id = i.idAccount
    AND i.idMajor = m.id
    AND (a.LastName like search or a.FirstName like  search )) as aim
    left join
    (select idDoctor, avg(Star) as Star from ratedoctor r, appointment a where r.idAppointment = a.id group by a.idDoctor) as ra 
	on aim.id = ra.idDoctor;
END$$ -- drop PROCEDURE SearchDoctor

DELIMITER $$
CREATE PROCEDURE SearchDisease(IN search text )
BEGIN
    SELECT acc.id, pi.idMajor, pi.Major, acc.FirstName, acc.LastName, acc.Gender, acc.Email, acc.Avt, pi.Degree, pi.Introduce, pi.Experience, pi.Training
    FROM
    (SELECT p.Title, p.Brief, p.idMajor, m.Major, i.idAccount, i.Degree, i.Introduce, i.Experience, i.Training
    FROM  post p, infordoctor i, major m 
    WHERE p.idMajor = i.idMajor and i.idMajor = m.id and (p.Title like search or  p.Brief like search)) as pi
    left join
	account acc
	on acc.id = pi.idAccount and acc.Authorization = 2;
END$$ -- drop PROCEDURE SearchDisease call SearchDisease('%huyết áp%') call AllCmt(12)

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
    SET COUNT = (select count(*) from schedule s where s.SpecificDay = DateBooking and s.idDoctor = idDoctor);
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

delimiter $$
CREATE PROCEDURE CHECK_SERVICE (IN idService int, IN idDoctor int, IN EstimatedTime TIME, IN Price Double)
BEGIN
	DECLARE Count int default 0;
    SET Count = (select count(*) from servicedoctor s where s.idService = idService and s.idDoctor = idDoctor);
    IF Count > 0
    THEN
    update servicedoctor s set s.EstimatedTime = EstimatedTime, s.Price = Price where s.idService = idService and s.idDoctor = idDoctor;
    ELSE 
    insert into servicedoctor (idService, idDoctor, EstimatedTime, Price) values (idService,idDoctor,EstimatedTime,Price);
    END IF;
END$$ -- drop PROCEDURE CHECK_SERVICE 

DELIMITER $$  
CREATE PROCEDURE AllCmt (IN idPost int)
BEGIN
	select  ac.id, ac.LastName, ac.FirstName, ac.Avt,  ac.idAccount, ac.Cmt, ac.CmtTime, ac.Love, "false" as IsLoved, ac.Status, ar.LastName as repLastName, ar.FirstName as repFirstName, 
			ar.Avt as repAvt, ar.id as repid, ar.idAccount as repidAccount , ar.Cmt as repCmt, ar.CmtTime as repCmtTime, ar.Love as repLove, "false" as repIsLoved, ar.Status as repStatus
    from
    (SELECT a.LastName, a.FirstName, a.Avt, c.id, c.idAccount, c.idPost, c.Cmt, c.CmtTime, c.Love, c.Status 
    FROM account a, comment c 
    where a.id = c.idAccount and c.idPost = idPost ) as ac
    left join 
    (SELECT a.LastName, a.FirstName, a.Avt, r.id, r.idAccount, r.idComment, r.Cmt, r.CmtTime, r.Love, r.Status 
    FROM account a, replycomment r
    where a.id = r.idAccount) as ar
    on ac.id = ar.idComment 
    ORDER BY ac.CmtTime desc, repCmtTime desc ;
    
END$$ -- drop PROCEDURE AllCmt call AllCmt(1) select idComment, idReplycomment, Status from lovecomment where idAccount = 235523490 and idPost = 1

delimiter $$
CREATE procedure detailDoctor (IN id int)
select aim.id, aim.FullName, aim.Gender, aim.Avt, aim.Phone, aim.Address, aim.BirthDate, aim.Email, aim.Degree, aim.Introduce, aim.idMajor, aim.Major, aim.Experience, aim.Training, ra.Star
FROM
(select a.id, CONCAT(a.FirstName, ' ', a.LastName) as FullName, a.Gender, a.Avt, a.Phone, a.Address, a.BirthDate, a.Email, i.Degree, i.Introduce, i.idMajor, m.Major, i.Experience, i.Training 
 FROM account a, inforDoctor i, major m
 where a.id = i.idAccount and m.id = i.idMajor and a.id = id) as aim
left join
(select idDoctor, avg(Star) as Star from ratedoctor r, appointment a where r.idAppointment = a.id and a.idDoctor = id) as ra 
on aim.id = ra.idDoctor;
$$ -- drop procedure detailDoctor

delimiter $$
CREATE procedure getProfile (IN id int)
select a.id, CONCAT(FirstName, ' ', LastName) as FullName, BirthDate, Gender, Address, Email, Phone, Avt from account a where a.id = id;
$$ -- drop procedure getProfile	
 
delimiter $$
CREATE procedure RateDoctor (IN id int)
select r.idAppointment, ap.idPatient, CONCAT(a.FirstName, ' ', a.LastName) as FullName, a.Gender, a.Avt, r.Comment, r.Star
from ratedoctor r, account a, appointment ap
where r.idAppointment = ap.id and a.id = ap.idPatient and ap.idDoctor = id
$$ -- drop procedure RateDoctor 

delimiter $$
CREATE procedure getAccountByKeyword (IN search text )
SELECT ta.id, ta.FirstName, ta.LastName, ta.BirthDate, ta.Address, ta.Email, ta.Phone, ta.Avt, ta.Role, ta.CreatedAt , dm.Major
FROM
(SELECT a.id, a.FirstName, a.LastName, a.BirthDate, a.Address, a.Email, a.Phone, a.Avt, t.Role, a.CreatedAt
FROM account a, authorization t
WHERE a.Authorization = t.id) as ta
LEFT JOIN
(SELECT d.idAccount, m.Major
FROM  inforDoctor d, major m
WHERE d.idMajor = m.id) as dm
ON ta.id = dm.idAccount where ta.Role != "Admin" and (ta.FirstName like search or ta.LastName like search or ta.Phone like search or ta.Email like search)
$$ -- drop procedure getAccountByKeyword

delimiter $$
CREATE procedure getPostByKeyword (IN search text )
select pacs.id, pacs.FeaturedImage, pacs.Title, pacs.Brief, pacs.Content, pacs.DatePost, pacs.idAuthor, pacs.FirstName, pacs.LastName, pacs.Avt, pacs.idCategories, pacs.Categories,
 pacs.idSimilar, pacs.Similar, pacs.idMajor, m.Major, pacs.idClassify, pacs.Classify, pacs.Status
from
(SELECT p.id, p.FeaturedImage, p.Title, p.Brief, p.Content, p.DatePost, a.id as idAuthor, a.FirstName, a.LastName, a.Avt, p.idCategories, c.Categories, p.idSimilar, s.Similar, p.idMajor,
 p.idClassify, cp.Classify, p.Status
FROM post p, account a, categories c, similarcategories s, classifypost cp
WHERE p.idAuthor = a.id and p.idCategories = c.id and p.idSimilar = s.id and p.idClassify = cp.id
and (p.Title like search or p.Brief like search or CONCAT(a.FirstName, ' ', a.LastName) like search or c.Categories like search)) as pacs
left join major m
on pacs.idMajor = m.id 
order by pacs.DatePost desc
$$ -- drop procedure getPostByKeyword call getPostByKeyword('%kim dung%')

delimiter $$
CREATE procedure getAppointmentPatient (IN idP int)
select acsv.id, acsv.idService, acsv.Service, acsv.idDoctor, acsv.LastName, acsv.FirstName, acsv.Phone, acsv.Avt, acsv.DateBooking, acsv.TimeBooking, acsv.Price, acsv.Status,
 acsv.Information, acsv.Type, r.id as rateid, r.Star, r.Comment, apptn.Advice, apptn.ReExaminationDate, apptn.Price as ReExaminationPrice, apptn.Status as NoteStatus,
 mr.id as idMedicalRecord, mr.Record, mr.IllnessDate,mr.Note as NoteRecord
from
(select a.id, sv.id as idService, sv.Service, a.idDoctor, ac.LastName, ac.FirstName, ac.Phone, ac.Avt, a.DateBooking, a.TimeBooking, a.Price, a.Status, a.Information, s.Type
from account ac, appointment a, appointmentstatus s, service sv
where ac.id = a.idDoctor 
and a.Status = s.id and a.idService = sv.id and a.idPatient = idP 
order by DateBooking, TimeBooking) as acsv
left join appointmentnote apptn
on apptn.idAppointment = acsv.id
left join ratedoctor r
on r.idAppointment = acsv.id 
left join medicalrecord mr
on mr.idAppointment = acsv.id 
order by acsv.DateBooking desc, acsv.TimeBooking desc
$$ -- drop procedure getAppointmentPatient

delimiter $$
CREATE procedure getAppointmentDoctor (IN idD int)
select acsv.id, acsv.idService, acsv.Service, acsv.idPatient, acsv.LastName, acsv.FirstName, acsv.Phone, acsv.Avt, acsv.Address, acsv.DateBooking, acsv.TimeBooking, acsv.Price, acsv.Status,
 acsv.Information, acsv.Type, r.id as rateid, r.Star, r.Comment, apptn.Advice, apptn.ReExaminationDate, apptn.Price as ReExaminationPrice, svd.EstimatedTime, apptn.Status as NoteStatus, 
 mr.id as idMedicalRecord, mr.Record, mr.IllnessDate, mr.Note as NoteRecord
from
(select a.id, sv.id as idService, sv.Service, a.idPatient, ac.LastName, ac.FirstName, ac.Phone, ac.Avt, ac.Address, a.DateBooking, a.TimeBooking, a.Price, a.Status, a.Information, s.Type
from account ac, appointment a, appointmentstatus s, service sv
where ac.id = a.idPatient 
and a.Status = s.id and a.idService = sv.id and a.idDoctor = idD
order by DateBooking, TimeBooking) as acsv
left join appointmentnote apptn
on apptn.idAppointment = acsv.id
left join ratedoctor r
on r.idAppointment = acsv.id 
left join servicedoctor svd
on svd.idDoctor = idD and svd.idService = acsv.idService
left join medicalrecord mr
on mr.idAppointment = acsv.id 
order by acsv.DateBooking desc, acsv.TimeBooking desc
$$ -- drop procedure getAppointmentDoctor 

delimiter $$
CREATE procedure getNotification (IN idA int)
select n.id, n.Notification, n.Type, n.NotiTime, n.Status, c.Unread 
from notification n 
left join 
(select count(idAccount) as Unread, idAccount from notification where idAccount = idA and Status = 0) as c
on n.idAccount = c.idAccount 
where n.idAccount = idA
order by NotiTime desc 
limit 10
$$ -- drop procedure getNotification    call getNotification(235523500)

delimiter $$
CREATE procedure getMedicalRecordPatient (IN idP int)
select m.id, m.idAppointment, acc.id as idDoctor, CONCAT(acc.FirstName, ' ', acc.LastName) as FullNameDoctor, m.Record, m.IllnessDate, m.Note
from medicalrecord m, account acc, appointment a
where m.idAppointment = a.id and acc.id = a.idDoctor and a.idPatient = idP

$$ -- drop procedure getMedicalRecordPatient 

delimiter $$
CREATE procedure getMedicalRecordDoctor (IN Y int)
select m.id, m.idAppointment, acc.id as idPatient, CONCAT(acc.FirstName, ' ', acc.LastName) as FullNamePatient, m.Record, m.IllnessDate, m.Note
from medicalrecord m, account acc, appointment a
where m.idAppointment = a.id and acc.id = a.idPatient and a.idDoctor = idD
$$ -- drop procedure getMedicalRecordDoctor 

select * from AllPost WHERE 

-- ================================ ADD DB ===============================================================
-- insert into similarcategories (idCategories, Similar, Image, Description) values 
-- ('1', 'Tiểu đường type 1', 'https://res.cloudinary.com/doccomming/image/upload/v1717327128/Category1_nva3da.webp', 'Bệnh tiểu đường type 1 là một bệnh tự miễn, do hệ thống miễn dịch tấn công nhầm vào các tế bào beta sản xuất insulin trong tuyến tụy, làm tuyến này mất dần khả năng sản xuất insulin. Do đó, người bệnh phải phụ thuộc vào việc tiêm insulin.'),
-- ('1', 'Tiểu đường type 1', 'https://res.cloudinary.com/doccomming/image/upload/v1717327128/Category1_nva3da.webp', 'Bệnh tiểu đường type 1 là một bệnh tự miễn, do hệ thống miễn dịch tấn công nhầm vào các tế bào beta sản xuất insulin trong tuyến tụy, làm tuyến này mất dần khả năng sản xuất insulin. Do đó, người bệnh phải phụ thuộc vào việc tiêm insulin.'),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- (),
-- ()