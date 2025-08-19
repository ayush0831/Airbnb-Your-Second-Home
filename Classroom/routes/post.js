const express = require("express");
const router = express.Router();

// Index user
router.get("/",(req,res) => {
    res.send("Get for Posts");
});

// Show Post
router.get("/:id",(req,res) => {
    res.send("Get for Post id");
});

// Post 
router.post("/",(req,res) => {
    res.send("Post for posts");
});

//Delete users
router.delete("/:id",(req,res) => {
    res.send("Delete for post id");
});

module.exports = router;