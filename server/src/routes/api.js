const express = require("express");
const api = require("../app/controllers/API");
const router = express.Router();
const passport = require("passport");
const PassportCheck = passport.authenticate("jwt", { session: false });
const GooglePassport = passport.authenticate("google", {
  scope: ["email", "profile"],
});
const fileUploader = require("../app/middleware/cloudinary-upload.js");
//const myOAuth2Client = require("../app/configs/oauth2client");
const nodemailer = require("nodemailer");

// const transport = require('../app/middleware/nodemailer')
const GoogleCallback = passport.authenticate("google", {
  successRedirect: "http://localhost:3000?true=4",
  failureRedirect: "/api/auth/failure",
});

// // guest
router.post("/login", api.login);
// router.post("/check/email", api.emailCheck);
// router.post("/check/username", api.usernameCheck);
// router.patch("/update/password", PassportCheck, api.updatePassword);

router.get("/isauth", PassportCheck, api.isAuth);
// router.post("/email/send", api.sendEmail);

router.post("/auth/google/check", api.Google);

router.get("/auth/google", GooglePassport);
router.get("/auth/google/callback", GoogleCallback);
router.get("/auth/success", api.authSuccess);
router.get("/auth/failure", api.authFailure);

router.post("/register", api.register);
router.post("/send/otp", api.sendOTP);

router.post("/send/mail", api.sendMail);

router.post(
  "/post/create",
  fileUploader.fields([
    { name: "FeaturedImage", maxCount: 1 },
    { name: "Gallery", maxCount: 10 },
  ]),
  api.createPost
);
router.patch(
  "/post/update",
  fileUploader.fields([
    { name: "FeaturedImage", maxCount: 1 },
    { name: "Gallery", maxCount: 10 },
  ]),
  api.updatePost
);

//admin
router.get("/admin/post", api.getAllPost);
router.patch("/admin/post/accept", api.acceptPost);
router.patch("/admin/post/status/change", api.changeStatusPost);

// // product
// router.get("/products", api.getProducts);
// router.get("/products/detail/:id", api.getProductById);
// router.get("/products/search/keywords", api.getProductsByKeywords);
// router.get("/products/search/genre", api.getProductsByGenre);
// router.get("/products/search/price", api.getProductsByPrice);
// router.get("/products/search/publisher", api.getProductsByPublisher);
// router.get("/products/search/age", api.getProductsByAge);
// router.get("/products/search/form", api.getProductsByForm);

// // cart
// router.get("/cart", PassportCheck, api.getCart);
// router.post("/cart/add", PassportCheck, api.addToCart);
// router.delete("/cart/remove", PassportCheck, api.removeFromCart);
// router.patch("/cart/update", PassportCheck, api.updateCart);
// router.post("/cart/order", PassportCheck, api.createOrder);

// // profile
// router.get("/profile", PassportCheck, api.getProfile);
// router.patch(
//   "/profile/update",
//   PassportCheck,
//   fileUploader.single("avatar"),
//   api.updateProfile
// );

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
