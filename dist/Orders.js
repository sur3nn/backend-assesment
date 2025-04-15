"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Orders = void 0;
const typeorm_1 = require("typeorm");
let Orders = class Orders {
};
exports.Orders = Orders;
__decorate([
    (0, typeorm_1.Column)("int", { primary: true, name: "OrderID" }),
    __metadata("design:type", Object)
], Orders.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "CustomerID", nullable: true, length: 10 }),
    __metadata("design:type", Object)
], Orders.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Region", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Orders.prototype, "region", void 0);
__decorate([
    (0, typeorm_1.Column)("date", { name: "DateOfSale", nullable: true }),
    __metadata("design:type", Object)
], Orders.prototype, "dateOfSale", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "PaymentMethod", nullable: true, length: 50 }),
    __metadata("design:type", Object)
], Orders.prototype, "paymentMethod", void 0);
exports.Orders = Orders = __decorate([
    (0, typeorm_1.Entity)("orders", { schema: "sample" })
], Orders);
