# Bamazon
Bamazon is a simple e-commerce application using a server to persist inventory imnformation.

## Bamazon Customer Module
To shop bamazon as a customer, first run the customer application.

The application, will then ask you for the ID of the item you would like to purchase. Then it will ask you for the quantity you would like to purchase. 

Once the query is satisfied, bamazon will show you your order and the total price of your order.

This module will also update the database to show that you have purchased the quantity of the item that you wanted.

To run this application in the terminal:
`node bamazonCustomer.js`

Example:
[bamazon-customer-example](/assets/images/bamazonCustomerExample.png)


## Bamazon Manager Module
If you would like access Bamazon as a manager, run the manager application.

This application will prompt you to see if you would like to view all inventory, view low inventory, add product quantity, or add a new product.

When you access the view inventory, the application will display inventory of all the items and their quantity. Likewise, the view low inventory will display all the inventory items that are running low.

When you access the product quantity function, it will prompt you to select the item that you would like to update the quantity on.

When you access the add a new product function, bamazon will then prompt you to add a new product with all the specifics. Once you specify all the inputs, bamazon will then add the new product to the database and be available to purchase.

To run the manager application for bamazon in the terminal:
`node bamazonManager.js`

Example:
[bamazon-manager-example1](/assets/images/bamazonManagerExample1.png)
[bamazon-manager-example2](/assets/images/bamazonManagerExample2.png)

### Technologies Used

* JavaScript
* Node.js
* MySQL
* Inquirer node packet
* Console.table node packet
