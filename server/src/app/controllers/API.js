const pool = require("../models/pool");
const fs = require("fs");
const express = require("express");
const path = require("path");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRound = 9;
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
      }
    );
  }

  // [POST] /api/register
  register(req, res, next) {
    const insertSql =
      "insert into account (LastName, FirstName, Email) value (?,?,?)";
    const errorMsg = "Đã có lỗi xảy ra, vui lòng thử lại!";
    const successMsg = "Tài khoản đã đăng kí thành công!";
    const LastName = req.body.LastName;
    const FirstName = req.body.FirstName;
    const Email = req.body.Email;
    const picture = req.body.picture;

    pool.query(
      insertSql,
      [LastName, FirstName, Email],
      function (error, results, fields) {
        if (error) {
          res.send({ message: errorMsg, checked: false });
        } else {
          res.send({ message: successMsg, checked: true });
        }
      }
    );
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
    const sql =
      "select id, Phone, PassWord, Authorization from account where Phone = ? ";
    const message = "Số điện thoại hoặc mật khẩu không chính xác!";
    const Phone = req.body.Phone;
    const PassWord = req.body.PassWord;

    pool.query(sql, Phone, function (error, results, fields) {
      if (error) {
        res.send({ message: error });
      } else {
        if (results.length > 0) {
          bcrypt.compare(PassWord, results[0].PassWord, (err, response) => {
            if (response) {
              const payload = {
                iss: "Doccoming",
                id: results[0].id,
                Phone: results[0].Phone,
                authentication: results[0].Authorization,
              };
              const token = "Bearer " + encodeToken(payload);

              //res.setHeader("isAuth", token);
              res.send({
                checked: true,
                token,
                id: results[0].id,
                Phone: results[0].Phone,
                authentication: results[0].authentication,
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
    const sql = "select id, Authorization from account where Email = ? ";
    let lastName = name.split(" ");
    lastName = lastName[lastName.length - 1];
    const firstName = name.split(lastName)[0];
    let payload = {};
    let token = "";
    console.log(email, name, googlePhotoUrl);
    const insertSql =
      "insert into account (Email, FirstName, LastName, Avt) values (?, ?, ?, ?)";
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
              name,
              authentication: results[0].Authorization,
              googlePhotoUrl,
            });
          } else {
            pool.query(
              insertSql,
              [email, firstName, lastName, googlePhotoUrl],
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
          const bd = results[0].BirthDate.split("-");
          const birth = bd[1] + "/" + bd[2] + "/" + bd[0];
          results[0].BirthDate = birth
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
    const FirstName = req.body.FirstName ? req.body.FirstName : null;
    const LastName = req.body.LastName ? req.body.LastName : null;
    const BirthDate = req.body.BirthDate ? req.body.BirthDate : null;
    const Address = req.body.Address ? req.body.Address : null;
    const Phone = req.body.Phone ? req.body.Phone : null;
    let Avt = req.file ? req.file.path : null;

    const updateSql =
      "update account set FirstName = ?, LastName = ?, BirthDate = ?, Phone = ?, Address = ?, Avt = ? where id = ?";
    const errorMsg = "Lỗi hệ thống, không thể cập nhật thông tin!";

    pool.query(
      updateSql,
      [FirstName, LastName, BirthDate, Phone, Address, Avt, id],
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

  //[GET] /api/appointment
  getAppointmentById(req, res) {
    let sql = "";
    const id = req.user.id;
    if (req.user.Authorization == 1) {
      sql = "select * from appointment where idPatient = ?";
    } 
    else if(req.user.Authorization == 2) {
      sql = "select * from appointment where idDoctor = ?";
    }
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    pool.query(sql, id, function (error, results, fields) {
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

  //[POST] /api/appointment/create
  createAppointment(req, res) {
    const idPatient = req.user.id;
    const { idService, idDoctor, Price, Information } = req.body;
    const insertSql = "insert into appointment (idService, idPatient, idDoctor, Price, Information) values(?,?,?,?,?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 1) {
      res.end("Unauthorized");
    } else {
      pool.query(insertSql, [idService, idPatient, idDoctor, Price, Information], function (error, results, fields) {
        if (error) {
          res.send({ message: error.sqlMessage, checked: false });
        } else {
          if (results) {
            res.status(200).send({checked: true });
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
    const updateSql = "update appointment set status = 1 where status = 0 and id = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 2) {
      res.end("Unauthorized");
    } else {
      pool.query(updateSql, id, function (error, results, fields) {
        if (error) {
          res.send({ message: error.sqlMessage, checked: false });
        } else {
          if (results) {
            res.status(200).send({checked: true });
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
    const updateSql = "update appointment set status = 2 where status = 1 and id = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 2) {
      res.end("Unauthorized");
    } else {
      pool.query(updateSql, id, function (error, results, fields) {
        if (error) {
          res.send({ message: error.sqlMessage, checked: false });
        } else {
          if (results) {
            res.status(200).send({checked: true });
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
          res.status(200).send({checked: true });
        } else {
          res.status(200).send({ message: errorMsg, checked: false });
        }
      }
    });
    
  }

  //[GET] /api/notification
  getNotification(req, res) {
    const id = req.user.id;
   
    const selectSql = "select * from notification n left join (select count(idAccount) as Unread, idAccount from notification where idAccount = ? and Status = 0) as c on n.idAccount = c.idAccount order by NotiTime desc";

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
    const {id} = req.body;
   
    const updateSql = "update notification set status = 1 where id = ?"
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

  //[POST] /api/notification/create
  createNotification(req, res, next) {
    const {noti } = req.body;
    const id = req.user.id;
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";
    const insertSql = "insert into notification (idAccount, Notification, NotiTime) values (?,?,?)";
    const date = new Date();
    const NotiTime =
      date.getFullYear() + "-" +
      date.getMonth() + "-" +
      date.getDate() + " " +
      date.getHours() + ":" +
      date.getMinutes() + ":" +
      date.getSeconds();
    pool.query(insertSql, [id, noti, NotiTime], function (error, results, fields) {
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
    // if (req.user.Authorization == 1) {
    //   res.end("Unauthorized");
    // } else {
    //   res.status(200).send({ checked: true, url });
    // }
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

  // [GET] /api/category
  getCategory(req, res) {
    const selectSql = "SELECT * FROM categories";
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
            res.status(200).send({checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      });
    }
  }

  //[POST] /api/admin/account/create
  createAccount(req, res) {
    const { FirstName, LastName, BirthDate, Address, Email, Phone, Authorization } = req.body;
    const insertSql = "insert into account (FirstName, LastName, BirthDate, Address, Email, Phone, Authorization) values(?,?,?,?,?,?,?)";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.query(insertSql, [FirstName, LastName, BirthDate, Address, Email, Phone, Authorization ], function (error, results, fields) {
        if (error) {
          res.send({ message: error.sqlMessage, checked: false });
        } else {
          if (results) {
            res.status(200).send({checked: true });
          } else {
            res.status(200).send({ message: errorMsg, checked: false });
          }
        }
      });
    }
  }

  //[PATCH] /api/admin/account/update
  updateAccount(req, res) {
    const { FirstName, LastName, BirthDate, Address, Email, Phone, id } = req.body;
    const updateSql = "update account set FirstName = ?, LastName = ?, BirthDate = ?, Address = ?, Email = ?, Phone = ? where id = ?";
    const errorMsg = "Có lỗi bất thường, request không hợp lệ!";

    if (req.user.Authorization != 0) {
      res.end("Unauthorized");
    } else {
      pool.query(updateSql, [FirstName, LastName, BirthDate, Address, Email, Phone, id ], function (error, results, fields) {
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

  //[DELETE] /api/admin/account/delete
  deleteAccount(req, res) {
    const {id } = req.body;
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
            res.status(200).send({checked: true });
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
