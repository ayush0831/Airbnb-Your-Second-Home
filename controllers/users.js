const User = require("../models/user");

module.exports.renderSignupform = (req,res) => {
    res.render("users/signup.ejs");
};

module.exports.signup = async(req,res) => {
    try{
        let {username,email,password} = req.body;
        const newUser = new User({email,username});
        const registeredUser = await User.register(newUser,password);      // special method from passport-local-mongoose that hashes password and save user in db
        console.log(registeredUser);
        req.login(registeredUser,(err) => {                  // automatically logins the user they don't need to sign in again
            if(err){
                return next(err);
            }
            req.flash("success","Welcome to Wanderlust");
            res.redirect("/listings");
        });
        
    }catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
    
};

module.exports.renderLoginform = (req,res) => {
    res.render("users/login.ejs");
};

module.exports.login = async(req,res) =>{
        req.flash("success","Welcome back to Wanderlust!");
        let redirectUrl = res.locals.redirectUrl || "/listings";
        res.redirect(redirectUrl);
};

module.exports.logout = (req,res,next) => {
    req.logout((err) => {               // login and logout are provided by passport
        if(err){
           return next(err);
        }
        req.flash("success","You are logged out");
        res.redirect("/listings");
    })
};