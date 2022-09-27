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
exports.PersonAddressEntity = void 0;
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
let PersonAddressEntity = class PersonAddressEntity {
};
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'street', description: 'Street', example: 'Jewel Street' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PersonAddressEntity.prototype, "street", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'postalCode', description: 'Postal code', example: '61400' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PersonAddressEntity.prototype, "postalCode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'city', description: 'City', example: 'Snelling' }),
    (0, class_transformer_1.Expose)(),
    __metadata("design:type", String)
], PersonAddressEntity.prototype, "city", void 0);
PersonAddressEntity = __decorate([
    (0, class_transformer_1.Exclude)()
], PersonAddressEntity);
exports.PersonAddressEntity = PersonAddressEntity;
