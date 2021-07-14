import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let procenti_agencije = new Schema({
    prodaja: {
        type: Number
    },
    renta: {
        type: Number
    }
});

export default mongoose.model('procenti_agencije',procenti_agencije,'procenti_agencije')

