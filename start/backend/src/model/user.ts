import mongoose from 'mongoose';

const Schema = mongoose.Schema;

let User = new Schema({
    ime: {
        type: String
    },
    prezime: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String
    },
    slika: {
        type: String
    },
    mail: {
        type: String
    },
    grad: {
        type: String
    },
    drzava: {
        type: String
    },
    type: {
        type: String
    },
    odobren: {
        type: Boolean
    }
});

export default mongoose.model('User',User,'users')

