const express = require("express");
const api = require("../app/controllers/API");
const router = express.Router();
const passport = require("passport");
const PassportCheck = passport.authenticate("jwt", { session: false });
const fileUploader = require("../app/middleware/cloudinary-upload.js");
const fileConfig = require("../app/configs/muter");

// router.post("/execute/query", api.executeQuery);
// guest
router.post("/login", api.login);

// AUTH _ GG
router.get("/isauth", PassportCheck, api.isAuth);
router.post("/auth/google/check", api.Google);
router.post("/register", api.register);
//router.post("/send/otp", api.sendOTP);
router.post("/send/mail", api.sendMail);
router.post("/reset/password", PassportCheck, api.resetPassword);
router.post("/change/password", PassportCheck, api.changePassword);

// patient - doctor
router.get("/profile", PassportCheck, api.getProfile);
router.post("/profile/update", PassportCheck, fileUploader.single("Avt"), api.updateProfile);

router.get("/appointment", PassportCheck, api.getAppointmentById); // lấy appointment của bác sĩ hoặc bệnh nhân
router.post("/appointment/create", PassportCheck, api.createAppointment); 
router.post("/appointment/accept", PassportCheck, api.acceptAppointment); // 4 api này gửi id appointment cần đổi status
router.post("/appointment/complete", PassportCheck, api.completeAppointment); 
router.post("/appointment/cancel", PassportCheck, api.cancelAppointment); 
router.post("/appointment/note", PassportCheck, api.noteAppointment); 
router.post("/appointment/note/update", PassportCheck, api.updateNoteAppointment); 
router.post("/appointment/note/accept", PassportCheck, api.acceptNoteAppointment); 
router.post("/appointment/note/cancel", PassportCheck, api.cancelNoteAppointment); 
router.get("/schedule/:idDoctor/:date/:month/:year", api.getSchedule); // lấy lich bac si ở ngay cu the + eTime (chỉ dùng cho patient)
router.post("/schedule", PassportCheck, api.setSchedule); // thiết lập lịch khám của bsi
router.get("/service", api.getService); // lấy all service

// MEDICAL RECORD
router.post("/medical/record", PassportCheck, api.medicalRecord);
router.get("/medical/record", PassportCheck, api.getMedicalRecord);
router.post("/medical/record/update", PassportCheck, api.updateMedicalRecord);

// DOCTOR
router.get("/doctor", api.getDoctor); // lay all bsi
router.post("/doctor/service", api.getServiceDoctor); // lay dich vu cua bsi với idDoctor
router.get("/doctor/:id", api.getDetailDoctor); // lay bsi với id (danh cho patient)
router.get("/doctor/schedule/:date/:month/:year", PassportCheck, api.getDoctorSchedule); // lay schedule bsi với id
router.post("/doctor/service/create", PassportCheck, api.createServiceDoctor); //theem service cho moi bac si -- gửi data
router.post("/doctor/service/delete", PassportCheck, api.deleteServiceDoctor); //xóa service cho moi bac si -- gửi idService và token
router.get("/doctor/service/avg", PassportCheck, api.avgPriceService);
router.get("/doctor/post/get", PassportCheck, api.getDoctorPost); // token --> là đc
router.post("/doctor/post/search", PassportCheck, api.searchDoctorPost);

//notification
router.get("/notification", PassportCheck, api.getNotification);
router.post("/notification/create", PassportCheck, api.createNotification);
router.post("/notification/read", PassportCheck, api.readNotification);


// #RATING DOCTOR
router.get("/rating/:idDoctor", api.getRateDoctor); // idDoctor/idPatient --> params, idPatient không có -> null
router.post("/rating", PassportCheck, api.createRateDoctor); //
router.post("/rating/update", PassportCheck, api.updateRateDoctor); //

// Blog
router.post("/post/create", PassportCheck, fileUploader.fields(fileConfig), api.createPost);
router.post("/post/image", fileUploader.single("image"), api.addImage);
router.post("/post/update", PassportCheck, fileUploader.fields(fileConfig), api.updatePost);
router.get("/post", api.getPost);
router.get("/post/detail/:id", api.getPostById); 
router.get("/post/categories/:id", api.getPostByCategories); // truyền tới id categories
router.get("/post/categories/similar/:id", api.getPostBySimilarCategories); // truyền tới id similar
router.get("/category", api.getCategory);
router.get("/major", api.getMajor); 
router.get("/comment/:idPost/:idAccount", api.getComment); // lấy tất cả cmt dựa trên idPost -> truyền idPost/ nếu k có idAcc -> idAcc = null
router.post("/comment/create", PassportCheck, api.createComment); // thêm cmt vào 1 post ->truyền idPost
router.post("/comment/update", PassportCheck, api.updateComment); // chỉnh sửa cmt ->truyền id, Cmt (id này là id comment)
router.post("/comment/delete", PassportCheck, api.deleteComment); // xóa cmt dựa trên id comment -> truyền id
router.post("/comment/love", PassportCheck, api.loveComment); //truyền tới idCMT (hoặc ipREP) + Status ("CMT" hoac "REP") và idPost

// SEARCH
router.post("/search/post", api.searchPost);
router.post("/search/doctor", api.searchDoctor);
router.post("/search/disease", api.searchDisease); // search bệnh -> tên bác sĩ

//admin
router.get("/admin/post/:filter/:orderby", PassportCheck, api.getAllPost);
router.post("/admin/post/filter", PassportCheck, api.filterPost);
router.post("/admin/post/search", PassportCheck, api.getPostByKeyword);
router.post("/admin/post/accept", PassportCheck, api.acceptPost);
router.post("/admin/post/status/change", PassportCheck, api.changeStatusPost);
router.get("/admin/account/:filter/:orderby", PassportCheck, api.getAllAccount);
router.post("/admin/account/filter", PassportCheck, api.filterAccount);
router.post("/admin/account/search", PassportCheck, api.getAccountByKeyword);
router.post("/admin/account/create", PassportCheck, api.createAccount);
router.post("/admin/account/update", PassportCheck, api.updateAccount);
router.delete("/admin/account/delete", PassportCheck, api.deleteAccount);
router.get("/admin/appointment", PassportCheck, api.getAppointment);
router.get("/admin/dashboard", PassportCheck, api.getTotalDashboard);


module.exports = router;
