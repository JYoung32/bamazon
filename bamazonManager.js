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
    start();
});

function start() {
    inquirer
    .prompt({
        name: "managerAction",
        type: "list",
        message: "Would you like to [view products] for sale, [view low] Inventory, [add] to Inventory, [add new] Product?",
        choices: ["view products", "view low", "add", "add new"]
    }).then(function(answer){
        switch(answer.managerAction) {
            case "view products":
                displayStock();
                break;
            case "view low":
                displayLow();
                break;
            case "add":
                break;
            case "add new":
                break;
            default:
                connection.end();
        }
    })
}

function displayStock() {
    var selectProducts = `SELECT * FROM products`;
    connection.query(selectProducts, function(err, response){
        if (err) throw err;
        console.table(response);   
        connection.end();    
    });
}

function displayLow() {
    var selectLowProducts = `SELECT * FROM products WHERE stock_quantity <= 100`;
    connection.query(selectLowProducts, function(err, response){
        if (err) throw err;
        console.table(response);
        connection.end();
    })
}