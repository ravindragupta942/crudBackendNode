require('dotenv').config();
const express = require('express');
const bodyparser = require('body-parser')
const mongoose = require('mongoose');

// express router
const router = express.Router();

// database connection start
const mongoString = process.env.DATABASE_URL;
mongoose.connect(mongoString);
const database = mongoose.connection

database.on('error', (error) => {
    console.log(error)
});

database.once('connected', () => {
    console.log('Database Connected');
});
//database connection end


// import models
const User = require('./models/userModel');

// crud operation here
  async function createUser(req, res){
    const blog = await User.create(req.body);
    res.json({ data: blog, status: "success" });
  }
  async function getUser(req, res){
    const blog = await User.find();
    res.json({ data: blog, status: "success" });
  }
  async function updateUser(req, res){
    const blog = await User.findByIdAndUpdate(req.params.id, req.body);
    res.json({data: blog, status: "success" });
  }
  async function deleteUser(req, res){
    if(req.params && req.params.id){
        const blog = await User.deleteOne({_id:req.params.id});
        res.json({ data: blog, status: "success" });
    } else {
        res.json({ status: "error" });
    }
  }
// end crud

router.route("/").get(getUser).post(createUser);
router.route("/:id").get(getUser).put(updateUser).delete(deleteUser);

const app = express();

app.use(express.json());
app.use(router);

// Body-parser middleware
app.use(bodyparser.urlencoded({ extended: true }))
app.use(bodyparser.json())

app.listen(3001, () => {
    console.log(`Server Started at ${3001}`)
})