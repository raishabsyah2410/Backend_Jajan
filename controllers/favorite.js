const models = require("../models");
const Product = models.Product;
const User = models.User;
const Favorite = models.Favorite;

exports.createFav = (req, res) =>{
    Product.findOne({
        where:{
            id:req.body.id
        }
    })
    .then(data =>{
        Favorite.create({
            user_Id:req.user_id,
            product_Id: data.id
        })
        .then(datada =>{
            res.send(datada)
        })
    })
}