import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let Nekretnina = new Schema({
    id:{
        type:String
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
    kvadratura:{
        type:Number
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
    usluga:{
        type: String
    },
    cena:{
        type: Number
    },
    vlasnik:{
        type:String
    },
    jePromovisana:{
        type: String
    },
    stanje:{
        type: String
    }
});

export default mongoose.model('Nekretnina',Nekretnina,'nekretnine')

