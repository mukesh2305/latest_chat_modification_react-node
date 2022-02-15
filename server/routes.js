const express = require("express");
const connectdb = require("./dbConnection");
const Chat = require("./chatSchema");
const Count = require("./countSchema");

const router = express.Router();

router.route("/").get((req, res, next) => {
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    connectdb.then(db => {
        Chat.find({}).then(chat => {
            res.json(chat);
        });
    });
});
router.route("/count").get((req, res, next) => {
    console.log("this")
    res.setHeader("Content-Type", "application/json");
    res.statusCode = 200;
    connectdb.then(db => {
        Count.find({}).then(count => {
            count.splice(0, count.length - 1);
            res.json({ count: count[0].count })
        })

    });
});

module.exports = router;
