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
exports.PersonEntity = void 0;
const class_transformer_1 = require("class-transformer");
const person_address_entity_1 = require("./person-address.entity");
const swagger_1 = require("@nestjs/swagger");
let PersonEntity = class PersonEntity {
    constructor(partial) {
        Object.assign(this, partial);
    }
};
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'id', description: 'Unique identifier in the database', example: '5763cd4dc378a38ecd387737' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PersonEntity.prototype, "id", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'photo', description: 'Photo URL', example: 'https://randomuser.me/portraits/men/55.jpg' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PersonEntity.prototype, "photo", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'firstname', description: 'Firstname', example: 'Mclaughlin' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PersonEntity.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'lastname', description: 'Lastname', example: 'Cochran' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PersonEntity.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'entity', description: 'Entity where person works', example: 'UTARA' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PersonEntity.prototype, "entity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'birthDate', description: 'Birthdate in timestamp format', example: '101343600000' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Number),
    __metadata("design:type", Number)
], PersonEntity.prototype, "birthDate", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'email', description: 'Email', example: 'Mclaughlin.Cochran@undefined.com' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PersonEntity.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'phone', description: 'Phone', example: '+33600000000', pattern: '/^(\+\d{11})$/' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PersonEntity.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'address', description: 'Address' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => person_address_entity_1.PersonAddressEntity),
    __metadata("design:type", person_address_entity_1.PersonAddressEntity)
], PersonEntity.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'isManager', description: 'Flag to know if this person is a manager', example: false }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => Boolean),
    __metadata("design:type", Boolean)
], PersonEntity.prototype, "isManager", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({ name: 'manager', description: 'Name of the manager', example: 'Mclaughlin' }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PersonEntity.prototype, "manager", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        name: 'managerId',
        description: 'Unique identifier of the manager',
        example: '5763cd4dc378a38ecd387737',
    }),
    (0, class_transformer_1.Expose)(),
    (0, class_transformer_1.Type)(() => String),
    __metadata("design:type", String)
], PersonEntity.prototype, "managerId", void 0);
PersonEntity = __decorate([
    (0, class_transformer_1.Exclude)(),
    __metadata("design:paramtypes", [Object])
], PersonEntity);
exports.PersonEntity = PersonEntity;
