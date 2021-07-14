"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let procenti_agencije = new Schema({
    prodaja: {
        type: Number
    },
    renta: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('procenti_agencije', procenti_agencije, 'procenti_agencije');
//# sourceMappingURL=procenti_agencije.js.map