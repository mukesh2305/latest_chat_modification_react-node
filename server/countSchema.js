const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const countSchema = new Schema(
    {
        count: {
            type: Number
        },
    },
    {
        timestamps: true
    });

let Count = mongoose.model("countUser", countSchema);
module.exports = Count;
