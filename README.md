# Store API

### Technology Stack:
  * #### Node.js/Express.js
  * #### MongoDB/Mongoose
  * #### JWT
  * #### Jest
  * #### Webpack

### Endpoints:
* __`/auth`__ Endpoints for authorization
  * __`POST`__ `/auth/login` Login an employee

* __`/staff`__ Endpoints for creating and reading employees
  * __`POST`__ `/staff` Register an employee
  * __`GET`__ `/staff` Get all employees

* __`/customers`__ Endpoints for creating and reading clients
  * __`POST`__ `/customers` Create new customer
  * __`GET`__ `/customers` Get all clients

* __`/customers/:hash`__ Endpoints for creating, reading and updating clients by hash
  * __`GET`__ `/customers/{hash}` Get a client by hash
  * __`PUT`__ `/customers/{hash}` Update client by hash
  * __`DELETE`__ `/customers/{hash}` Remove client by hash

* __`/products`__ Endpoints for creating and reading products
  * __`POST`__ `/products` Create a new product
  * __`GET`__ `/products` Get all products

* __`/products/:hash`__ Endpoints for creating, reading and updating products by hash
  * __`GET`__ `/products/{hash}` Get a product by hash
  * __`PUT`__ `/products/{hash}` Update a product by hash
  * __`DELETE`__ `/products/{hash}` Remove a product by hash

* __`/orders`__ Endpoints for creating and reading orders
  * __`POST`__ `/orders` Create a new order
  * __`GET`__ `/orders` Get all orders

* __`/orders/:hash`__ Endpoints for creating, reading and updating orders by hash
  * __`GET`__ `/orders/{hash}` Get an order by hash
  * __`PUT`__ `/orders/{hash}` Update order by hash
  * __`DELETE`__ `/orders/{hash}` Delete order by hash
