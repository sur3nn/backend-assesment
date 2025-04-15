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
exports.Customers = void 0;
const typeorm_1 = require("typeorm");
let Customers = class Customers {
};
exports.Customers = Customers;
__decorate([
    (0, typeorm_1.Column)("varchar", { primary: true, name: "CustomerID", length: 10 }),
    __metadata("design:type", String)
], Customers.prototype, "customerId", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Name", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Customers.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)("varchar", { name: "Email", nullable: true, length: 100 }),
    __metadata("design:type", String)
], Customers.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)("text", { name: "Address", nullable: true }),
    __metadata("design:type", String)
], Customers.prototype, "address", void 0);
exports.Customers = Customers = __decorate([
    (0, typeorm_1.Entity)("customers", { schema: "sample" })
], Customers);
