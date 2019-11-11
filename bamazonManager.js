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

connection.connect(function (err) {
    if (err) throw err;
    console.log(`connected as id: # ${connection.threadId}`);
    start();
});

function start() {
    inquirer
        .prompt({
            name: "managerAction",
            type: "list",
            message: "Would you like to view products for sale, view low inventory, add to Inventory, or add a new product?",
            choices: ["View Inventory", "View Low Inventory", "Add Product Quantity", "Add a New Product"]
        })
        .then(function (answer) {
            switch (answer.managerAction) {
                case "View Inventory":
                    displayStock();
                    break;
                case "View Low Inventory":
                    displayLow();
                    break;
                case "Add Product Quantity":
                    addProductQty();
                    break;
                case "Add a New Product":
                    addProduct();
                    break;
                default:
                    connection.end();
            }
        })
}

function displayStock() {
    var selectProducts = `SELECT * FROM products`;
    connection.query(selectProducts, function (err, response) {
        if (err) throw err;
        console.table(response);
        connection.end();
    });
}

function displayLow() {
    var selectLowProducts = `SELECT * FROM products WHERE stock_quantity <= 100`;
    connection.query(selectLowProducts, function (err, response) {
        if (err) throw err;
        console.table(response);
        connection.end();
    })
}

function addProductQty() {
    var selectProducts = `SELECT * FROM products WHERE stock_quantity <= 100`;
    connection.query(selectProducts, function (err, response) {
        if (err) throw err;
        console.table(response);
        inquirer
            .prompt([
                {
                    name: "choice",
                    type: "input",
                    message: "What is the ID of the item you would like to update?"
                },
                {
                    name: "quantity",
                    type: "input",
                    message: "How much of this item would you like to add to the inventory?"
                }
            ]).then(function (answer) {
                var choice = answer.choice;
                var quantity = answer.quantity;
                var updateQty;

                var selectID = `SELECT * FROM products WHERE ?`;
                connection.query(selectID, [{ item_id: choice }], function (err, response) {
                    if (err) throw err;
                    updateQty = (response[0].stock_quantity + parseInt(quantity));

                    var updateProducts = `UPDATE products SET stock_quantity = ? WHERE item_id = ?`;
                    connection.query(updateProducts, [updateQty, choice], function (err, response) {
                        if (err) throw err;
                        console.log(`\nThe inventory has been updated\n`);

                        var selectID = `SELECT * FROM products WHERE ?`;
                        connection.query(selectID, [{ item_id: choice }], function (err, response) {
                            if (err) throw err;
                            console.table(response);
                            connection.end();
                        })
                    })
                })
            })
    });
}

function addProduct() {
    inquirer
        .prompt([
            {
                name: "productName",
                type: "input",
                message: "What is the name of the item you would like to add to the inventory?"
            },
            {
                name: "departmentName",
                type: "input",
                message: "What department does this item belong to?"
            },
            {
                name: "productPrice",
                type: "input",
                message: "What is the price of this item?"
            },
            {
                name: "productQty",
                type: "input",
                message: "How much of this item are you adding to the inventory?"
            }
        ]).then(function(answer){
            var product = answer.productName;
            var department = answer.departmentName;
            var price = answer.productPrice;
            var quantity = answer.productQty;

            var addProductInv = "INSERT INTO products (product_name, department_name, price, stock_quantity) VALUES (?, ?, ?, ?)";
            connection.query(addProductInv, [product, department, price, quantity], function(err, response){
                if (err) throw err;
                console.log(`Success! ${product} has been added to the inventory list!`);
                connection.end();
            })
        })
}