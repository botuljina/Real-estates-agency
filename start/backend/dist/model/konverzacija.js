"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Konverzacija = new Schema({
    id: {
        type: Number
    },
    kupac: {
        type: String
    },
    prodavac: {
        type: String
    },
    naslov: {
        type: String
    },
    nekretninaId: {
        type: String
    },
    stanje: {
        type: String
    },
    postojiPonuda: {
        type: String
    },
    trenutnaVrednost: {
        type: Number
    },
    jePrihvacena: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Konverzacija', Konverzacija, 'konverzacija');
//# sourceMappingURL=konverzacija.js.map