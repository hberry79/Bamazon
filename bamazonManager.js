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
    openMenu();
});

function openMenu(){
	inquirer.prompt([{
		type: "list",
		name: "transactionType",
		message: "What type of transaction would you like to do?",
		choices: ["View Products for Sale", "View Low Inventory", "Add to Inventory", "Add New Product"]
	}]).then(function(type){
		switch (type.transactionType){

			case "View Products for Sale":
				viewProducts();
				break;
			 //=========================================
			case "View Low Inventory":
				lowInventory();
				break;
			 //=========================================
			case "Add to Inventory":
				addInventory();
				break;
			 //=========================================
			case "Add New Product":
				addNewProduct();
				break;
			 //=========================================
		}//end of case switch
	})//end of callback
}//end of openMenu

//=========================================
//fuctions defined
//=========================================

function viewProducts(){
	connection.query("SELECT item_id, product_name, price, stock_quantity FROM products", 
		function(err, res) {
			if (err) throw err;
			for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
	});//end of query
}//end viewProducts

function lowInventory(){
	connection.query("SELECT item_id, product_name, price, stock_quantity FROM products where stock_quantity < 5", 
		function(err, res) {
			if (err) throw err;
			for (var i = 0; i < res.length; i++) {
            console.log(res[i].item_id + " | " + res[i].product_name + " | " + res[i].price + " | " + res[i].stock_quantity);
        }
	});//end of query
}//end lowInventory

function addInventory(){
	inquirer.prompt([{
        type: "input",
        name: "restock",
        message: "What is the ID of the dress you would like to restock?",
    }]).then(function(product) {
        var productID = restock.productID;
        inquirer.prompt([{
            type: "input",
            name: "stockQuantity",
            message: "How many you would like to stock?",
        }]).then(function(quantity) {
            poductQuantity = quantity.stockQuantity
            addStock(productID, poductQuantity);
        }); //end of inquirer.prompt
    }); //end of inquirer.prompt
}//end addInventory

function addStock(productID, poductQuantity){
	//now I need to get the current stock of that item and add the new stock to that
    connection.query("UPDATE products SET ? WHERE ?", [{
        stock_quantity: poductQuantity
    }, {
        item_id: productID
    }], function(err, res) {
        if (err) throw err;
        
        }
   
}//end of addStock

function addNewProduct(){
	//ask what product they want to stock
	//ask how many they are stocking
	//run query to update stock
}//end addNewProduct