var mysql = require("mysql");
var cTable = require("console.table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "root123",
    database: "bamazonDB"
});

connection.connect(function(err) {
    if (err) throw err;
    console.log(`connected as id: # ${connection.threadId}`);
    displayStock();
});

function displayStock() {
    var selectProducts = `SELECT * FROM products`;
    connection.query(selectProducts, function(err, response){
        if (err) throw err;
        console.table(response);   
        pickProduct();    
    });
}

function pickProduct() {
    inquirer
        .prompt([
        {
            name: "product",
            type: "input",
            message: "What is the item_id you are looking for today?"
        },
        {
            name: "quantity",
            type: "input",
            message: "How much of this item would you like to purchase?"
        }
        ])
        .then(function(answer){

            var product = answer.product;
            var quantity = answer.quantity;
            var totalCost;
            var updateQty; 

            var queryProducts = "SELECT * FROM products WHERE ?";

            connection.query(queryProducts, {item_id: product}, function(err, response) {
                if (err) throw err;
                console.log(response[0]);

                if (quantity > response[0].stock_quantity) {
                    console.log(`Sorry, we do not have enough in stock to fulfill your order.`);
                } 
                else {
                    totalCost = quantity * response[0].price;
                    updateQty = response[0].stock_quantity - quantity;
                    console.log(`========\n
You would like to purchase ${quantity} units of "${response[0].product_name}". \n
The total cost of your order will be: $${totalCost} \n
========\n`);
                }

            var updateProducts = "UPDATE products SET ? WHERE ?";

            connection.query(updateProducts, [ {stock_quantity: updateQty},{item_id: product} ], function(err, response){
                if (err) throw err;
                console.log(`The Inventory has been updated after your most recent purchase.`);
                inquirer
                .prompt({
                    name: "continue",
                    type: "input",
                    message: "Would you like to place another order?"
                })
                .then(function(answer){
                    if (answer.continue.toLowerCase() === "yes"){
                        displayStock();
                    } else {    
                    connection.end();
                    }
                });
            })
        })
    })
}  