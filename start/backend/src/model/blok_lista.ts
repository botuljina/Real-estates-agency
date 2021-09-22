import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let blok_lista = new Schema({
    user1: {
        type: String
    },
    user2: {
        type: String
    }
});

export default mongoose.model('blok_lista',blok_lista,'blok_lista')

