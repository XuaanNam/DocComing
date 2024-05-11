const pool = require("../models/pool");
const fs = require("fs");
const express = require("express");
const path = require("path");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRound = 7;
const encodeToken = require("../../util/encodeToken");
const createError = require("http-errors");
const myOAuth2Client = require("../../app/configs/oauth2client");
const nodemailer = require("nodemailer");
const { Console } = require("console");

class API {
  // [POST] /api/execute/query
  executeQuery(req, res, next) {
    const { query, data } = req.body;
    pool.query(query, data, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results) {
          res.status(200).send({ data: results, checked: true });
        } else {
          res.status(200).send({ message: "lỗi k xác định", checked: false });
        }
      }
    });
  }

  // [POST] /api/register
  register(req, res, next) {
    const insertSql =
      "insert into account (Email, PassWord, LastName, FirstName) values (?,?,?,?)";
    const errorMsg = "Đã có lỗi xảy ra, vui lòng thử lại!";
    const successMsg = "Tài khoản đã đăng kí thành công!";
    const { Email, PassWord, FullName } = req.body;
    const fn = FullName.split(" "); // Duong Quoc ANh
    let FirstName = " ";
    const LastName = fn[fn.length - 1];
    for (let i = 0; i < fn.length - 1; i++) {
      FirstName += fn[i] + " ";
    }
    //const picture = req.body.picture;
    bcrypt.hash(PassWord, saltRound, (err, hash) => {
      if (err) {
        res.status(200).send({ message: err, checked: false });
      } else {
        pool.query(
          insertSql,
          [Email, hash, LastName, FirstName],
          function (error, results, fields) {
            if (error) {
              res.send({ message: error, checked: false });
            } else {
              res.send({ message: successMsg, checked: true });
            }
          }
        );
      }
    });
  }

  // [GET] /api/isauth
  isAuth(req, res, next) {
    const auth = req.user;
    console.log(auth);
    if (auth) {
      res.status(200).send({ authentication: auth });
    } else {
      return next(createError(401));
    }
  }

  // [POST] /api/login
  login(req, res, next) {
    const sql =
      "select id, Email, FirstName, PassWord, LastName, Authorization from account where Email = ? ";
    const message = "Số điện thoại hoặc mật khẩu không chính xác!";
    const Email = req.body.Email;
    const PassWord = req.body.PassWord;

    pool.query(sql, Email, function (error, results, fields) {
      if (error) {
        res.send({ message: error });
      } else {
        if (results.length > 0) {
          bcrypt.compare(PassWord, results[0].PassWord, (err, response) => {
            if (response) {
              const payload = {
                iss: "Doccoming",
                id: results[0].id,
                Authorization: results[0].Authorization,
              };
              const token = "Bearer " + encodeToken(payload);

              //res.setHeader("isAuth", token);
              res.send({
                checked: true,
                token,
                id: results[0].id,
                FullName: results[0].FirstName + " " + results[0].LastName,
                authentication: results[0].Authorization,
              });
            } else {
              res.status(200).send({ message, checked: false });
            }
          });
        } else {
          res.status(200).send({ message, checked: false });
        }
      }
    });
  }

  // [POST] /api/auth/google/check
  Google(req, res) {
    const { email, name, googlePhotoUrl } = req.body;
    const sql =
      "select id, Authorization, FirstName, LastName from account where Email = ? ";
    const fn = name.split(" ");
    let lastName = fn[fn.length - 1];
    let firstName = "";
    for (let i = 0; i < fn.length - 1; i++) {
      firstName = firstName + fn[i] + " ";
    }

    let payload = {};
    let token = "";
    const insertSql =
      "insert into account (Email, FirstName, LastName, Avt, PassWord) values (?, ?, ?, ?)";
    const password = "null";
    try {
      pool.query(sql, email, function (error, results, fields) {
        if (error) {
          res.send({ message: error });
        } else {
          if (results.length > 0) {
            payload = {
              iss: "Doccoming",
              id: results[0].id,
              Authorization: results[0].Authorization,
            };
            token = "Bearer " + encodeToken(payload);
            res.send({
              checked: true,
              token,
              id: results[0].id,
              FullName: results[0].FirstName + results[0].LastName,
              authentication: results[0].Authorization,
              googlePhotoUrl,
            });
          } else {
            pool.query(
              insertSql,
              [email, firstName, lastName, googlePhotoUrl, password],
              function (error, results, fields) {
                if (error) res.send({ message: error });
                else if (results) {
                  payload = {
                    iss: "Doccoming",
                    id: results.insertId,
                    Authorization: "1",
                  };
                  token = "Bearer " + encodeToken(payload);
                  res.send({
                    checked: true,
                    token,
                    id: results.insertId,
                    name,
                    authentication: "1",
                    googlePhotoUrl,
                  });
                }
              }
            );
          }
        }
      });
    } catch (error) {
      next(error);
    }
  }

  //[POST] /api/send/otp
  sendOTP(req, res, next) {}

  //[POST] /api/send/mail
  async sendMail(req, res, next) {
    try {
      // Lấy thông tin gửi lên từ client qua body
      const { email, subject, content } = req.body;
      if (!email || !subject || !content)
        throw new Error("Please provide email, subject and content!!!");
      const sms = "+84337999421@SMS-gateway";
      const myAccessTokenObject = await myOAuth2Client.getAccessToken();
      /**
       * Lấy AccessToken từ RefreshToken (bởi vì Access Token cứ một khoảng thời gian ngắn sẽ bị hết hạn)
       * Vì vậy mỗi lần sử dụng Access Token, chúng ta sẽ generate ra một thằng mới là chắc chắn nhất.
       **/
      // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
      const myAccessToken = myAccessTokenObject?.token;
      // Tạo một biến Transport từ Nodemailer với đầy đủ cấu hình, dùng để gọi hành động gửi mail
      const transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          type: "OAuth2",
          user: process.env.ADMIN_EMAIL_ADDRESS,
          clientId: process.env.GOOGLE_MAILER_CLIENT_ID,
          clientSecret: process.env.GOOGLE_MAILER_CLIENT_SECRET,
          refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN,
          accessToken: myAccessToken,
        },
      });
      // mailOption là những thông tin gửi từ phía client lên thông qua API
      const mailOptions = {
        to: email,
        subject: subject, // Tiêu đề email
        html: `<h3>${content}</h3>`, // Nội dung email
      };
      // Gọi hành động gửi email
      await transport.sendMail(mailOptions);
      // Không có lỗi gì thì trả về success
      res
        .status(200)
        .json({ message: "Đã gửi mail về hộp thư. Vui lòng kiểm tra!" });
    } catch (error) {
      // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client

      res.status(500).json({ errors: error.message });
    }
  }

  // Profile
  //[GET] /api/profile
  getProfile(req, res) {
    const id = req.user.id;
    const selectSql = "select * from account where id = ?";
    const errorMsg = "Lỗi hệ thống, không thể lấy thông tin!";

    pool.query(selectSql, id, function (error, results, fields) {
      if (error) {
        res.send({ message: errorMsg, checked: false });
      } else {
        if (results.length > 0) {
          if (results[0].BirthDate) {
            const bd = results[0].BirthDate.split("-"); //yyyy-mm-dd
            const birth = bd[2] + "/" + bd[1] + "/" + bd[0];
            results[0].BirthDate = birth;
          }
          res.status(200).send({ data: results[0], checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  //[PATCH] /api/profile/update
  updateProfile(req, res) {
    const id = req.user.id;
    const FullName = req.body.FullName ? req.body.FullName : null;
    const Address = req.body.Address ? req.body.Address : null;
    const Phone = req.body.Phone ? req.body.Phone : null;
    const Gender = req.body.Gender ? req.body.Gender : null;
    let BirthDate = null;
    if (req.body.BirthDate !== "null") {
      let bd = req.body.BirthDate?.split("/"); // dd/mm/yyyy
      BirthDate = bd[2] + "-" + bd[1] + "-" + bd[0];
    }
    let data = [],
      updateSql = "";
    const Avt = req.file ? req.file.path : null;

    const fn = FullName.split(" "); // Duong Quoc ANh
    let FirstName = "";
    const LastName = fn[fn.length - 1];
    for (let i = 0; i < fn.length - 1; i++) {
      FirstName = FirstName + fn[i] + " ";
    }
    console.log(FullName, BirthDate, Gender, Phone, Address, id);
    if (Avt === null) {
      data = [FirstName, LastName, BirthDate, Gender, Phone, Address, id];
      updateSql =
        "update account set FirstName = ?, LastName = ?, BirthDate = ?, Gender = ?, Phone = ?, Address = ? where id = ?";
    } else {
      data = [FirstName, LastName, BirthDate, Gender, Phone, Address, Avt, id];
      updateSql =
        "update account set FirstName = ?, LastName = ?, BirthDate = ?, Gender = ?, Phone = ?, Address = ?, Avt = ? where id = ?";
    }
    const errorMsg = "Lỗi hệ thống, không thể cập nhật thông tin!";

    pool.query(updateSql, data, function (error, results, fields) {
      if (error) {
        console.log(error);
        res.send({ message: error, checked: false });
      } else {
        if (results) {
          res.status(200).send({ checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  //[GET] /api/appointment
  getAppointmentById(req, res) {
    let sql = "";
    const id = req.user.id;
    if (req.user.Authorization == 1) {
      sql =
        "select * from appointment a, appointmentstatus s where a.Status = s.id and idPatient = ? and a.Status !=4 order by DateBooking, TimeBooking";
    } else if (req.user.Authorization == 2) {
      sql =
        "select * from appointment a, appointmentstatus s where a.Status = s.id and idDoctor = ? and a.Status !=4 order by DateBooking, TimeBooking";
    }
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(sql, id, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results) {
          res.status(200).send({ AppointmentData: results, checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  //[POST] /api/appointment/create
  createAppointment(req, res) {
    const idPatient = req.user.id;
    const { idService, idDoctor, Price, Information, TimeBooking } = req.body;
    const db = req.body.DateBooking.split("/");
    const DateBooking = db[2] + "-" + db[1] + "-" + db[0];
    console.log(req.user);
    const insertSql =
      "insert into appointment (idService, idPatient, idDoctor, DateBooking, TimeBooking, Price, Information) values(?,?,?,?,?,?,?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 1) {
      res.end("Unauthorized");
    } else {
      pool.query(
        insertSql,
        [
          idService,
          idPatient,
          idDoctor,
          DateBooking,
          TimeBooking,
          Price,
          Information,
        ],
        function (error, results, fields) {
          if (error) {
            res.send({ message: error.sqlMessage, checked: false });
          } else {
            if (results) {
              res.status(200).send({ checked: true });
            } else {
              res.status(200).send({ message: errorMsg, checked: false });
            }
          }
        }
      );
    }
  }

  //[PATCH] /api/appointment/accept
  acceptAppointment(req, res) {
    const { id } = req.body;
    const updateSql =
      "update appointment set status = 1 where status = 4 and id = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 2) {
      res.end("Unauthorized");
    } else {
      pool.query(updateSql, id, function (error, results, fields) {
        if (error) {
          res.send({ message: error.sqlMessage, checked: false });
        } else {
          if (results) {
            res.status(200).send({ checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      });
    }
  }

  //[PATCH] /api/appointment/complete
  completeAppointment(req, res) {
    const { id } = req.body;
    const updateSql =
      "update appointment set status = 2 where status = 1 and id = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 2) {
      res.end("Unauthorized");
    } else {
      pool.query(updateSql, id, function (error, results, fields) {
        if (error) {
          res.send({ message: error.sqlMessage, checked: false });
        } else {
          if (results) {
            res.status(200).send({ checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      });
    }
  }

  //[PATCH] /api/appointment/cancel
  cancelAppointment(req, res) {
    const { id } = req.body;
    const updateSql = "update appointment set status = 3 where id = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(updateSql, id, function (error, results, fields) {
      if (error) {
        res.send({ message: error.sqlMessage, checked: false });
      } else {
        if (results) {
          res.status(200).send({ checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  //[GET] /api/notification
  getNotification(req, res) {
    const id = req.user.id;

    const selectSql =
      "select * from notification n left join (select count(idAccount) as Unread, idAccount from notification where idAccount = ? and Status = 0) as c on n.idAccount = c.idAccount order by NotiTime desc";

    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(selectSql, id, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results) {
          res.status(200).send({ data: results, checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  //[PATCH] /api/notification/read
  readNotification(req, res) {
    const { id } = req.body;

    const updateSql = "update notification set status = 1 where id = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(updateSql, id, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results) {
          res.status(200).send({ checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  //[GET] /api/schedule
  getSchedule(req, res, next) {
    const sql = "call AppointmentData(?, ?)";
    let { idDoctor, DateBooking } = req.body; //dd/mm/yyyy
    const sd = DateBooking.split("/");
    console.log(idDoctor);
    DateBooking = sd[2] + "-" + sd[1] + "-" + sd[0];
    let AppointmentData = {};
    let ScheduleData = {};

    const sql2 = "call ScheduleData(?,?)";
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

      connection.query(
        sql,
        [idDoctor, DateBooking],
        function (error, results, fields) {
          if (error) {
            res.send({ message: error, checked: false });
          }
          if (results[0]) AppointmentData = results[0];
        }
      );

      connection.query(
        sql2,
        [idDoctor, DateBooking],
        function (error, results, fields) {
          connection.destroy();
          if (error) {
            res.send({ message: error, checked: false });
          }
          if (results[0]) {
            ScheduleData = results[0];
            res.status(200).send({ AppointmentData, ScheduleData });
          }
        }
      );
    });
  }

  //[POST] /api/schedule
  setSchedule(req, res, next) {
    const id = req.user.id;
    let { SpecificDay } = req.body; // dd/mm/yyy

    const FirstShiftStart = req.body.FirstShiftStart
      ? req.body.FirstShiftStart
      : null;
    const FirstShiftEnd = req.body.FirstShiftEnd
      ? req.body.FirstShiftEnd
      : null;
    const SecondShiftStart = req.body.SecondShiftStart
      ? req.body.SecondShiftStart
      : null;
    const SecondShiftEnd = req.body.SecondShiftEnd
      ? req.body.SecondShiftEnd
      : null;
    const ThirdShiftStart = req.body.ThirdShiftStart
      ? req.body.ThirdShiftStart
      : null;
    const ThirdShiftEnd = req.body.ThirdShiftEnd
      ? req.body.ThirdShiftEnd
      : null;

    let sql =
      "update schedule set FirstShiftStart =?, FirstShiftEnd=?, SecondShiftStart=?, SecondShiftEnd=?, ThirdShiftStart=?, ThirdShiftEnd=? where idDoctor = ?";
    let data = [
      FirstShiftStart,
      FirstShiftEnd,
      SecondShiftStart,
      SecondShiftEnd,
      ThirdShiftStart,
      ThirdShiftEnd,
      id,
    ];
    if (SpecificDay) {
      const sd = SpecificDay.split("/");
      SpecificDay = sd[2] + "-" + sd[1] + "-" + sd[0];
      sql =
        "insert into schedule (idDoctor, FirstShiftStart, FirstShiftEnd, SecondShiftStart, SecondShiftEnd, ThirdShiftStart, ThirdShiftEnd, SpecificDay) values(?,?,?,?,?,?,?,?)";
      data = [
        id,
        FirstShiftStart,
        FirstShiftEnd,
        SecondShiftStart,
        SecondShiftEnd,
        ThirdShiftStart,
        ThirdShiftEnd,
        SpecificDay,
      ];
    }
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 2) {
      res.end("Unauthorized");
    } else {
      pool.query(sql, data, function (error, results, fields) {
        if (error) {
          res.send({ message: error.sqlMessage, checked: false });
        } else {
          if (results) {
            res.status(200).send({ checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      });
    }
  }

  // [GET] /api/service
  getService(req, res) {
    const selectSql = "SELECT * FROM service";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(selectSql, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results) {
          res.status(200).send({ data: results, checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  // [POST] /api/service/doctor
  serviceDoctor(req, res) {
    const id = req.user.id;
    const { idService, EstimatedTime } = req.body;
    const insertSql =
      "insert into servicedoctor (idService, idDoctor, EstimatedTime) values (?,?,?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 2) {
      res.end("Unauthorized");
    } else {
      pool.query(
        insertSql,
        [idService, id, EstimatedTime],
        function (error, results, fields) {
          if (error) {
            res.send({ message: error, checked: false });
          } else {
            if (results) {
              res.status(200).send({ checked: true });
            } else {
              res.status(200).send({ message: errorMsg, checked: false });
            }
          }
        }
      );
    }
  }

  // [GET] /api/service
  getServiceDoctor(req, res) {
    console.log("heree");
    const { idDoctor } = req.body;
    const selectSql =
      "SELECT s.id, s.Service, sd.EstimatedTime, sd.Price FROM servicedoctor sd, service s where s.id = sd.idService and idDoctor = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(selectSql, idDoctor, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results) {
          res.status(200).send({ data: results, checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  //[POST] /api/notification/create
  createNotification(req, res, next) {
    const { noti } = req.body;
    const id = req.user.id;
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    const insertSql =
      "insert into notification (idAccount, Notification, NotiTime) values (?,?,now())";

    pool.query(insertSql, [id, noti], function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results) {
          res.status(200).send({ data: results, checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  //[POST] /api/post/create
  createPost(req, res) {
    let FeaturedImage = req.files ? req.files.FeaturedImage[0].path : "null";
    let Images = "";
    if (req.files.Gallery) {
      for (let i = 0; i < req.files.Gallery.length; i++) {
        Images += req.files.Gallery[i].path;
        if (i != req.files.Gallery.length - 1) {
          Images += ";";
        }
      }
    }
    let Status = 0;
    const idAuthor = req.user.id;
    const { Title, Brief, Content, idCategories } = req.body;
    const insertSql =
      "insert into post (FeaturedImage, Title, Brief, Content, Images, idAuthor, DatePost, idCategories, Status) values (?,?,?,?,?,?, NOW(),?,?)";

    if (req.user.Authorization == 0) {
      Status = 1;
    } else if (req.user.Authorization == 2) {
      Status = 0;
    }

    if (req.user.Authorization == 1) {
      res.end("Unauthorized");
    } else {
      pool.query(
        insertSql,
        [
          FeaturedImage,
          Title,
          Brief,
          Content,
          Images,
          idAuthor,
          idCategories,
          Status,
        ],
        function (error, results, fields) {
          if (error) {
            res.send({ message: error, checked: false });
          } else {
            if (results) {
              res.status(200).send({ checked: true, id: results.insertId });
            } else {
              res.status(200).send({ message: errorMsg, checked: false });
            }
          }
        }
      );
    }
  }

  //[POST] /api/post/image
  addImage(req, res) {
    let url = req.file ? req.file.path : "null";
    res.status(200).send({ data: url });
  }

  //[PATCH] /api/post/update
  updatePost(req, res) {
    if ((req.user.Authorization = 1)) {
      res.send({
        message: "Bệnh nhân không thể chỉnh sửa bài",
        checked: false,
      });
    }
    let FeaturedImage = req.files ? req.files.FeaturedImage[0].path : "null";
    let Images = "";
    if (req.files.Gallery) {
      for (let i = 0; i < req.files.Gallery.length; i++) {
        Images += req.files.Gallery[i].path;
        if (i != req.files.Gallery.length - 1) {
          Images += ";";
        }
      }
    }
    const { Title, Brief, Content, idCategories, id } = req.body;
    const updateSql =
      "update post set FeaturedImage = ?, Title = ?, Brief = ?, Content = ?, Images = ?, idCategories = ? where id = ?";
    const errorMsg = "Cập nhật bài viết không thành công!";

    pool.query(
      updateSql,
      [FeaturedImage, Title, Brief, Content, Images, idCategories, id],
      function (error, results, fields) {
        if (error) {
          res.send({ message: error, checked: false });
        } else {
          if (results) {
            res.status(200).send({ checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      }
    );
  }

  // [GET] /api/post
  getPost(req, res) {
    const selectSql = "select * from AvailablePost";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(selectSql, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results) {
          res.status(200).send({ data: results, checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  // [GET] /api/post/detail/:id
  getPostById(req, res) {
    const id = req.params.id;
    const selectSql = "call PostDetailById(?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(selectSql, id, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results[0]) {
          res.status(200).send({ data: results[0], checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  // [GET] /api/post/Categories
  getPostByCategories(req, res) {
    const id = req.body.id;
    const selectSql = "call PostByCategories(?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(selectSql, id, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results[0]) {
          res.status(200).send({ data: results[0], checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  // [GET] /api/post/search/keywords
  searchByKeywords(req, res, next) {
    let { keywords } = req.body;
    keywords = "%" + keywords + "%";
    const selectSql = "call ListSearch(?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(selectSql, keywords, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results[0]) {
          res.status(200).send({ data: results[0], checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  // [GET] /api/category
  getCategory(req, res) {
    const selectSql = "SELECT c.id, c.Categories, s.id as idsimilar, s.Similar FROM categories c LEFT JOIN similarCategories s on c.id = s.idCategories ORDER BY c.id, idsimilar";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(selectSql, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results) {

          for(let i = 0; i < results.length; i ++){  
            if( i != 0 && results[i].id == results[i - 1].id){   //results.Similar = [suy gan, sỏi thận]
              if(!Array.isArray(results[i - 1].Similar) ){
                results[i - 1].Similar = [{id: results[i - 1].idsimilar, SimilarCategories :results[i - 1].Similar}];
              }
              results[i].Similar = [...results[i - 1].Similar, {id: results[i].idsimilar, SimilarCategories : results[i].Similar}];  
              results.splice(i - 1, 1);
              i -= 1;
              console.log(i, results[i].Similar);
            }
            if(i == results.length - 1){
              res.status(200).send({ data: results, checked: true });
            }
          }
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  // [GET] /api/comment
  getComment(req, res) {
    const { idPost } = req.body;
    const selectSql = "SELECT * FROM comment where idPost = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(selectSql, idPost, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results) {
          res.status(200).send({ data: results, checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  // [POST] /api/comment/create
  createComment(req, res) {
    const idAccount = req.user.id;
    const { idPost, Cmt } = req.body;
    const insertSql =
      "insert into comment (idAccount, idPost, Cmt, NotiTime) values (?,?,?,?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    const date = new Date();
    const NotiTime =
      date.getFullYear() +
      "-" +
      date.getMonth() +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    pool.query(
      insertSql,
      [idAccount, idPost, Cmt, NotiTime],
      function (error, results, fields) {
        if (error) {
          res.send({ message: error, checked: false });
        } else {
          if (results) {
            res.status(200).send({ checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      }
    );
  }

  // [POST] /api/comment/update
  updateComment(req, res) {
    const { id, Cmt } = req.body;
    const updateSql =
      "update comment set Cmt = ?, NotiTime = ?, Status = 1 where id = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    const date = new Date();
    const NotiTime =
      date.getFullYear() +
      "-" +
      date.getMonth() +
      "-" +
      date.getDate() +
      " " +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds();

    pool.query(
      updateSql,
      [Cmt, NotiTime, id],
      function (error, results, fields) {
        if (error) {
          res.send({ message: error, checked: false });
        } else {
          if (results) {
            res.status(200).send({ checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      }
    );
  }

  // [POST] /api/comment/delete
  deleteComment(req, res) {
    const { id } = req.body;
    const deleteSql = "delete from comment where id = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(deleteSql, id, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results) {
          res.status(200).send({ checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  // ADMIN API

  //[GET] /api/admin/post
  getAllPost(req, res) {
    const selectSql = "select * from AllPost";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.query(selectSql, function (error, results, fields) {
        if (error) {
          res.send({ message: error, checked: false });
        } else {
          if (results) {
            res.status(200).send({ data: results, checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      });
    }
  }

  //[PATCH] /api/admin/post/accept
  acceptPost(req, res) {
    const { id } = req.body;
    const updateSql = "update post set Status = 1 where id = ? ";
    const errorMsg = "Có lỗi bất thường, không thể chấp nhận bài viết!";

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.query(updateSql, id, function (error, results, fields) {
        if (error) {
          res.send({ message: error, checked: false });
        } else {
          if (results) {
            res.status(200).send({ checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      });
    }
  }

  //[PATCH] /api/admin/post/status/change
  changeStatusPost(req, res) {
    const { id } = req.body;
    const callSql = "call UpdateStatusPost(?)";
    const errorMsg = "Cập nhật trạng thái bài viết không thành công!";

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.query(callSql, id, function (error, results, fields) {
        if (error) {
          res.send({ message: error, checked: false });
        } else {
          if (results) {
            res.status(200).send({ checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      });
    }
  }

  //[GET] /api/admin/account
  getAccount(req, res) {
    const selectSql = "select * from AllAccount";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.query(selectSql, function (error, results, fields) {
        if (error) {
          res.send({ message: error, checked: false });
        } else {
          if (results) {
            res.status(200).send({ checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      });
    }
  }

  //[POST] /api/admin/account/create
  createAccount(req, res) {
    const {
      FirstName,
      LastName,
      BirthDate,
      Gender,
      Address,
      Email,
      Phone,
      Authorization,
    } = req.body;
    const insertSql =
      "insert into account (FirstName, LastName, BirthDate, Gender, Address, Email, Phone, Authorization) values(?,?,?,?,?,?,?,?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.query(
        insertSql,
        [
          FirstName,
          LastName,
          BirthDate,
          Gender,
          Address,
          Email,
          Phone,
          Authorization,
        ],
        function (error, results, fields) {
          if (error) {
            res.send({ message: error.sqlMessage, checked: false });
          } else {
            if (results) {
              res.status(200).send({ checked: true });
            } else {
              res.status(200).send({ message: errorMsg, checked: false });
            }
          }
        }
      );
    }
  }

  //[PATCH] /api/admin/account/update
  updateAccount(req, res) {
    const {
      FirstName,
      LastName,
      BirthDate,
      Gender,
      Address,
      Email,
      Phone,
      id,
    } = req.body;
    const updateSql =
      "update account set FirstName = ?, LastName = ?, BirthDate = ?, Gender = ?, Address = ?, Email = ?, Phone = ? where id = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.query(
        updateSql,
        [FirstName, LastName, BirthDate, Gender, Address, Email, Phone, id],
        function (error, results, fields) {
          if (error) {
            res.send({ message: error, checked: false });
          } else {
            if (results) {
              res.status(200).send({ data: results, checked: true });
            } else {
              res.status(200).send({ message: errorMsg, checked: false });
            }
          }
        }
      );
    }
  }

  //[DELETE] /api/admin/account/delete
  deleteAccount(req, res) {
    const { id } = req.body;
    const insertSql = "delete from account where id = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.query(insertSql, id, function (error, results, fields) {
        if (error) {
          res.send({ message: error.sqlMessage, checked: false });
        } else {
          if (results) {
            res.status(200).send({ checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      });
    }
  }

  //[GET] /api/admin/appointment
  getAppointment(req, res) {
    const selectSql = "select * from AllAppointment";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.query(selectSql, function (error, results, fields) {
        if (error) {
          res.send({ message: error, checked: false });
        } else {
          if (results) {
            res.status(200).send({ data: results, checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      });
    }
  }
}

module.exports = new API();
