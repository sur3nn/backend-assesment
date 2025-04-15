"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Customers_1 = require("./entity/entities/Customers");
const Products_1 = require("./entity/entities/Products");
const Orders_1 = require("./entity/entities/Orders");
const Orderitems_1 = require("./entity/entities/Orderitems");
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    database: 'sample',
    username: 'root',
    password: 'root',
    synchronize: false,
    logging: false,
    entities: [Customers_1.Customers, Products_1.Products, Orders_1.Orders, Orderitems_1.Orderitems]
});
