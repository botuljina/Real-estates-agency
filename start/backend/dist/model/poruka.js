"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Poruka = new Schema({
    id: {
        type: Number
    },
    posiljalac: {
        type: String
    },
    idKonverzacija: {
        type: String
    },
    sadrzaj: {
        type: String
    },
    datumSlanja: {
        type: Date
    },
    jeProcitana: {
        type: String
    },
    jePonuda: {
        type: String
    },
    vrednostPonude: {
        type: Number
    }
});
exports.default = mongoose_1.default.model('Poruka', Poruka, 'poruka');
//# sourceMappingURL=poruka.js.map