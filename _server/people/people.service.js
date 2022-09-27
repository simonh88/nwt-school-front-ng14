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
exports.PeopleService = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
const people_1 = require("../data/people");
const person_entity_1 = require("./entities/person.entity");
let PeopleService = class PeopleService {
    constructor() {
        this.findAll = () => (0, rxjs_1.of)(this._people).pipe((0, operators_1.map)((_) => !!_ && !!_.length
            ? _.map((__) => new person_entity_1.PersonEntity(__))
            : undefined));
        this.findRandom = () => (0, rxjs_1.of)(this._people[Math.round(Math.random() * this._people.length)]).pipe((0, operators_1.map)((_) => (!!_ ? new person_entity_1.PersonEntity(_) : undefined)));
        this.findOne = (id) => (0, rxjs_1.from)(this._people).pipe((0, rxjs_1.find)((_) => _.id === id), (0, operators_1.mergeMap)((_) => !!_
            ? (0, rxjs_1.of)(new person_entity_1.PersonEntity(_))
            : (0, rxjs_1.throwError)(() => new common_1.NotFoundException(`People with id '${id}' not found`))));
        this.create = (person) => (0, rxjs_1.from)(this._people).pipe((0, rxjs_1.find)((_) => _.lastname.toLowerCase() === person.lastname.toLowerCase() &&
            _.firstname.toLowerCase() === person.firstname.toLowerCase()), (0, operators_1.mergeMap)((_) => !!_
            ? (0, rxjs_1.throwError)(() => new common_1.ConflictException(`People with lastname '${person.lastname}' and firstname '${person.firstname}' already exists`))
            : this._addPerson(person)));
        this.update = (id, person) => (0, rxjs_1.from)(this._people).pipe((0, rxjs_1.find)((_) => _.lastname.toLowerCase() === person.lastname.toLowerCase() &&
            _.firstname.toLowerCase() === person.firstname.toLowerCase() &&
            _.id.toLowerCase() !== id.toLowerCase()), (0, operators_1.mergeMap)((_) => !!_
            ? (0, rxjs_1.throwError)(() => new common_1.ConflictException(`People with lastname '${person.lastname}' and firstname '${person.firstname}' already exists`))
            : this._findPeopleIndexOfList(id)), (0, operators_1.tap)((index) => Object.assign(this._people[index], person)), (0, operators_1.map)((index) => new person_entity_1.PersonEntity(this._people[index])));
        this.delete = (id) => this._findPeopleIndexOfList(id).pipe((0, operators_1.tap)((_) => this._people.splice(_, 1)), (0, operators_1.map)(() => undefined));
        this._findPeopleIndexOfList = (id) => (0, rxjs_1.from)(this._people).pipe((0, rxjs_1.findIndex)((_) => _.id === id), (0, operators_1.mergeMap)((index) => index > -1
            ? (0, rxjs_1.of)(index)
            : (0, rxjs_1.throwError)(() => new common_1.NotFoundException(`People with id '${id}' not found`))));
        this._addPerson = (person) => (0, rxjs_1.of)(Object.assign(Object.assign({}, person), { id: this._createId(), birthDate: this._parseDate('06/05/1985'), photo: 'https://randomuser.me/api/portraits/lego/6.jpg' })).pipe((0, operators_1.tap)((_) => (this._people = this._people.concat(_))), (0, operators_1.map)((_) => new person_entity_1.PersonEntity(_)));
        this._parseDate = (date) => {
            const dates = date.split('/');
            return new Date(dates[2] + '/' + dates[1] + '/' + dates[0]).getTime();
        };
        this._createId = () => `${new Date().getTime()}`;
        this._people = [].concat(people_1.PEOPLE).map((person) => (Object.assign(Object.assign({}, person), { birthDate: this._parseDate(person.birthDate) })));
    }
};
PeopleService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], PeopleService);
exports.PeopleService = PeopleService;
