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
const emailBody = require("../../util/sendmail");
const { forEach } = require("../configs/muter");

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
      "insert into account (Email, PassWord, LastName, FirstName, CreatedAt) values (?,?,?,?,now())";
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
    if (auth) {
      res.status(200).send({ authentication: auth });
    } else {
      return next(createError(401));
    }
  }

  // [POST] /api/login
  login(req, res, next) {
    const selectSql =
      "select id, Email, FirstName, LastName, PassWord, Authorization from account where Email = ? ";
    const notiSql = "call getNotification(?)";
    const message = "Số điện thoại hoặc mật khẩu không chính xác!";
    const Email = req.body.Email;
    const PassWord = req.body.PassWord;

    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      connection.query(selectSql, Email, function (error, results, fields) {
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

                connection.query(notiSql, results[0].id, function (e, rs, fields) {
                  connection.destroy();
                  if (e) {
                    res.send({ message: e });
                  } 
                  if(rs[0].length > 0) {
                    const Unread = rs[0][0].Unread;
                    rs[0].forEach(noti => delete noti["Unread"])
                    res.send({
                      checked: true,
                      token,
                      id: results[0].id,
                      FullName: results[0].FirstName + " " + results[0].LastName,
                      authentication: results[0].Authorization,
                      notification: rs[0],
                      Unread,
                    });
                  } else {
                    res.send({ 
                      checked: true,
                      token,
                      id: results[0].id,
                      FullName: results[0].FirstName + " " + results[0].LastName,
                      authentication: results[0].Authorization,
                      notification: [],
                      Unread: 0,
                    });
                  }
                })
              } else {
                res.status(200).send({ message, checked: false });
              }
            });
          } else {
            res.status(200).send({ message, checked: false });
          }
        }
      });
    });
  }

  // [POST] /api/auth/google/check
  async Google(req, res) {
    const { email, name, googlePhotoUrl } = req.body;
    const sql ="select id, Authorization, FirstName, LastName, Avt from account where Email = ? ";
    const notiSql = "call getNotification(?)";
    const fn = name.split(" "); // x n n 
    let lastName = fn[fn.length - 1];
    let firstName = "";
    for (let i = 0; i < fn.length - 1; i++) {
      firstName += fn[i];
      if(i !== fn.length - 2) {
        firstName += " ";
      }
    }

    let payload = {};
    let token = "";
    const insertSql =
      "insert into account (Email, FirstName, LastName, Avt, PassWord, CreatedAt) values (?, ?, ?, ?, ?, now())";
    const password = "Default Password";
    
    try {
      pool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!
        connection.query(sql, email, function (error, results, fields) {
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
              connection.query(notiSql, results[0].id, function (e, rs, fields) {
                connection.destroy();
                if (e) {
                  res.send({ message: e });
                } 
                if(rs[0].length > 0) { 
                  const Unread = rs[0][0].Unread;
                  rs[0].forEach(noti => delete noti["Unread"])
                  res.send({
                    checked: true,
                    token,
                    id: results[0].id,
                    FullName: results[0].FirstName + " " + results[0].LastName,
                    authentication: results[0].Authorization,
                    Avt: results[0].Avt,
                    notification: rs[0],
                    Unread,
                  });
                } else {
                  res.send({ 
                    checked: true,
                    token,
                    id: results[0].id,
                    FullName: results[0].FirstName + " " + results[0].LastName,
                    authentication: results[0].Authorization,
                    Avt: results[0].Avt,
                    notification: [],
                    Unread: 0,
                  });
                }
              })
            } else { 
              connection.query(
                insertSql,
                [email, firstName, lastName, googlePhotoUrl, password],
                async function (e, rs, fields) {
                  connection.destroy();
                  if (e) res.send({ message: e });
                  else if (rs) { 
                    payload = {
                      iss: "Doccoming",
                      id: rs.insertId,
                      Avt: googlePhotoUrl,
                      FullName: firstName + " " + lastName,
                      Authorization: "1",
                    };
                    let linkFP = process.env.CLIENT_URL + `/reset/${encodeToken(payload)}`;
                    const myAccessTokenObject = await myOAuth2Client.getAccessToken();
                    const myAccessToken = myAccessTokenObject?.token;
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
                      subject: "Thiết lập mật khẩu mới cho tài khoản DocComming!", // Tiêu đề email
                      html: emailBody(linkFP), // Nội dung email
                    };
                    await transport.sendMail(mailOptions); // gửi email

                    res.send({
                      checked: true,
                      token: "Bearer " + encodeToken(payload),
                      id: rs.insertId,
                      FullName: name,
                      authentication: "1",
                      Avt: googlePhotoUrl,
                    });
                  }
                }
              );
            }
          }
        });
      })
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
      const { Email } = req.body;
      if (!Email)
        throw new Error("Email không hợp lệ!");
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
      const selectSql = "select id, Avt, FirstName, LastName, Authorization from account where Email = ? ";
      let linkFP = "";
      pool.query(selectSql, Email, async function (error, results, fields) {
        if (error) {
          res.send({ message: "Có lỗi phát sinh!", checked: false });
        } else { 
          if (results.length > 0) {
            const payload = {
              iss: "Doccoming",
              id: results[0].id,
              Avt: results[0].Avt,
              FullName: results[0].FirstName + " " + results[0].LastName,
              Authorization: results[0].Authorization,
            };
            linkFP = process.env.CLIENT_URL + "/reset/" + encodeToken(payload);
            // mailOption là những thông tin gửi từ phía client lên thông qua API
            const mailOptions = {
              to: Email,
              subject: "Thiết lập mật khẩu mới cho tài khoản DocComming!", // Tiêu đề email
              html: emailBody(linkFP), // Nội dung email
            };
            await transport.sendMail(mailOptions); // gửi email
            // Không có lỗi gì thì trả về success
            res.status(200).json({ message: "Đã gửi mail về hộp thư. Vui lòng kiểm tra!", checked: true});
          } else {
            res.status(200).send({ message: "Email chưa được đăng ký tài khoản Doccoming!", checked: false });
          }
        }
      });
    } catch (error) {
      // Có lỗi thì các bạn log ở đây cũng như gửi message lỗi về phía client

      res.status(500).json({ errors: error });
    }
  }

  //[POST] /api/reset/password
  resetPassword(req, res, next) {
    const {NewPassWord} = req.body;
    const id = req.user.id;
    const updateSql = "update account set PassWord = ? where id = ? ";
    
    bcrypt.hash(NewPassWord, saltRound, (err, hash) => {
      if (err) {
        res.status(200).send({ message: err, checked: false });
      } else {
        pool.query(updateSql, [hash, id], async function (error, results, fields) {
          if (error) {
            res.send({ message: "Có lỗi phát sinh!", checked: false });
          } else { 
            if (results) {
              res.send({ checked: true});
            } else {
              res.status(200).send({ message: "Có lỗi phát sinh!", checked: false });
            }
          }
        });
      }
    })
  }

  //[POST] /api/change/password
  changePassword(req, res, next) {
    const { OldPassWord, NewPassWord} = req.body; 
    const id = req.user.id;
    const updateSql = "update account set PassWord = ? where id = ? ";
    const selectSql = "select PassWord from account where id = ? ";
    
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      connection.query(selectSql, id, function (error, results, fields) {
        if (error) {
            res.send({ message: "Kết nối DataBase thất bại" });
        }
        if (results.length > 0) { 
          bcrypt.compare(OldPassWord, results[0].PassWord, (e, response) => {
            if (response) {
              bcrypt.hash(NewPassWord, saltRound, (err, hash) => {
                connection.query(updateSql, [hash, id], function (err, results, fields) {
                  connection.destroy();
                  if (err) {
                    res.status(200).send({ message: err.sqlMessage });
                  } else {

                    res.status(200).send({ message: "Đổi mật khẩu thành công!" });
                  }
                })
              });
            } else {
                res.status(200).send({ message: "Mật khẩu cũ không chính xác!" });
            }
          });
        } else {
            res.status(200).send({ message: "Đổi mật khẩu thất bại!" });
        }
      });
    });
  }

  // Profile
  //[GET] /api/profile
  getProfile(req, res) {
    const id = req.user.id; 
    let selectSql = "";
    const errorMsg = "Lỗi hệ thống, không thể lấy thông tin!";

    if(req.user.Authorization == 2){
      selectSql = "call detailDoctor(?)";
    } else{
      selectSql = "call getProfile(?)";
    }
    pool.query(selectSql, id, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results[0].length > 0) {
          if (results[0][0]?.BirthDate) {
            const bd = results[0][0].BirthDate.split("-"); //yyyy-mm-dd
            const birth = bd[2] + "/" + bd[1] + "/" + bd[0];
            results[0][0].BirthDate = birth;
          } 
          res.status(200).send({ data: results[0][0], checked: true });
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
    const Degree = req.body.Degree ? req.body.Degree : null;
    const Introduce = req.body.Introduce ? req.body.Introduce : null;
    const idMajor = req.body.idMajor ? req.body.idMajor : null;
    const Experience = req.body.Experience ? req.body.Experience : null;
    const Training = req.body.Training ? req.body.Training : null;
    
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
      FirstName += fn[i];
      if(i !== fn.length - 2) {
        FirstName += " ";
      }
    }
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
    const updateInforDoctorSql = "update infordoctor set Degree = ?, Introduce =?, idMajor = ?, Experience = ?,Training = ? where idAccount = ?"

    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!

      connection.query(updateSql, data, function (error, results, fields) {
        if (error) {
          res.send({ message: errorMsg, checked: false });
        }
        if (results) {
          if(req.user.Authorization == 2){
            connection.query(
              updateInforDoctorSql,
              [Degree, Introduce, idMajor, Experience, Training, id],
              function (error, results, fields) {
                connection.destroy();
                if (error) {
                  res.send({ message: error, checked: false });
                }
                if (results) {
                  res.status(200).send({ checked:true });
                }
              }
            );
          } else {
            res.status(200).send({ checked:true });
          }
        }
      });

      
    });
  }

  //[GET] /api/appointment
  getAppointmentById(req, res) {
    let sql = ""; 
    if (req.user.Authorization == 1) {
      sql = "call getAppointmentPatient(?)";
    } else if (req.user.Authorization == 2) {
      sql ="call getAppointmentDoctor(?)";
    }
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(sql, req.user.id, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results[0]) {
          results[0].forEach((apptn) => {
            let db = apptn.DateBooking.split('-');
            apptn.DateBooking = db[2] + "/" + db[1] + "/" + db[0];
            if(apptn.ReExaminationDate){
              let re = apptn.ReExaminationDate.split(' ')[0]?.split('-')
              apptn.ReExaminationDate = re[2] + "/" + re[1] + "/" + re[0] + " " + apptn.ReExaminationDate?.split(' ')[1];
            }
   
          })
          res.status(200).send({ AppointmentData: results[0], checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  //[POST] /api/appointment/create
  createAppointment(req, res) {
    const idPatient = req.user.id;
    const { idService, idDoctor, Price, Information } = req.body;
    const TimeBooking = req.body.TimeBooking? req.body.TimeBooking : null;
    const db = req.body.DateBooking.split("/");
    const DateBooking = db[2] + "-" + db[1] + "-" + db[0];
    const insertSql =
      "insert into appointment (idService, idPatient, idDoctor, DateBooking, TimeBooking, Price, Information) values(?,?,?,?,?,?,?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    const data = [idService, idPatient, idDoctor, DateBooking, TimeBooking, Price, Information]

    if (req.user.Authorization != 1) {
      res.end("Unauthorized");
    } else {
      pool.query(insertSql, data, function (error, results, fields) {
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

  //[POST] /api/appointment/cancel
  cancelAppointment(req, res) {
    const { id, idAccount} = req.body;
    const updateSql = "update appointment set status = 3 where id = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    const insertNotiSql = "insert into notification (idAccount, Notification, Type) values (?,?,?)";
    const Notification = "Cuộc hẹn của bạn đã bị hủy!";
    let Type = "";
    if(req.user.Authorization == 1) {
      Type = "/doctor/appointment";
    } else Type = "/patient/appointment";
    
    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      connection.query(updateSql, id, function (error, results, fields) {
        if (error) {
          res.send({ message: error.sqlMessage, checked: false });
        } else {
          if (results) {
            connection.query(insertNotiSql, [idAccount, Notification, Type], function (err, rs, fields) {
              if (err) {
                res.send({ message: err, checked: false });
              } else if(rs) {
                res.status(200).send({ checked: true });
              }
            });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      });
    });
  }

  //[POST] /api/appointment/note
  noteAppointment(req, res) {
    let { idAppointment} = req.body;
    let Advice = req.body.Advice? req.body.Advice: null;
    let Price = req.body.Price? req.body.Price: null;
    let ReExaminationDate;
   
    if(req.body.ReExaminationDate){
      const red = req.body.ReExaminationDate.split("/");
      const ReETime = req.body.ReExaminationTime;
      ReExaminationDate = red[2] + "-" + red[1] + "-" + red[0] + " " + ReETime;
    } else {
      ReExaminationDate = null;
    };
    
    const insertSql = "insert into appointmentnote (idAppointment, Advice, ReExaminationDate, Price) values (?,?,?,?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if(req.user.Authorization !== 2) {
      res.status(200).send({ message: "Chỉ bác sĩ mới được thêm ghi chú cuộc hẹn!", checked: false });
    } else {
      pool.query(insertSql, [idAppointment, Advice, ReExaminationDate, Price], function (error, results, fields) {
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

  //[POST] /api/appointment/note/update
  updateNoteAppointment(req, res) {
    const { idAppointment } = req.body;
    let Advice = req.body.Advice? req.body.Advice: null;
    let Price = req.body.Price? req.body.Price: null;
    let ReExaminationDate;

    let updateSql = "";
    let data = "";
    if(req.body.ReExaminationDate){
      const red = req.body.ReExaminationDate.split("/");
      const ReETime = req.body.ReExaminationTime;
      ReExaminationDate = red[2] + "-" + red[1] + "-" + red[0] + " " + ReETime;
      updateSql = "update appointmentnote set ReExaminationDate = ?, Price = ? where idAppointment = ?";
      data = [ReExaminationDate, Price, idAppointment]
    } else {
      updateSql = "update appointmentnote set Advice = ? where idAppointment = ?";
      data = [Advice, idAppointment]
    };
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if(req.user.Authorization !== 2) {
      res.status(200).send({ message: "Chỉ bác sĩ mới được thêm ghi chú cuộc hẹn!", checked: false });
    } else {
      pool.query(updateSql, data, function (error, results, fields) {
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

  //[POST] /api/appointment/note/accept
  acceptNoteAppointment(req, res) {
    const { idAppointment } = req.body;
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    const updateSql = "update appointmentnote set Status = 1 where idAppointment = ? and Status = 0"
    if(req.user.Authorization !== 1) {
      res.status(200).send({ message: "Chỉ bệnh nhân mới được thêm ghi chú cuộc hẹn!", checked: false });
    } else {
      pool.query(updateSql, idAppointment, function (error, results, fields) {
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

  //[POST] /api/appointment/note/cancel
  cancelNoteAppointment(req, res) {
    const { idAppointment } = req.body;
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    const updateSql = "update appointmentnote set Status = 2 where idAppointment = ?"
    if(req.user.Authorization !== 1) {
      res.status(200).send({ message: "Chỉ bệnh nhân mới được thêm ghi chú cuộc hẹn!", checked: false });
    } else {
      pool.query(updateSql, idAppointment, function (error, results, fields) {
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

  //[GET] /api/schedule
  getSchedule(req, res, next) {
    const sql = "call AppointmentData(?, ?)";
    let { idDoctor, date, month, year } = req.params; //dd/mm/yyyy
    const DateBooking = year + "-" + month + "-" + date;
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

  // [POST] /api/medical/record
  medicalRecord(req, res) {
    if (req.user.Authorization != 2) {
      res.end("Unauthorized");
    }
    
    const { idAppointment, Record, Note } = req.body;
    let Idate = req.body.IllnessDate.split("/"); // dd/mm/yyyy
    const IllnessDate = Idate[2] + "-" + Idate[1] + "-" + Idate[0];
    
    const insertSql = "insert into medicalrecord (idAppointment, Record, IllnessDate, Note) values (?,?,?,?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(insertSql, [idAppointment, Record, IllnessDate, Note], function (error, results, fields) {
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
  
  // [GET] /api/medical/record
  getMedicalRecord(req, res) {
    const id = req.user.id;
    let selectSql = "";
    if(req.user.Authorization == 1){
      selectSql = "call getMedicalRecordPatient(?)";
    } else {
      selectSql = "call getMedicalRecordDoctor(?)";
    }
   
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(selectSql, id, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results[0].length>0) {
          results[0].forEach((record) => {
            let Idate = record.IllnessDate.split('-');
            record.IllnessDate = Idate[2] + "/" + Idate[1] + "/" + Idate[0];
          })
          res.status(200).send({ data: results[0], checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  // [POST] /api/medical/record/update
  updateMedicalRecord(req, res) {
    const { idRecord, Record, Note } = req.body; 
    let Idate = req.body.IllnessDate.split("/"); // dd/mm/yyyy
    const IllnessDate = Idate[2] + "-" + Idate[1] + "-" + Idate[0];
    
    const updateSql = "update medicalrecord set Record = ?, IllnessDate = ?, Note = ? where id = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(updateSql, [Record, IllnessDate, Note, idRecord], function (error, results, fields) {
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

  // [GET] /api/doctor
  getDoctor(req, res) {
    const selectSql ="select * from AllDoctor";
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

  // [GET] /api/doctor/service
  getServiceDoctor(req, res) {
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


  // [GET] /api/doctor/:id
  getDetailDoctor(req, res) {
    const id = req.params.id;
    const selectSql ="call detailDoctor(?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(selectSql, id, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results[0]) { 
          const delCol = ["Phone", "Address", "BirthDate"];
          delCol.forEach(col => delete results[0][0][col]);
          res.status(200).send({ data: results[0], checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  // [GET] /api/doctor/schedule
  getDoctorSchedule(req, res) {
    const id = req.user.id;
    let { date, month, year } = req.params; //dd/mm/yyyy
    const Date = year + "-" + month + "-" + date;
    const selectSql = "call ScheduleData(?,?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    pool.query(selectSql, [id, Date], function (error, results, fields) {
      if (error) {
        res.send({ message: errorMsg, checked: false });
      }
      if (results[0]) {
        res.status(200).send({ ScheduleData: results[0] });
      }
    });
  }

  // [POST] /api/doctor/service/create
  createServiceDoctor(req, res) {
    const id = req.user.id;
    const { data } = req.body; // data [{idService, EstimatedTime, Price},{},{}]
    const Sql = "call CHECK_SERVICE(?,?,?,?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 2) {
      res.end("Unauthorized");
    } else {
      for (let i = 0; i < data.length; i++) {
        pool.query(
          Sql,
          [data[i].idService, id, data[i].EstimatedTime, data[i].Price],
          function (error, results, fields) {
            if (error) {
              res.send({ message: error, checked: false, i });
            }
          }
        );
        if (i == data.length - 1) {
          res.status(200).send({ checked: true });
        }
      }
    }
  }

  // [POST] /api/doctor/service/delete
  deleteServiceDoctor(req, res) {
    const id = req.user.id;
    const { idService } = req.body; // idService [1,2,3,4,...]
    const deleteSql =
      "delete from servicedoctor where idService = ? and idDoctor = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    

    if (req.user.Authorization != 2) {
      res.end("Unauthorized");
    } else {
      for (let i = 0; i < idService.length; i++) {
        pool.query(
          deleteSql,
          [idService[i], id],
          function (error, results, fields) {
            if (error) {
              res.send({ message: error, checked: false, i });
            }
            
          }
        );
        if (i == idService.length - 1) {
          res.send({ checked: true });
        }
      }
    }
  }

  // [GET] /api/doctor/service/avg
  avgPriceService(req, res) {
    const selectSql =
      "select * from getAvgPriceService";
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
  
  // [GET] /api/doctor/post/get
  getDoctorPost(req, res) {
    const idDoctor  = req.user.id;
    const selectSql =
      "SELECT p.id, p.FeaturedImage, p.Title, p.Brief, p.Content, p.DatePost, c.Categories, s.Similar, p.Status FROM post p, categories c, similarcategories s WHERE p.idCategories = c.id and p.idSimilar = s.id and p.idAuthor = ?";
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

  //[GET] /api/notification
  getNotification(req, res) {
    const id = req.user.id;

    const selectSql =
      "call getNotification(?)";

    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(selectSql, id, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results[0].length > 0) {
          const Unread = results[0][0].Unread;
          results[0].forEach(noti => delete noti["Unread"]);
          res.status(200).send({ notification: results[0], Unread, checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  //[POST] /api/notification/create
  createNotification(req, res, next) {
    const {idAccount, noti, Type } = req.body;
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    const insertSql =
      "insert into notification (idAccount, Notification, Type) values (?,?,?)";

    pool.query(insertSql, [idAccount, noti, Type], function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results) {
          res.status(200).send({checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  //[POST] /api/notification/read
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

  // [GET] /api/rating/:idDoctor
  getRateDoctor(req, res) {
    const { idDoctor } = req.params; 
    const selectSql ="call RateDoctor(?)";
    
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    let data = [
      {
        Star: 1,
        Rate: []
      },
      {
        Star: 2,
        Rate: []
      },
      {
        Star: 3,
        Rate: []
      },
      {
        Star: 4,
        Rate: []
      },
      {
        Star: 5,
        Rate: []
      }
    ];

    pool.query(selectSql, idDoctor, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results[0]) {
          
          results[0].forEach(rs => {
            let index = parseInt(rs.Star - 1);
            data[index].Rate = [
              ...data[index].Rate, 
              {
                idPatient: rs.idPatient, 
                FullName: rs.FullName,
                Gender: rs.Gender, 
                Avt: rs.Avt, 
                Comment: rs.Comment
              }
            ]
          })
          res.status(200).send({ data, checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  // [POST] /api/rating
  createRateDoctor(req, res) {
    const { idAppointment, Star, Comment } = req.body;
    const insertSql ="insert into ratedoctor (idAppointment, Star, Comment) values (?, ?, ?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(insertSql, [idAppointment, Star, Comment], function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false }); console.log(error)
      } else {
        if (results) {
          res.status(200).send({ checked: true });    
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  // [POST] /api/rating/update
  updateRateDoctor(req, res) {
    const { idAppointment, Star, Comment} = req.body;
    const updateSql ="Update ratedoctor set Star = ?, Comment = ? where idAppointment = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(updateSql, [Star, Comment, idAppointment], function (error, results, fields) {
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
    const idAuthor = req.user.id;
    const { Title, Brief, Content, idCategories, idSimilar, idClassify } = req.body;
    const idMajor = req.body.idMajor? req.body.idMajor: null;
    let insertSql = "";
    
    if (req.user.Authorization == 0) {
      insertSql = "insert into post (FeaturedImage, Title, Brief, Content, idAuthor, DatePost, idCategories, idSimilar, idMajor, Status, idClassify) values (?,?,?,?,?,NOW(),?,?,?,1,?)";
    } else if (req.user.Authorization == 2) {
      insertSql = "insert into post (FeaturedImage, Title, Brief, Content, idAuthor, DatePost, idCategories, idSimilar, idMajor, Status, idClassify) values (?,?,?,?,?,NOW(),?,?,?,0,?)";
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
          idAuthor,
          idCategories,
          idSimilar,
          idMajor,
          idClassify,
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

  //[POST] /api/post/update
  updatePost(req, res) {
    console.log(req.body)
    if ((req.user.Authorization == 1)) {
      res.send({
        message: "Bệnh nhân không thể chỉnh sửa bài",
        checked: false,
      });
    }
    const { Title, Brief, Content, idCategories, idSimilar, id, idClassify } = req.body;
    let idMajor;
    if(req.body.idMajor != "null"){
      idMajor = req.body.idMajor
    } else {
      idMajor = null;
    }
    const errorMsg = "Cập nhật bài viết không thành công!";
    let FeaturedImage = "";
    let updateSql = "";
    let data = [];

    if(req.files === null){
      FeaturedImage = req.files.FeaturedImage[0]?.path; 
      updateSql = "update post set FeaturedImage = ?, Title = ?, Brief = ?, Content = ?, idCategories = ?, idSimilar = ?, idMajor = ?, idClassify = ? where id = ?"
      data = [FeaturedImage, Title, Brief, Content, idCategories, idSimilar, idMajor, idClassify, id]
    } else {
      updateSql =
      "update post set Title = ?, Brief = ?, Content = ?, idCategories = ?, idSimilar = ?, idMajor = ?, idClassify = ? where id = ?";
      data= [Title, Brief, Content, idCategories, idSimilar, idMajor, idClassify, id]
    }
    let Images = "";
    if (req.files.Gallery) {
      for (let i = 0; i < req.files.Gallery.length; i++) {
        Images += req.files.Gallery[i].path;
        if (i != req.files.Gallery.length - 1) {
          Images += ";";
        }
      }
    }
    
    pool.query(updateSql, data, function (error, results, fields) {
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
    const SimilarDoctorSql = "call SimilarDoctorById(?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.getConnection(function (err, connection) {
      if (err) throw err; // not connected!
      connection.query(selectSql, id, function (error, results, fields) {
        if (error) {
          res.send({ message: error, checked: false });
        } else {
          if (results[0]) {
            connection.query(SimilarDoctorSql, id, function (e, rs, fields) {
              connection.destroy();
              if (e) {
                res.send({ message: e, checked: false });
              }
              if (rs[0]) { 
                res.status(200).send({ data: results[0], SimilarDoctor: rs[0], checked: true });
              } else {
                res.status(200).send({message: errorMsg, checked: false});
              }
            });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      });
    });
  }

  // [GET] /api/post/Categories/:id
  getPostByCategories(req, res) {
    const id = req.params.id; 
    const selectSql = "call PostByCategories(?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(selectSql, id, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results[0]) {
          results[0].forEach(rs => {
            if(rs.Degree == null){
              rs.Degree = "Admin"
            }
          })
          res.status(200).send({ data: results[0], checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  // [GET] /api/post/similar/categories
  getPostBySimilarCategories(req, res) {
    const id = req.params.id; // id similar
    const selectSql = "call PostBySimilarCategories(?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(selectSql, id, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results[0]) {
          results[0].forEach(rs => {
            if(rs.Degree == null){
              rs.Degree = "Admin"
            }
          })
          res.status(200).send({ data: results[0], checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  

  // [GET] /api/category
  getCategory(req, res) {
    const selectSql =
      "select * from AllCategory";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(selectSql, function (error, results, fields) {
      if (error) {
        res.send({ message: error, checked: false });
      } else {
        if (results) {
          for (let i = 0; i < results.length; i++) {
            if (i != 0 && results[i].id == results[i - 1].id) {
              //results.Similar = [suy gan, sỏi thận]
              if (!Array.isArray(results[i - 1].Similar)) {
                results[i - 1].Similar = [
                  {
                    id: results[i - 1].idSimilar,
                    SimilarCategories: results[i - 1].Similar,
                    ImageSimilar: results[i - 1].ImageSimilar,
                    DescriptionSimilar: results[i - 1].DescriptionSimilar,
                  },
                ];
              }
              results[i].Similar = [
                ...results[i - 1].Similar,
                {
                  id: results[i].idSimilar,
                  SimilarCategories: results[i].Similar,
                  ImageSimilar: results[i].ImageSimilar,
                  DescriptionSimilar: results[i].DescriptionSimilar,
                },
              ];
              const delCol = ["idSimilar", "ImageSimilar", "DescriptionSimilar"];
              delCol.forEach(col => delete results[i][col]);
              results.splice(i - 1, 1);
              i -= 1;
            }
            if (i == results.length - 1) {
              res.status(200).send({ data: results, checked: true });
            }
          }
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
  }

  // [GET] /api/major
  getMajor(req, res) {
    const selectSql =
      "select * from AllMajorDoctor";
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

  // [GET] /api/comments/:idPost/:idAccount
  getComment(req, res) {
    const {idPost, idAccount} = req.params; 
    const selectSql = "call AllCmt(?)";
    let LoveData = [];
    let CmtData = [];
    const sql = "select idComment, idReplycomment, Status from lovecomment where idAccount = ? and idPost = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    
    if(idAccount != 'null'){
      pool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!

        connection.query(sql, [idAccount, idPost], function (error, results, fields) {
          if (error) res.send({ message: errorMsg, checked: false });
          if (results) LoveData = results;
        });

        connection.query(selectSql, idPost, function (err, rs, fields) {
          connection.destroy();
          if (err) {
            res.send({ message: errorMsg, checked: false });
          }
          if (rs[0]) {
            CmtData = rs[0];
            for(let i = 0; i < CmtData.length; i++) {
              CmtData[i].IsLoved = false;
              CmtData[i].repIsLoved = false;

              LoveData.forEach(loveDT => {
                if(loveDT.Status == 0 && loveDT.idComment == CmtData[i].id) {
                  CmtData[i].IsLoved = true;
                } 
                else if(loveDT.Status == 1  && loveDT.idReplycomment == CmtData[i].repid) {
                  CmtData[i].repIsLoved = true;
                }

              });

              if (CmtData[i].repid) {
                CmtData[i].RepComment = [
                  { 
                    repid: CmtData[i].repid,
                    repLastName: CmtData[i].repLastName,
                    repFirstName: CmtData[i].repFirstName,
                    repAvt: CmtData[i].repAvt,
                    repidAccount: CmtData[i].repidAccount,
                    repCmt: CmtData[i].repCmt,
                    repCmtTime: CmtData[i].repCmtTime,
                    repLove: CmtData[i].repLove,
                    repIsLoved: CmtData[i].repIsLoved,
                    repStatus: CmtData[i].repStatus,
                  },
                ];
                
              } 
              const delCol = ["repLastName", "repFirstName", "repAvt", "repid", "repidAccount", "repCmt", "repCmtTime", "repLove", "repIsLoved", "repStatus"];
              delCol.forEach(col => delete CmtData[i][col]);
              
              if (i != 0 && CmtData[i].id == CmtData[i - 1].id) {
                CmtData[i].RepComment = [...CmtData[i - 1].RepComment, ...CmtData[i].RepComment];
                CmtData.splice(i - 1, 1);
                i -= 1;
              }
        
              if(i == CmtData.length - 1) res.status(200).send({ data: CmtData, checked: true });
            }
          }
        });
      });
    }
    else {
      pool.query(selectSql, idPost, function (err, rs, fields) {
        if (err) {
          res.send({ message: errorMsg, checked: false });
        }
        if (rs[0].length > 0) { 
          CmtData = rs[0];
          for(let i = 0; i < CmtData.length; i++) {

            if (CmtData[i].repid) {
              CmtData[i].RepComment = [
                { 
                  repid: CmtData[i].repid,
                  repLastName: CmtData[i].repLastName,
                  repFirstName: CmtData[i].repFirstName,
                  repAvt: CmtData[i].repAvt,
                  repidAccount: CmtData[i].repidAccount,
                  repCmt: CmtData[i].repCmt,
                  repCmtTime: CmtData[i].repCmtTime,
                  repLove: CmtData[i].repLove,
                  repStatus: CmtData[i].repStatus,
                },
              ];
              
            } 
            const delCol = ["IsLoved", "repLastName", "repFirstName", "repAvt", "repid", "repidAccount", "repCmt", "repCmtTime", "repLove", "repIsLoved", "repStatus"];
            delCol.forEach(col => delete CmtData[i][col]);
            
            if (i != 0 && CmtData[i].id == CmtData[i - 1].id) {
              CmtData[i].RepComment = [...CmtData[i - 1].RepComment, ...CmtData[i].RepComment];
              CmtData.splice(i - 1, 1);
              i -= 1;
            }
      
            if(i == CmtData.length - 1) res.status(200).send({ data: CmtData, checked: true });
          }
        } else res.status(200).send({ data: [], checked: true });
      });
    }
    


    
  }

  // [POST] /api/comment/create
  createComment(req, res) {
    const idAccount = req.user.id;
    const { id, Cmt, Status } = req.body;
    let insertSql = "";

    if(Status == "CMT") {
      insertSql = "insert into comment (idAccount, idPost, Cmt, CmtTime) values (?,?,?, now())";
    } else {
      insertSql = "insert into replycomment (idAccount, idComment, Cmt, CmtTime) values (?,?,?, now())";
    }
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query( insertSql, [idAccount, id, Cmt], function (error, results, fields) {
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
  updateComment(req, res) {  // id
    const { id, Cmt, Status } = req.body;  
    let updateSql = "";
      
    if(Status == "CMT") {
      updateSql = "update comment set Cmt = ?, Status = 1 where id = ?";
    } else {
      updateSql = "update replycomment set Cmt = ?, Status = 1 where id = ?";
    }
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    
    pool.query(updateSql, [Cmt, id], function (error, results, fields) {
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

    const { id, Status } = req.body;
    let deleteSql = "";
     
    if(Status == "CMT") {
      deleteSql = "delete from comment where id = ?";
    } else {
      deleteSql = "delete from replycomment where id = ?";
    }
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

  // [POST] /api/comment/love
  loveComment(req, res) {
    const idAccount = req.user.id;
    const { id, Status, idPost} = req.body;
    let SQL = "";
      
    if(Status == "CMT") {
      SQL = "insert into lovecomment (idAccount, idComment, idPost) values (?,?,?)";
    } else {
      SQL = "insert into lovecomment (idAccount, idReplycomment, idPost, Status) values (?,?,?,1)";
    }
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(SQL, [idAccount, id, idPost], function (error, results, fields) {
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

  // [POST] /api/post/search/post
  searchPost(req, res, next) {
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

  // [POST] /api/search/doctor
  searchDoctor(req, res, next) {
    let { keywords } = req.body;
    keywords = "%" + keywords + "%";
    const selectSql = "call SearchDoctor(?)";
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

  // [POST] /api/post/search/disease
  searchDisease(req, res, next) {
    let { keywords } = req.body;
    keywords = "%" + keywords + "%";
    const selectSql = "call SearchDisease(?)";
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

  // ADMIN API

  //[GET] /api/admin/post/:filter/:orderby
  getAllPost(req, res) {
    let filter = "";
    if(req.params.filter){
      filter = "order by " + req.params.filter + " " + req.params.orderby;
    }
    const selectSql = "select * from AllPost " + filter;
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    const date = new Date(); 
    const countSql = "SELECT COUNT(*) as total FROM AllPost WHERE YEAR(DatePost) = " + date.getFullYear() + " and MONTH(DatePost)= " + (date.getMonth() + 1);

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!
  
        connection.query(selectSql, function (error, results, fields) {
          if (error) {
            res.send({ message: errorMsg, checked: false });
          }
          if (results.length > 0) {
            connection.query(countSql, function (error, rs, fields) {
              connection.destroy();
              if (error) {
                res.send({ message: error, checked: false });
              }
              if (rs) { 
                res.status(200).send({ data: results, count: rs[0].total, checked: true });
              }
            });
          }
        });
      })
    }
  }

  //[POST] /api/admin/post/filter
  filterPost(req, res) {
    let DatePost = "";
    let Similar = "";
    if(req.body.StartDate){
      let sd = req.body.StartDate.split("/")
      let ed = req.body.EndDate.split("/")
      DatePost = "DatePost BETWEEN '" + sd[2] + "-" + sd[1] + "-" + sd[0] + "' AND '" + ed[2] + "-" + ed[1] + "-" + ed[0] + "'";
    }
    if(req.body.Similar){
      if(req.body.StartDate){
        Similar = " and idSimilar = " + req.body.Similar;
      } else {
        Similar = " idSimilar = " + req.body.Similar;
      }
    } 
    const selectSql = "select * from AllPost WHERE " + DatePost + Similar;
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.query(selectSql, function (error, results, fields) {
        if (error) {
          res.send({ message: error, checked: false });
        }
        if (results) {
          res.status(200).send({ data: results, checked: true });
        }
      });
    }
  }

  //[POST] /api/admin/post/search
  getPostByKeyword(req, res) {
    let { keywords } = req.body; 
    keywords = "%" + keywords + "%";
    const selectSql = "call getPostByKeyword(?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.query(selectSql, keywords, function (error, results, fields) {
        if (error) { 
          res.send({ message: error, checked: false });
        } else {
          
          if (results[0].length > 0) {  
            res
              .status(200)
              .send({ data: results[0], checked: true });
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
    const updateSql = "update post set Status = 1 where id = ? and Status = 0";
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

  //[GET] /api/admin/account/:filter/:orderby
  getAccount(req, res) {
    let filter = "";
    if(req.params.filter){
      filter = "order by " + req.params.filter + " " + req.params.orderby;
    }
    const selectSql = "select * from AllAccount " + filter;
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    const date = new Date(); 
    const countSql = "SELECT COUNT(*) as total FROM AllAccount WHERE YEAR(CreatedAt) = " + date.getFullYear() + " and MONTH(CreatedAt)= " + (date.getMonth() + 1);

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!
  
        connection.query(selectSql, function (error, results, fields) {
          if (error) {
            res.send({ message: errorMsg, checked: false });
          }
          if (results.length > 0) {
            connection.query(countSql, function (error, rs, fields) {
              connection.destroy();
              if (error) {
                res.send({ message: error, checked: false });
              }
              if (rs) { 
                res.status(200).send({ data: results, count: rs[0].total, checked: true });
              }
            });
          }
        });
      })
    }
  }

  //[POST] /api/admin/account/filter
  filterAccount(req, res) {
    let CreatedAt = "";
    let Role = "";
    let Sort = "";
    if(req.body.StartDate){
      let sd = req.body.StartDate.split("/")
      let ed = req.body.EndDate.split("/")
      CreatedAt = "CreatedAt BETWEEN '" + sd[2] + "-" + sd[1] + "-" + sd[0] + "' AND '" + ed[2] + "-" + ed[1] + "-" + ed[0] + "'";
    }
    if(req.body.Role){
      if(req.body.StartDate){
        Role = " and Role = '" + req.body.Role + "'";
      } else {
        Role = " Role = '" + req.body.Role + "'";
      }
    } 
    if(req.body.Sort){
      Sort = " order by CreatedAt " + req.body.Sort;
    }
    const selectSql = "select * from AllAccount WHERE " + CreatedAt + Role + Sort;
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.query(selectSql, function (error, results, fields) {
        if (error) {
          res.send({ message: error, checked: false });
        }
        if (results) {
          res.status(200).send({ data: results, checked: true });
        }
      });
    }
  }

  //[POST] /api/admin/account/search
  getAccountByKeyword(req, res) {
    
    let { keywords } = req.body; 
    keywords = "%" + keywords + "%";
    const selectSql = "call getAccountByKeyword(?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.query(selectSql, keywords, function (error, results, fields) {
        if (error) { 
          res.send({ message: error, checked: false });
        } else {
          
          if (results[0].length > 0) {  
            res
              .status(200)
              .send({ data: results[0], checked: true });
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
      "insert into account (FirstName, LastName, BirthDate, Gender, Address, Email, Phone, Authorization, CreatedAt) values(?,?,?,?,?,?,?,?, now())";
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
    const date = new Date();
    const countSql = "SELECT COUNT(*) as total FROM AllAppointment WHERE YEAR(DateBooking) = " + date.getFullYear() + " and MONTH(DateBooking)= " + (date.getMonth() + 1);

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.getConnection(function (err, connection) {
        if (err) throw err; // not connected!
  
        connection.query(selectSql, function (error, results, fields) {
          if (error) {
            res.send({ message: error, checked: false });
          } else {
            if (results.length > 0) { 
              connection.query(countSql, function (error, rs, fields) {
                connection.destroy();
                if (error) {
                  res.send({ message: error, checked: false });
                }
                if (rs) { 
                  res.status(200).send({ data: results, count: rs[0].total, checked: true });
                }
              });
            } else {
              res.status(200).send({ message: errorMsg, checked: false });
            }
          }
        });
      })
    }
  }

  //[GET] /api/admin/dashboard
  getTotalDashboard(req, res) {
    const selectSql = "select * from countTotal";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    const date = new Date();
    
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
