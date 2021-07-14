"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let prodaje = new Schema({
    kupac: {
        type: String
    },
    prodavac: {
        type: String
    },
    iznos: {
        type: Number
    },
    nekretninaId: {
        type: String
    },
    stanje: {
        type: String
    }
});
exports.default = mongoose_1.default.model('prodaje', prodaje, 'prodaje');
//# sourceMappingURL=prodaje.js.map