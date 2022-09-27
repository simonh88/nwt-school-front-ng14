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
exports.HttpInterceptor = void 0;
const common_1 = require("@nestjs/common");
const rxjs_1 = require("rxjs");
const operators_1 = require("rxjs/operators");
let HttpInterceptor = class HttpInterceptor {
    constructor(_logger) {
        this._logger = _logger;
        this.intercept = (context, next) => {
            const cls = context.getClass();
            const handler = context.getHandler();
            const response = context
                .switchToHttp()
                .getResponse();
            const logCtx = `${cls.name}.${handler.name}`;
            return next.handle().pipe((0, operators_1.map)((_) => (0, rxjs_1.of)(_)), (0, operators_1.mergeMap)((obs) => (0, rxjs_1.merge)(obs.pipe((0, operators_1.filter)((_) => !!_), (0, operators_1.map)((_) => _)), obs.pipe((0, operators_1.filter)((_) => !_), (0, operators_1.tap)(() => response.status(204)), (0, operators_1.map)((_) => _)))), (0, operators_1.tap)({
                next: (_) => this._logger.log(!!_ ? JSON.stringify(_) : 'NO CONTENT', logCtx),
                error: (_) => this._logger.error(_.message, JSON.stringify(_), logCtx),
            }));
        };
    }
};
HttpInterceptor = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [common_1.Logger])
], HttpInterceptor);
exports.HttpInterceptor = HttpInterceptor;
