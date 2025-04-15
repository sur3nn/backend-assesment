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
exports.Orderitems = void 0;
const typeorm_1 = require("typeorm");
let Orderitems = class Orderitems {
};
exports.Orderitems = Orderitems;
__decorate([
    (0, typeorm_1.Column)("int", { primary: true, name: "OrderID" }),
    __metadata("design:type", Number)
], Orderitems.prototype, "orderId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { primary: true, name: "ProductID", length: 10 }),
    __metadata("design:type", String)
], Orderitems.prototype, "productId", void 0);
__decorate([
    (0, typeorm_1.Column)("int", { name: "QuantitySold", nullable: true }),
    __metadata("design:type", Number)
], Orderitems.prototype, "quantitySold", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "Discount",
        nullable: true,
        precision: 4,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Orderitems.prototype, "discount", void 0);
__decorate([
    (0, typeorm_1.Column)("decimal", {
        name: "ShippingCost",
        nullable: true,
        precision: 10,
        scale: 2,
    }),
    __metadata("design:type", Number)
], Orderitems.prototype, "shippingCost", void 0);
exports.Orderitems = Orderitems = __decorate([
    (0, typeorm_1.Index)("ProductID", ["productId"], {}),
    (0, typeorm_1.Entity)("orderitems", { schema: "sample" })
], Orderitems);
