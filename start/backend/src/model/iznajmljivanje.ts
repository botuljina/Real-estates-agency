import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let iznajmljivanje = new Schema({
    username:{
        type: String
    },
    id: {
        type: String
    },
    datumOd: {
        type: Date
    },
    datumDo: {
        type: Date
    },
    cena:{
        type:Number
    }
});

export default mongoose.model('iznajmljivanje',iznajmljivanje,'iznajmljivanje')

