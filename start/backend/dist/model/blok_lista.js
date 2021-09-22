"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let blok_lista = new Schema({
    user1: {
        type: String
    },
    user2: {
        type: String
    }
});
exports.default = mongoose_1.default.model('blok_lista', blok_lista, 'blok_lista');
//# sourceMappingURL=blok_lista.js.map