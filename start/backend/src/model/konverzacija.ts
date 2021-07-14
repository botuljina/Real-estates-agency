import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
    stanje:{
        type: String
    },
    postojiPonuda:{
        type: String
    },
    trenutnaVrednost:{
        type: Number
    },
    jePrihvacena:{
        type: String
    }
});

export default mongoose.model('Konverzacija',Konverzacija,'konverzacija')

