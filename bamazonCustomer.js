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
    connection.end();
});

function displayStock() {
    connection.query(`SELECT * FROM products`, function(err, response){
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

            console.log(`====
${product}
====
${quantity}
====`);
        })
}