const models = require("../models");
const Category = models.Category;
const Product = models.Product;
const User = models.User;


exports.index = (req, res) => {
  Category.findAll({}).then(data => {
    if (data.length > 0) {
      res.status(200).json(data);
    } else {
      res.status(200).json({
        message: "categories not found!"
      });
    }
  });
};

exports.post = (req, res) => {
  const { name, image } = req.body;
  console.log(req.body);

  Category
    .create({
      name: name,
      image: image
    })
    .then(data => {
      res.status(200).json(data);
    });
};

exports.catProduct = (req, res) => {
  Product.findAll({
    where: {
      category_Id: req.params.category_Id
    },
    include: [
      {
        model: Category, as: "Category"
      }]
  })
    .then(data => {
      res.send(data)
    })
}

exports.delete = (req, res) => {
  Category.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      Category.destroy(
        {
          where: {
            id: req.params.id
          }
        }
      )
      .then(empty =>{
        res.status(200).json({
          message:"succes Delete"
        })
      })
    })
}