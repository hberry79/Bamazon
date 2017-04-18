var mysql = require("mysql");
var inquirer = require("inquirer");

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
    connection.query("SELECT * FROM products", function(err, res) {
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
    // The app should then prompt users with two messages.
    // The first should ask them the ID of the product they would like to buy.
    // The second message should ask how many units of the product they would like to buy.

    inquirer.prompt([{
        type: "input",
        name: "productID",
        message: "What is the ID of the dress you would like to purchase?",
    }]).then(function(product) {
        console.log(product.productID);
	        inquirer.prompt([{
	            type: "input",
	            name: "guestQuantity",
	            message: "How many you would like to purchase?",
	        }]).then(function(quantity) {
	            console.log(quantity.guestQuantity);
	        }); //end of inquirer.prompt
    }); //end of inquirer.prompt



}; //end of takeOrder

function fufillOrder() {
    // Once the customer has placed the order, your application should check if your store has enough of the product to meet the customer's request.
    // If not, the app should log a phrase like Insufficient quantity!, and then prevent the order from going through.
    // However, if your store does have enough of the product, you should fulfill the customer's order.
    // This means updating the SQL database to reflect the remaining quantity.
    // Once the update goes through, show the customer the total cost of their purchase.
}; //end of fufillOrder
