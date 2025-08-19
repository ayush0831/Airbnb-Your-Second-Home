const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const {isLoggedIn,isOwner,validateListing} = require("../middleware.js");
const { index } = require("../controllers/listing.js");

const listingController = require("../controllers/listing.js");
const multer  = require('multer');
const {storage} = require("../cloudConfig.js");

const upload = multer({ storage });



//Index Route
router.route("/")
.get(wrapAsync(listingController.index))
.post(isLoggedIn,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.createListing)
);
// .post(upload.single('listing[image]'),(req,res) => {
//     res.send(req.file);
// });

// New and Create Route
router.get("/new",isLoggedIn,listingController.renderNewform);

router.route("/:id")
.get(wrapAsync(listingController.showListing))
.put(isLoggedIn,
    isOwner,
    upload.single('listing[image]'),
    validateListing,
    wrapAsync(listingController.updateListing)
)
.delete(isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

// Show Route 
//router.get("/:id",wrapAsync(listingController.showListing));

//Create Route
// router.post("/",isLoggedIn,validateListing , wrapAsync(listingController.createListing));

// Edit Route
router.get("/:id/edit",isLoggedIn,isOwner,wrapAsync(listingController.renderEditform));

//update Route
//router.put("/:id",validateListing ,isLoggedIn,isOwner,wrapAsync(listingController.updateListing));

//Delete Route
//router.delete("/:id",isLoggedIn,isOwner,wrapAsync(listingController.destroyListing));

module.exports = router;