const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://ratikrishna:Rati%402000@cluster1.kj3wm.mongodb.net/todo");
const todoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
});

const todo = mongoose.model("todo", todoSchema);

module.exports = {
    todo
}