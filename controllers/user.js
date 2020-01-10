// require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const Model = require("../models");
// const Category = Model.category;
// const Event = Model.event;
// const Favorite = Model.favorite;
// const Payment = Model.payment;
// const Profile = Model.profile;
const User = Model.User;
const saltRound = 10; //process.env.SALT_ROUND;
const secretKey = "hexagon"; //process.env.SECRET_KEY;

exports.register = (req, res) => {
  let message = "";
  const { name,handphone,address,email,image,username,password} = req.body;

  User.findAll({
    where: {
      username
    }
  })
    .then(data => {
      if (data.length > 0) {
        message = "Username has been taken";
        res.status(200).json({ message });
      } else {
        User.findAll({
          where: {
            email
          }
        })
          .then(data => {
            if (data.length > 0) {
              message = "Email has been registered";
              res.status(200).json({ message });
            } else {
              bcrypt.genSalt(saltRound, (err, salt) => {
                if (err) {
                  message = "Server response error";
                  res.status(500).json({ message });
                } else {
                  bcrypt.hash(password, salt, (err, hash) => {
                    if (err) {
                      message = "Server response error";
                      res.status(500).json({ message });
                    } else {
                      User.create({
                        name: name,
                        handphone:handphone,
                        address:address,
                        email: email,
                        image:image,
                        username: username,
                        password: hash
                      })
                        .then(user => {
                          if (user) {
                            message = "Success";
                            const token = jwt.sign({ id: user.id }, secretKey);
                            res.status(200).json({ message, token });
                          } else {
                            message = "Bad request";
                            res.status(400).json({ message });
                          }
                        })
                        .catch(error => {
                          message = "Server response error bray";
                          res.status(500).json({ message });
                        });
                    }
                  });
                }
              });
            }
          })
          .catch(error => {
            message = "Bad request";
            res.status(400).json({ message });
          });
      }
    })
    .catch(error => {
      message = "Server response error";
      res.status(500).json({ message });
    });
};

exports.login = (req, res) => {
  let message = "";
  const { username, password } = req.body;

  User.findOne({
    attributes: {
      exclude: ["createdAt", "updatedAt"]
    },
    where: {
      username: username
    }
  })
    .then(user => {
      if (user) {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) {
            message = "Bad request";
            res.status(400).json({ message });
          } else if (!isMatch) {
            message = "Password doesn't match";
            res.status(200).json({ message });
          } else {
            message = "Success";
            const token = jwt.sign({ id: user.id }, secretKey);
            res.status(200).json({ message, token });
          }
        });
      } else {
        message = "Wrong username!";
        res.status(200).json({ message });
      }
    })
    .catch(error => {
      message = "Server response error";
      res.status(500).json({ message });
    });
};

exports.index = (req, res) => {
    User.findAll({}).then(data => {
        if (data.length > 0) {
            res.status(200).json(data);
        } else {
            res.status(200).json({
                message: "users not found!"
            });
        }
    });
};

exports.detail = (req, res) => {
    let message = "";
    let user_id = req.user_id;
  
    User.findOne({
      attributes: {
        exclude: ["password", "createdAt", "updatedAt"]
      },
      where: {
        id: user_id
      }
    })
      .then(data => {
        res.status(200).json(data);
      })
      .catch(error => {
        message = "Bad request";
        res.status(400).json({ message });
      });
  };


exports.update =(req,res) => {
  User.findOne ({
    where:{
      id: parseInt(req.body.id),
    },
  })
  .then(data =>{
    if(data.id != req.user.id){
      res.status(403).json({
        message: 'you are not authorized for this action',
      });
    } else {
      const{name,address,email,image} = req.body;
      User.update (
        {
          name:name,
          address:address,
          email:email,
          image:image
        },
        {
          where:{
            id:req.body.id,
          },
        }
      )
      .then (status => {
        if(status === 0){
          res.status(500).json({
            status:'failed',
            message:'update failed',
          });
        } else {
          res.status(200).json ({
            status:'success',
            message:'update user is succes',
          });
        }
      });
    }
  });
};