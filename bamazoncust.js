var mysql = require("mysql");
var inquirer = require("inquirer");
var currentStock = 0;

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,

    user: "root",

    password: "123321",
    database: "bamazon"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId);
    openShop();
});

function openShop() {
    connection.query("SELECT * FROM products where stock_quantity > 0", function(err, res) {
        if (err) throw err;
        console.log("-----------------------------------");
        console.log("Welcome to Heather's Haute Dress House");
        console.log("-----------------------------------");
        for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].department_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
        console.log("-----------------------------------");
        takeOrder();
    });
}; //endof openShop

function takeOrder() {
    inquirer.prompt([{
        type: "input",
        name: "productID",
        message: "What is the ID of the dress you would like to purchase?",
    }]).then(function(product) {
        var productID = product.productID;
        inquirer.prompt([{
            type: "input",
            name: "guestQuantity",
            message: "How many you would like to purchase?",
        }]).then(function(quantity) {
            poductQuantity = quantity.guestQuantity
            checkStock(productID, poductQuantity);
        }); //end of inquirer.prompt
    }); //end of inquirer.prompt
}; //end of takeOrder

function checkStock(productID, poductQuantity) {
    connection.query('SELECT stock_quantity FROM products WHERE item_id=?', [productID], function(err, res) {
        if (err) throw err;
        currentStock = res[0].stock_quantity;
        if (currentStock < poductQuantity) {
            console.log('Insufficient quantity!');
        } else {
            var newStock = currentStock - poductQuantity;
            fufillOrder(productID, newStock, poductQuantity);
        }
    });
} //end of checkStock

function fufillOrder(productID, newStock, poductQuantity) {
    connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: newStock
    }, {
        item_id: productID
    }], function(err, res) {
        if (err) throw err;
        connection.query('SELECT price FROM products WHERE item_id=?', [productID], function(err, res) {
            if (err) throw err;
            itemPrice = res[0].price;
            var orderTotal = itemPrice * poductQuantity
            console.log("Your total due is $" + orderTotal + ". Thank you for shopping at Heather's Haute Dress House.");
            connection.end(function(err) {
            if (err) {
                throw err;
            }
        })
        });
    });

} //end of fufillOrder
