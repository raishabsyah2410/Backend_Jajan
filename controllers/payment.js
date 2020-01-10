const models = require("../models");
const Product = models.Product;
const User = models.User;
const Payment = models.Payment;

exports.create = (req,res) => {
    Product.findOne({
        where:{
            id:req.body.id
        }
    })
    .then(data => {
        Payment.create({
          quantity:req.body.quantity,
          totalHarga: req.body.quantity * data.harga,
          status: "Unpaid",
          image:"bon",
          buyer_Id: req.user_id,
          product_Id: data.id
        })
        .then(thatlah =>{
            res.status(200).json({
                msg:"making data",
                data:thatlah
            })
        })
    })
    .catch(error =>{
        res.status(500).json({
            message:"Internal Server error",
            error:error
        })
    })
}

exports.update = (req,res) =>{
    Payment.findOne({
        where:{
            id:req.params.id
        }
    })
    .then(data =>{
        Payment.update(
            {
            status:"pending",           
            },
            {
              where:{
                  id:req.params.id
              }  
            }
            )
        .then(change =>{
            res.status(200).json({
                message:"succes update",
                data:change
            })
        })
    })
}

exports.finish = (req,res) =>{
    Payment.findOne({
        where:{
            id:req.params.id
        }
    })
    .then(data =>{
        Payment.update(
            {
            status:"selesai",           
            },
            {
              where:{
                  id:req.params.id
              }  
            }
            )
        .then(change =>{
            res.status(200).json({
                message:"succes update",
                data:change
            })
        })
    })
}