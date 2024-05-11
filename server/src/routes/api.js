const express = require("express");
const api = require("../app/controllers/API");
const router = express.Router();
const passport = require("passport");
const PassportCheck = passport.authenticate("jwt", { session: false });
const fileUploader = require("../app/middleware/cloudinary-upload.js");
const fileConfig = require("../app/configs/muter");
//const myOAuth2Client = require("../app/configs/oauth2client");
const nodemailer = require("nodemailer");

router.post("/execute/query", api.executeQuery);
// guest
router.post("/login", api.login);

// AUTH _ GG
router.get("/isauth", PassportCheck, api.isAuth);
router.post("/auth/google/check", api.Google);

router.post("/register", api.register);
router.post("/send/otp", api.sendOTP);
router.post("/send/mail", api.sendMail);

// patient - doctor
router.get("/profile", PassportCheck, api.getProfile);
router.post(
  "/profile/update",
  PassportCheck,
  fileUploader.single("Avt"),
  api.updateProfile
);
router.get("/appointment", PassportCheck, api.getAppointmentById);
router.post("/appointment/create", PassportCheck, api.createAppointment);
router.patch("/appointment/accept", PassportCheck, api.acceptAppointment);
router.patch("/appointment/complete", PassportCheck, api.completeAppointment);
router.patch("/appointment/cancel", PassportCheck, api.cancelAppointment);
router.get("/notification", PassportCheck, api.getNotification);
router.post("/notification/create", PassportCheck, api.createNotification);
router.patch("/notification/read", PassportCheck, api.readNotification);
router.post("/doctor/schedule", api.getSchedule); // laays lich bac si cua ngay cu the + eTime
router.post("/schedule", PassportCheck, api.setSchedule);
router.get("/service", api.getService);
router.post("/doctor/service/create", PassportCheck, api.serviceDoctor); //theem service cho moi bac si
router.post("/doctor/service", api.getServiceDoctor); // lay dich vu cua tung bsi

// Blog
router.post(
  "/post/create",
  PassportCheck,
  fileUploader.fields(fileConfig),
  api.createPost
);
router.post("/post/image", fileUploader.single("image"), api.addImage);
router.patch(
  "/post/update",
  PassportCheck,
  fileUploader.fields(fileConfig),
  api.updatePost
);
router.get("/post", api.getPost);
router.get("/post/detail/:id", api.getPostById);
router.get("/post/categories", api.getPostByCategories); // truyền tới id categories
router.get("/post/similar/categories", api.getPostBySimilarCategories); // truyền tới id similar
router.get("/search/keywords", api.searchByKeywords);
router.get("/category", api.getCategory);
router.get("/comment", api.getComment); // lấy tất cả cmt dựa trên idPost -> truyền idPost
router.post("/comment/create", PassportCheck, api.createComment); // thêm cmt vào 1 post ->truyền idPost
router.post("/comment/update", PassportCheck, api.updateComment); // chỉnh sửa cmt ->truyền id, Cmt (id này là id comment)
router.post("/comment/delete", PassportCheck, api.deleteComment); // xóa cmt dựa trên id comment -> truyền id

//admin
router.get("/admin/post", PassportCheck, api.getAllPost);
router.patch("/admin/post/accept", PassportCheck, api.acceptPost);
router.patch("/admin/post/status/change", PassportCheck, api.changeStatusPost);
router.get("/admin/account", PassportCheck, api.getAccount);
router.post("/admin/account/create", PassportCheck, api.createAccount);
router.patch("/admin/account/update", PassportCheck, api.updateAccount);
router.delete("/admin/account/delete", PassportCheck, api.deleteAccount);
router.get("/admin/appointment", PassportCheck, api.getAppointment);

module.exports = router;
