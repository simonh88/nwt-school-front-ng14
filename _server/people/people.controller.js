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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeopleController = void 0;
const common_1 = require("@nestjs/common");
const people_service_1 = require("./people.service");
const rxjs_1 = require("rxjs");
const create_person_dto_1 = require("./dto/create-person.dto");
const update_person_dto_1 = require("./dto/update-person.dto");
const handler_params_1 = require("./validators/handler-params");
const person_entity_1 = require("./entities/person.entity");
const swagger_1 = require("@nestjs/swagger");
const http_interceptor_1 = require("../interceptors/http.interceptor");
let PeopleController = class PeopleController {
    constructor(_peopleService) {
        this._peopleService = _peopleService;
    }
    findAll() {
        return this._peopleService.findAll();
    }
    findRandom() {
        return this._peopleService.findRandom();
    }
    findOne(params) {
        return this._peopleService.findOne(params.id);
    }
    create(createPersonDto) {
        return this._peopleService.create(createPersonDto);
    }
    update(params, updatePersonDto) {
        return this._peopleService.update(params.id, updatePersonDto);
    }
    delete(params) {
        return this._peopleService.delete(params.id);
    }
};
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns an array of person',
        type: person_entity_1.PersonEntity,
        isArray: true,
    }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'No person exists in database' }),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], PeopleController.prototype, "findAll", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns one person randomly',
        type: person_entity_1.PersonEntity,
    }),
    (0, swagger_1.ApiNoContentResponse)({ description: 'No person exists in database' }),
    (0, common_1.Get)('random'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", rxjs_1.Observable)
], PeopleController.prototype, "findRandom", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'Returns the person for the given "id"',
        type: person_entity_1.PersonEntity,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Person with the given "id" doesn\'t exist in the database',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Parameter provided is not good' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique identifier of the person in the database',
        type: String,
        allowEmptyValue: false,
    }),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [handler_params_1.HandlerParams]),
    __metadata("design:returntype", rxjs_1.Observable)
], PeopleController.prototype, "findOne", null);
__decorate([
    (0, swagger_1.ApiCreatedResponse)({
        description: 'The person has been successfully created',
        type: person_entity_1.PersonEntity,
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'The person already exists in the database',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Payload provided is not good' }),
    (0, swagger_1.ApiBody)({
        description: 'Payload to create a new person',
        type: create_person_dto_1.CreatePersonDto,
    }),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_person_dto_1.CreatePersonDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], PeopleController.prototype, "create", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'The person has been successfully updated',
        type: person_entity_1.PersonEntity,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Person with the given "id" doesn\'t exist in the database',
    }),
    (0, swagger_1.ApiConflictResponse)({
        description: 'The person already exists in the database',
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Parameter and/or payload provided are not good',
    }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique identifier of the person in the database',
        type: String,
        allowEmptyValue: false,
    }),
    (0, swagger_1.ApiBody)({ description: 'Payload to update a person', type: update_person_dto_1.UpdatePersonDto }),
    (0, common_1.Put)(':id'),
    __param(0, (0, common_1.Param)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [handler_params_1.HandlerParams,
        update_person_dto_1.UpdatePersonDto]),
    __metadata("design:returntype", rxjs_1.Observable)
], PeopleController.prototype, "update", null);
__decorate([
    (0, swagger_1.ApiNoContentResponse)({
        description: 'The person has been successfully deleted',
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Person with the given "id" doesn\'t exist in the database',
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Parameter provided is not good' }),
    (0, swagger_1.ApiParam)({
        name: 'id',
        description: 'Unique identifier of the person in the database',
        type: String,
        allowEmptyValue: false,
    }),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [handler_params_1.HandlerParams]),
    __metadata("design:returntype", rxjs_1.Observable)
], PeopleController.prototype, "delete", null);
PeopleController = __decorate([
    (0, swagger_1.ApiTags)('people'),
    (0, common_1.Controller)('people'),
    (0, common_1.UseInterceptors)(common_1.ClassSerializerInterceptor),
    (0, common_1.UseInterceptors)(http_interceptor_1.HttpInterceptor),
    __metadata("design:paramtypes", [people_service_1.PeopleService])
], PeopleController);
exports.PeopleController = PeopleController;
