"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Konverzacija = new Schema({
    id: {
        type: String
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
    }
});
exports.default = mongoose_1.default.model('Konverzacija', Konverzacija, 'konverzacija');
//# sourceMappingURL=koverzacija.js.map