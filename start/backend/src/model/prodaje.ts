import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let prodaje = new Schema({
    kupac:{
        type: String
    },
    prodavac: {
        type: String
    },
    iznos: {
        type: Number
    },
    nekretninaId:{
        type: String
    },
    stanje: {
        type: String
    }
});

export default mongoose.model('prodaje',prodaje,'prodaje')

