const models = require("../models");
const Category = models.Category;
const Product = models.Product;
const User = models.User;

// exports.post = (req, res) => {
//   let storeTitle;
//   const {
//     tittle: tittle,
//     harga,
//     description,
//     image,
//     stock,
//     category_Id,
//     created_By
//   } = req.body;
//   storeTitle = title.trim();
//   events
//     .findAll({
//       where: {
//         title: storeTitle
//       }
//     })
//     .then(eventsData => {
//       if (eventsData.length > 0) {
//         res.status(200).json({
//           message: "title has been used",
//           status: "failed"
//         });
//       } else {
//         events
//           .create({
//             tittle: tittle,
//             harga: harga,
//             description: description,
//             image: image,
//             stock: stock,
//             category_id: category_Id,
//             created_By: req.created_By
//           })
//           .then(data => {
//             Category
//               .findOne({
//                 where: {
//                   id: data.category_id
//                 }
//               })
//               .then(category => {
//                 users
//                   .findOne({
//                     where: {
//                       id: data.createdBy
//                     }
//                   })
//                   .then(user => {
//                     res.status(200).json({
//                       status: "success",
//                       id: data.id,
//                       title: data.title,
//                       category: {
//                         id: category.id,
//                         name: category.name
//                       },
//                       harga: formatRupiah(data.harga),
//                       description: data.description,
//                       address: data.address,
//                       urlMaps: data.urlMap,
//                       img: data.image,
//                       createdBy: {
//                         id: user.id,
//                         name: user.name,
//                         phoneNumber: user.phone,
//                         email: user.email,
//                         img: user.image
//                       }
//                     });
//                   });
//               });
//           });
//       }
//     });
// };

exports.index = (req, res) => {
  Product.findAll({}).then(data => {
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
  const {
    tittle,
    harga,
    description,
    image,
    stock,
    category_Id,
    created_By
  } = req.body;
  console.log(req.body);

  Product.create({
    tittle: tittle,
    harga: harga,
    description: description,
    image: image,
    stock: stock,
    category_Id: category_Id,
    created_By: created_By,
  })
    .then(data => {
      res.status(200).json(data);
    });
};

exports.detail = (req, res) => {
  Product.findAll({
    where: {
      id: req.params.id
    },
    include: [
      {
        model: Category,
        as: "Category"
      },
      {
        model: User,
        as: "User"
      }
    ]
  })
    .then(data => {
      res.send(data)
    })
}

exports.delete = (req, res) => {
  Product.findOne({
    where: {
      id: req.params.id
    }
  })
    .then(data => {
      Product.destroy(
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

