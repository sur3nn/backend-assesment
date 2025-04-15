"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const express_1 = __importDefault(require("express"));
const multer_1 = __importDefault(require("multer"));
const csv_parser_1 = __importDefault(require("csv-parser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const typeorm_1 = require("./typeorm");
const cron = require("node-cron");
const app = (0, express_1.default)();
app.use(express_1.default.json());
const upload = (0, multer_1.default)({ dest: "uploads/" });
typeorm_1.AppDataSource.initialize().then(() => {
    console.log("Data Source has been initialized");
});
const winston = require('winston');
const logger = winston.createLogger({
    level: 'info',
    format: winston.format.combine(winston.format.timestamp(), winston.format.printf(({ timestamp, level, message }) => {
        return `${timestamp} [${level}]: ${message}`;
    })),
    transports: [
        new winston.transports.Console(),
        new winston.transports.File({ filename: 'data-refresh.log' }),
    ],
});
module.exports = logger;
app.post("/api/upload", upload.single("file"), async (req, res) => {
    let filePath = path_1.default.join(req.file.destination, req.file.filename);
    processCSVData(filePath);
});
const processCSVData = async (filePath) => {
    const customersMap = new Map();
    const productsMap = new Map();
    const ordersMap = new Map();
    const orderItems = [];
    fs_1.default.createReadStream(filePath)
        .pipe((0, csv_parser_1.default)())
        .on("data", (row) => {
        const customerId = row["Customer ID"];
        if (!customersMap.has(customerId)) {
            customersMap.set(customerId, [
                customerId,
                row["Customer Name"],
                row["Customer Email"],
                row["Customer Address"],
            ]);
        }
        const productId = row["Product ID"];
        if (!productsMap.has(productId)) {
            productsMap.set(productId, [
                productId,
                row["Product Name"],
                row["Category"],
                parseFloat(row["Unit Price"]),
            ]);
        }
        const orderId = row["Order ID"];
        if (!ordersMap.has(orderId)) {
            ordersMap.set(orderId, [
                parseInt(orderId),
                customerId,
                row["Region"],
                row["Date of Sale"],
                row["Payment Method"],
            ]);
        }
        orderItems.push([
            parseInt(orderId),
            productId,
            parseInt(row["Quantity Sold"]),
            parseFloat(row["Discount"]),
            parseFloat(row["Shipping Cost"]),
        ]);
    })
        .on("end", async () => {
        const queryRunner = typeorm_1.AppDataSource.createQueryRunner();
        await queryRunner.connect();
        try {
            // Customers
            for (const customer of customersMap.values()) {
                await queryRunner.query(`INSERT INTO customers (CustomerID, Name, Email, Address)
           SELECT * FROM (SELECT ? AS CustomerID, ? AS Name, ? AS Email, ? AS Address) AS tmp
           WHERE NOT EXISTS (
             SELECT CustomerID FROM customers WHERE CustomerID = ?
           )`, [...customer, customer[0]]);
            }
            // Products
            for (const product of productsMap.values()) {
                await queryRunner.query(`INSERT INTO products (ProductID, ProductName, Category, UnitPrice)
           SELECT * FROM (SELECT ? AS ProductID, ? AS ProductName, ? AS Category, ? AS UnitPrice) AS tmp
           WHERE NOT EXISTS (
             SELECT ProductID FROM products WHERE ProductID = ?
           )`, [...product, product[0]]);
            }
            // Orders
            for (const order of ordersMap.values()) {
                await queryRunner.query(`INSERT INTO orders (OrderID, CustomerID, Region, DateOfSale, PaymentMethod)
           SELECT * FROM (SELECT ? AS OrderID, ? AS CustomerID, ? AS Region, ? AS DateOfSale, ? AS PaymentMethod) AS tmp
           WHERE NOT EXISTS (
             SELECT OrderID FROM orders WHERE OrderID = ?
           )`, [...order, order[0]]);
            }
            // OrderItems 
            for (const item of orderItems) {
                await queryRunner.query(`INSERT INTO orderitems (OrderID, ProductID, QuantitySold, Discount, ShippingCost)
           VALUES (?, ?, ?, ?, ?)`, item);
            }
            logger.error("Failed to refresh data: ");
        }
        catch (err) {
            throw err;
        }
    });
};
//Total Revenue
app.post("/api/total", async (req, res) => {
    const { startDate, endDate } = req.body;
    const result = await typeorm_1.AppDataSource.query(`
    SELECT 
      SUM(p.UnitPrice * oi.QuantitySold - oi.Discount + oi.ShippingCost) AS totalRevenue
    FROM orderitems oi
    JOIN orders o ON o.OrderID = oi.OrderID
    JOIN products p ON p.ProductID = oi.ProductID
    WHERE o.DateOfSale BETWEEN ? AND ?
  `, [startDate, endDate]);
    res.json(result[0]);
});
//Revenue by Category
app.post("/api/by-category", async (req, res) => {
    const { startDate, endDate } = req.body;
    const result = await typeorm_1.AppDataSource.query(`
  SELECT 
    p.Category,
    SUM(p.UnitPrice * oi.QuantitySold - oi.Discount + oi.ShippingCost) AS revenue
  FROM orderitems oi
  JOIN orders o ON o.OrderID = oi.OrderID
  JOIN products p ON p.ProductID = oi.ProductID
  WHERE o.DateOfSale BETWEEN ? AND ?
  GROUP BY p.Category
`, [startDate, endDate]);
    res.json(result);
});
//Revenue by Region
app.post("/api/by-region", async (req, res) => {
    const { startDate, endDate } = req.body;
    const result = await typeorm_1.AppDataSource.query(`
  SELECT 
    o.Region,
    SUM(p.UnitPrice * oi.QuantitySold - oi.Discount + oi.ShippingCost) AS revenue
  FROM orderitems oi
  JOIN orders o ON o.OrderID = oi.OrderID
  JOIN products p ON p.ProductID = oi.ProductID
  WHERE o.DateOfSale BETWEEN ? AND ?
  GROUP BY o.Region
`, [startDate, endDate]);
    res.json(result);
});
cron.schedule("0 0 * * *", async () => {
    const filePath = path_1.default.join(__dirname, 'uploads');
    try {
        await processCSVData(filePath);
    }
    catch (err) {
        logger.error("Failed to refresh data: " + err.message);
    }
});
app.listen(3000, () => {
    console.log("Server is running on http://localhost:3000");
});
