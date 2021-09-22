import mongoose from 'mongoose';

const Schema = mongoose.Schema;

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
    jeProcitana:{
        type: String
    },
    jePonuda:{
        type: String
    },
    vrednostPonude:{
        type: Number
    }
});

export default mongoose.model('Poruka',Poruka,'poruka')

