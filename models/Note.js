// REQUIRE PACKAGES
// ===============================
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


// CREATE SCHEMA
// ===============================
let NoteSchema = new Schema({
    body: {
        type: String
    }
})

let Note = mongoose.model("Note", NoteSchema);


// EXPORT
// ===============================
module.exports = Note;