const pool = require("../models/pool");
const fs = require("fs");
const express = require("express");
const path = require("path");
require("dotenv").config();
const bcrypt = require("bcrypt");
const saltRound = 9;
const encodeToken = require("../../util/encodeToken");
const createError = require("http-errors");
//const myOAuth2Client = require("../../app/configs/oauth2client");
const nodemailer = require("nodemailer");


class API {


  // [POST] /api/register
  register(req, res, next) {
    const insertSql =
      "insert into account (LastName, FirstName, Email, PassWord, Phone) value (?,?,?,?,?)";
    const errorMsg = "Đã có lỗi xảy ra, vui lòng thử lại!";
    const successMsg = "Tài khoản đã đăng kí thành công!";
    const LastName = req.body.LastName;
    const FirstName = req.body.FirstName;
    const Email = req.body.Email;
    const PassWord = req.body.PassWord;
    const Phone = req.body.Phone;

    bcrypt.hash(PassWord, saltRound, (err, hash) => {
      if (err) {
        res.status(200).send({ message: errorMsg, checked: false });
      } else {
        pool.query(
          insertSql,
          [LastName, FirstName, Email, hash, Phone],
          function (error, results, fields) {
            if (error) {
              res.send({ message: errorMsg, checked: false });
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
    console.log("false") 
  }

}

module.exports = new API();