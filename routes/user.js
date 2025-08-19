const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const {saveRedirectUrl} = require("../middleware.js");

const userController = require("../controllers/users.js");

router.route("/signup")
.get(userController.renderSignupform)
.post(wrapAsync(userController.signup));

router.route("/login")
.get(userController.renderLoginform)
.post(
    saveRedirectUrl,       // middleware that saves the current url(path)      ->    middleware.js
    passport.authenticate("local",{             // passport authenticate(checks) username exist or not in db
        failureRedirect: "/login",
        failureFlash: true
    }),
    userController.login
);


// signup
// router.get("/signup",userController.renderSignupform);

// router.post("/signup",wrapAsync(userController.signup));


//login
// router.get("/login",userController.renderLoginform);

// router.post(
//     "/login",
//     saveRedirectUrl,       // middleware that saves the current url(path)      ->    middleware.js
//     passport.authenticate("local",{             // passport authenticate(checks) username exist or not in db
//         failureRedirect: "/login",
//         failureFlash: true
//     }),
//     userController.login
// );

router.get("/logout",userController.logout);

module.exports = router;