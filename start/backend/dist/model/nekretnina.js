"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
let Nekretnina = new Schema({
    id: {
        type: String
    },
    naziv: {
        type: String
    },
    grad: {
        type: String
    },
    opstina: {
        type: String
    },
    ulica: {
        type: String
    },
    tip: {
        type: String
    },
    brojSpratova: {
        type: Number
    },
    sprat: {
        type: Number
    },
    kvadratura: {
        type: Number
    },
    brojSoba: {
        type: Number
    },
    jeNamestena: {
        type: Boolean
    },
    galerija: {
        type: [String]
    },
    usluga: {
        type: String
    },
    cena: {
        type: Number
    },
    vlasnik: {
        type: String
    },
    jePromovisana: {
        type: String
    },
    stanje: {
        type: String
    }
});
exports.default = mongoose_1.default.model('Nekretnina', Nekretnina, 'nekretnine');
//# sourceMappingURL=nekretnina.js.map