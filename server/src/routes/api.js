const express = require("express");
const api = require("../app/controllers/API");
const router = express.Router();
const passport = require("passport");
const PassportCheck = passport.authenticate("jwt", { session: false });
const fileUploader = require("../app/middleware/cloudinary-upload.js");
const fileConfig = require("../app/configs/muter")
//const myOAuth2Client = require("../app/configs/oauth2client");
const nodemailer = require("nodemailer");

// const transport = require('../app/middleware/nodemailer')


// guest
router.post("/login", api.login);
// router.post("/check/email", api.emailCheck);
// router.post("/check/username", api.usernameCheck);
// router.patch("/update/password", PassportCheck, api.updatePassword);

// AUTH _ GG
router.get("/isauth", PassportCheck, api.isAuth);
router.post("/auth/google/check", api.Google);
router.post("/email/send", api.sendMail);

router.post("/register", api.register);
router.post("/send/otp", api.sendOTP);
router.post("/send/mail", api.sendMail);

// profile
router.get("/profile", PassportCheck, api.getProfile);
router.patch(
  "/profile/update",
  PassportCheck,
  fileUploader.single("avatar"),
  api.updateProfile
);

// Blog router
router.post("/post/create", fileUploader.fields(fileConfig), api.createPost);
router.patch("/post/update", fileUploader.fields(fileConfig), api.updatePost);
router.get("/post", api.getPost);
router.get("/post/detail/:id", api.getPostById);
router.get("/post/search/keywords", api.getPostsByKeywords);

//service
router.get("/service", api.getService);

//admin
router.get("/admin/post", api.getAllPost);
router.post("/admin/post/create", fileUploader.fields(fileConfig), api.createPostAdmin);
router.patch("/admin/post/accept", api.acceptPost);
router.patch("/admin/post/status/change", api.changeStatusPost);


// 
// 
// 
// 
// router.get("/post/search/price", api.getPostsByPrice);
// router.get("/post/search/publisher", api.getPostsByPublisher);
// router.get("/post/search/age", api.getPostsByAge);
// router.get("/post/search/form", api.getPostsByForm);

// // cart
// router.get("/cart", PassportCheck, api.getCart);
// router.post("/cart/add", PassportCheck, api.addToCart);
// router.delete("/cart/remove", PassportCheck, api.removeFromCart);
// router.patch("/cart/update", PassportCheck, api.updateCart);
// router.post("/cart/order", PassportCheck, api.createOrder);



// // payment
// router.post("/payment/paypal", PassportCheck, api.paymentByPaypal);
// router.get("/paymentsuccess", api.paymentSuccess);
// router.get("/paymentfailed", api.paymentFailed);

// //admin - product
// router.get("/admin/warehouse", PassportCheck, api.getWarehouse);
// router.get("/admin/warehouse/search", PassportCheck, api.searchWarehouse);
// router.post(
//   "/admin/product/create",
//   PassportCheck,
//   fileUploader.single("image"),
//   api.createProduct
// );
// router.patch("/admin/product/update", PassportCheck, api.updateProduct);
// router.patch("/admin/product/status", PassportCheck, api.changeProductStatus);

// //admin - customer
// router.get("/admin/customer", PassportCheck, api.getCustomer);
// router.get("/admin/customer/:id", PassportCheck, api.getCustomerById);
// router.patch(
//   "/admin/customer/update/password",
//   PassportCheck,
//   api.updateCustomerPassword
// );

// //admin - order
// router.get("/admin/order", PassportCheck, api.getOrder);
// router.patch("/admin/order/status", PassportCheck, api.changeOrderStatus);
// router.delete("/admin/order/delete", PassportCheck, api.deleteOrder);

// //admin - transaction
// router.post("/admin/transaction/create", PassportCheck, api.createTransaction);

module.exports = router;
