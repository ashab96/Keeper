const mongoose = require("mongoose");

//schema
const Schema = mongoose.Schema;
const noteSchema = new Schema(
    {
        title: String,
        content: String,
    },
    {
        timestamps: true,
    }
);

//model 
const Note = mongoose.model("Note",noteSchema);
module.exports = Note;

