const mongoose = require ("mongoose")

const taskSchema = mongoose.Schema({
    ref: {type: String, required: true},
    title: { type: String, required: true},
    author: { type: String, required: true},
    description: { type: String, required: false},
})

module.exports = mongoose.model("books", taskSchema)