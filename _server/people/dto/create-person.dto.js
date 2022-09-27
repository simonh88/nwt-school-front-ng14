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
exports.CreatePersonDto = void 0;
const person_address_dto_1 = require("./person-address.dto");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
const swagger_1 = require("@nestjs/swagger");
class CreatePersonDto {
}
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'firstname',
        description: 'Firstname',
        example: 'Mclaughlin',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "firstname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'lastname',
        description: 'Lastname',
        example: 'Cochran',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "lastname", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'entity',
        description: 'Entity where person works',
        example: 'UTARA',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "entity", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'email',
        description: 'Email',
        example: 'Mclaughlin.Cochran@undefined.com',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'phone',
        description: 'Phone',
        example: '+33600000000',
        pattern: '/^(+d{11})$/',
    }),
    (0, class_validator_1.IsPhoneNumber)('FR'),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ name: 'address', description: 'Address' }),
    (0, class_validator_1.IsInstance)(person_address_dto_1.PersonAddressDto),
    (0, class_validator_1.ValidateNested)(),
    (0, class_transformer_1.Type)(() => person_address_dto_1.PersonAddressDto),
    __metadata("design:type", person_address_dto_1.PersonAddressDto)
], CreatePersonDto.prototype, "address", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        name: 'isManager',
        description: 'Flag to know if this person is a manager',
        example: false,
    }),
    (0, class_validator_1.IsBoolean)(),
    __metadata("design:type", Boolean)
], CreatePersonDto.prototype, "isManager", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        name: 'manager',
        description: 'Name of the manager',
        example: 'Mclaughlin',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "manager", void 0);
__decorate([
    (0, swagger_1.ApiPropertyOptional)({
        name: 'managerId',
        description: 'Unique identifier of the manager',
        example: '5763cd4dc378a38ecd387737',
    }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsNotEmpty)(),
    __metadata("design:type", String)
], CreatePersonDto.prototype, "managerId", void 0);
exports.CreatePersonDto = CreatePersonDto;
