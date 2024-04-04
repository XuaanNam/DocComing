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


class API {


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
    const auth = req.user[0];
    if (auth) {
      res.status(200).send({ authentication: auth });
    } else {
      return next(createError(401));
    }
  }

  // [POST] /api/login
  login(req, res, next) {
    const sql = "select id, Phone, PassWord, Authorization from account where Phone = ? ";
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



  // [GET] /api/auth/success
  authSuccess(req, res, next) {
    if(req.user){
      res.status(200).json({
        message: "Đăng nhập thành công!",
        user: req.user
      })
    } else {
      res.status(403).json({
        message: "Đăng nhập thất bại!"
      })
    }
  }
  
  // [GET] /api/auth/failure
  authFailure(req, res, next) {
    res.redirect("http://localhost:3000?auth=false")
  }

  //[POST] /api/send/otp
  sendOTP(req, res, next) {
    
  }

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

  //[POST] /api/post/create
  createPost (req, res) {

    let FeaturedImage = req.files ? req.files.FeaturedImage[0].path : "null";
    let Images = "";
    if(req.files.Gallery ){
      for(let i=0; i<req.files.Gallery.length; i++){
        Images += req.files.Gallery[i].path;
        if(i != req.files.Gallery.length - 1){
          Images += ";"
        }
      }
    }
    const {Title, Brief, Content, idAuthor, idCategories} = req.body;
    const date = new Date();
    const DatePost = date.getFullYear() + "-" + date.getMonth() + "-" + date.getDate() + 
                      " " + date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    const insertSql =
      "insert into post (FeaturedImage, Title, Brief, Content, Images, idAuthor, DatePost, idCategories) values (?,?,?,?,?,?,?,?)";

    pool.query(
      insertSql,
      [FeaturedImage, Title, Brief, Content, Images, idAuthor, DatePost, idCategories],
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

  //[PATCH] /api/post/update
  updatePost(req, res) {
    let FeaturedImage = req.files ? req.files.FeaturedImage[0].path : "null";
    let Images = "";
    if(req.files.Gallery ){
      for(let i=0; i<req.files.Gallery.length; i++){
        Images += req.files.Gallery[i].path;
        if(i != req.files.Gallery.length - 1){
          Images += ";"
        }
      }
    }
    const {Title, Brief, Content, idCategories, id} = req.body;

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

  //[GET] /api/admin/post
  getAllPost(req, res) {
    
    const selectSql = "select * from AllPost";
    const errorMsg = "Cập nhật trạng thái bài viết không thành công!"

    pool.query(
      selectSql, function (error, results, fields) {
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
  
  //[PATCH] /api/admin/post/accept
  acceptPost(req, res) {
    
    const {id} = req.body;
    const updateSql = "update post set Status = 1 where id = ? ";
    const errorMsg = "Có lỗi bất thường, bài viết không thành công!"

    pool.query(
      updateSql, id, function (error, results, fields) {
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

  //[PATCH] /api/admin/post/status/change
  changeStatusPost(req, res) {
    
    const {id} = req.body;
    const callSql = "call UpdateStatusPost(?)";
    const errorMsg = "Cập nhật trạng thái bài viết không thành công!"

    pool.query(
      callSql, id, function (error, results, fields) {
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

module.exports = new API();