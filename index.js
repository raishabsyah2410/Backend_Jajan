require("express-group-routes");
const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json())

const {auth} = require ("./middleware");

const categoryController = require('./controllers/category');
const paymentController = require('./controllers/payment');
const productController = require('./controllers/product');
const userController = require('./controllers/user');
const favoriteContoller = require('./controllers/favorite');


app.get("/", (req, res) => {
    res.send("apa Ko Kimak");
});

app.group("/api/v1", router => {
    
    //Category
    router.post("/category", categoryController.post);
    router.get("/categories", categoryController.index);
    router.get("/category/:category_Id/products",categoryController.catProduct);
    router.delete("/category/:id",categoryController.delete);

    //Payment
    router.post("/order",auth,paymentController.create);
    router.put("/order/:id",paymentController.update);
    router.put("/orders/:id",paymentController.finish);

    //Product
    // router.get("/productDetail",productController.proDetail);
    router.post("/product",auth,productController.post);
    router.get("/products",productController.index);
    router.get("/product/:id",productController.detail);
    router.delete("/product/:id",productController.delete);

    //Users
    router.post("/login", userController.login);
    router.post("/register",userController.register);
    router.get("/users",userController.index);
    router.get("/profile",auth,userController.detail);
    router.patch("/profile",auth,userController.update);

    //favorite
    router.post("/favorite",auth, favoriteContoller.createFav);
});


app.listen(port, () => console.log(`Listenig on port ${port}!`));