"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const body_parser_1 = __importDefault(require("body-parser"));
const mongoose_1 = __importDefault(require("mongoose"));
const user_1 = __importDefault(require("./model/user"));
const nekretnina_1 = __importDefault(require("./model/nekretnina"));
const path_1 = __importDefault(require("path"));
const iznajmljivanje_1 = __importDefault(require("./model/iznajmljivanje"));
const konverzacija_1 = __importDefault(require("./model/konverzacija"));
const poruka_1 = __importDefault(require("./model/poruka"));
const blok_lista_1 = __importDefault(require("./model/blok_lista"));
const prodaje_1 = __importDefault(require("./model/prodaje"));
const procenti_agencije_1 = __importDefault(require("./model/procenti_agencije"));
mongoose_1.default.set('useFindAndModify', false);
const app = express_1.default();
let multerFiles;
const multer = require('multer');
app.use(cors_1.default());
app.use(body_parser_1.default.json());
app.use("", express_1.default.static("uploads"));
mongoose_1.default.connect('mongodb://localhost:27017/projekat');
const conn = mongoose_1.default.connection;
conn.once('open', () => {
    console.log("Uspesna konekcija na bazu");
});
const router = express_1.default.Router();
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads');
    },
    filename: (req, file, callBack) => {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9);
        let arrName = file.originalname.split(".");
        callBack(null, arrName[0] + "-" + uniqueSuffix + path_1.default.extname(file.originalname));
    }
});
const upload = multer({ storage: storage });
//*****************************************************************************
//[KORISNICI]
//*****************************************************************************
router.route('/korisnici').get((req, res) => {
    user_1.default.find({}, (err, korisnici) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(korisnici);
        }
    });
    console.log("get=>getUsers()");
});
router.route('/login').post((req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    user_1.default.findOne({ 'username': username, 'password': password }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
app.post('/register', upload.single('slika'), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    let filename = !req.file ? "standard.jpg" : req.file.filename;
    let data = {
        ime: req.body.ime,
        prezime: req.body.prezime,
        username: req.body.username,
        password: req.body.password,
        slika: "http://localhost:4000//" + filename,
        mail: req.body.mail,
        grad: req.body.grad,
        drzava: req.body.drzava,
        type: "korisnik",
        odobren: false
    };
    let newUser = new user_1.default(data);
    user_1.default.collection.insertOne(newUser).then(u => {
        res.status(200).json({ 'user': 'ok' });
    }).catch(err => {
        res.status(400).json({ 'user': 'nok' });
    });
}));
router.route('/username-pretraga').post((req, res) => {
    user_1.default.findOne({ 'username': req.body.username }, (err, user) => {
        if (err)
            console.log(err);
        else
            res.json(user);
    });
});
router.route('/change-password').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let username = req.body.username;
    let password = req.body.password;
    console.log("change-password:" + username + " -> " + password);
    const filter = {
        username: req.body.username
    };
    let doc = yield user_1.default.findOneAndUpdate(filter, req.body, {}, function (err, doc) {
        if (err)
            console.log(err);
        else {
            console.log("uspesno");
            return res.status(200).json({ "changePassword": "ok" });
        }
    });
}));
router.route('/update-user').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        username: req.body.username
    };
    user_1.default.findOneAndUpdate(filter, req.body, {}, function (err, u) {
        if (err)
            console.log(err);
        else {
            let returnUser = new user_1.default(req.body);
            return res.json(returnUser);
        }
    });
}));
router.route('/delete-user').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("post->/delete-user");
    user_1.default.collection.deleteOne(req.body);
    return res.status(200).json({ "user_delete": "ok" });
}));
router.route('/prihvati-user').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/prihvati-user");
    const filter = {
        username: req.body.username
    };
    let doc = yield user_1.default.findOneAndUpdate(filter, { odobren: true }, {}, function (err, doc) {
        if (err)
            console.log(err);
        else {
            return res.status(200).json({ "odobreno": "ok" });
        }
    });
}));
router.route('/odbij-user').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/prihvati-user");
    const filter = {
        username: req.body.username
    };
    let doc = yield user_1.default.findOneAndUpdate(filter, { odobren: false }, {}, function (err, doc) {
        if (err)
            console.log(err);
        else {
            return res.status(200).json({ "odobreno": "ok" });
        }
    });
}));
//*****************************************************************************
//[NEKRETNINE]
//*****************************************************************************
router.route('/nekretnine').get((req, res) => {
    nekretnina_1.default.find({}, (err, nekretnine) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(nekretnine);
        }
    });
    console.log("get=>getNekretnine()");
});
router.route('/nekretnine').post((req, res) => {
    let username = req.body.username;
    nekretnina_1.default.find({ 'vlasnik': username }, (err, nekretnine) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(nekretnine);
        }
    });
    console.log("post=>getNekretnine()");
});
router.route('/nekretnina').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let Userid = req.body.id;
    yield nekretnina_1.default.findOne({ 'id': Userid }, (err, user) => {
        if (err)
            console.log(err);
        else {
            res.json(user);
        }
    });
    console.log("getNekretnina(id) poziv");
}));
router.route('/pretraga-nekretnine').post((req, res) => {
    let naziv = req.body.naziv == undefined ? "" : req.body.naziv;
    let grad = req.body.grad == undefined ? "" : req.body.grad;
    let cenaMin = req.body.cena == undefined ? 0 : req.body.cena;
    let cenaMax = req.body.cenaMax == undefined ? 100000000 : req.body.cenaMax;
    console.log(cenaMin);
    console.log(cenaMax);
    nekretnina_1.default.find({ "naziv": { $regex: '.*' + naziv + '.*' }, "grad": { $regex: '.*' + grad + '.*' }, "cena": { $gte: cenaMin, $lte: cenaMax } }, function (err, data) {
        if (err)
            console.log("greska pri find");
        else {
            //console.log(data);
            return res.json(data);
        }
    });
});
router.route('/iznajmi').post((req, res) => {
    let id = req.body.id;
    let datumOd = new Date(req.body.datumOd).getTime();
    let datumDo = new Date(req.body.datumDo).getTime();
    let cena = req.body.cena;
    console.log(cena);
    req.body.cena = cena * ((datumDo - datumOd) / (1000 * 3600 * 24));
    console.log("/iznajmi");
    console.log(req.body.cena);
    iznajmljivanje_1.default.find({ 'id': id }, function (err, data) {
        if (err)
            console.log("greska pri find");
        else {
            if (data.length == 0) {
                let objToAdd = new iznajmljivanje_1.default(req.body);
                iznajmljivanje_1.default.collection.insertOne(objToAdd);
                res.status(200).json({ 'iznajmljivanje': 'ok' });
            }
            else {
                //console.log(data);
                let uslov = true;
                data.forEach(element => {
                    if (uslov) {
                        let uslov1 = true;
                        let uslov2 = true;
                        if (new Date(element.get('datumOd')).getTime() <= datumOd && datumOd <= new Date(element.get('datumDo')).getTime()) {
                            console.log("preklapanje datumaOd");
                            uslov1 = false;
                            uslov = false;
                        }
                        if (uslov1 && new Date(element.get('datumOd')).getTime() <= datumDo && datumDo <= new Date(element.get('datumDo')).getTime()) {
                            console.log("preklapanje datumaDo");
                            uslov2 = false;
                            uslov = false;
                        }
                        if (uslov2 && new Date(element.get('datumOd')).getTime() >= datumOd && datumDo >= new Date(element.get('datumDo')).getTime()) {
                            console.log("datum je podskup naseg datuma");
                            uslov = false;
                        }
                    }
                });
                if (!uslov)
                    return res.status(400).json({ 'iznajmljivanje': 'nok' });
                let objToAdd = new iznajmljivanje_1.default(req.body);
                iznajmljivanje_1.default.collection.insertOne(objToAdd);
                return res.status(200).json({ 'iznajmljivanje': 'ok' });
            }
        }
    });
});
router.route('/iznajmljivanja').get((req, res) => {
    iznajmljivanje_1.default.find({}, (err, nekretnine) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(nekretnine);
        }
    });
    console.log("get=>getIznajmljivanja()");
});
router.route('/get-procenti').get((req, res) => {
    console.log('/get-procenti');
    procenti_agencije_1.default.findOne({}, (err, nekretnine) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(nekretnine);
        }
    });
    console.log("get=>get_procenti()");
});
router.route('/get-prodaje').get((req, res) => {
    console.log('/get-prodaje');
    prodaje_1.default.find({}, (err, nekretnine) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(nekretnine);
        }
    });
    console.log("get=>get_procenti()");
});
app.post('/dodaj-nekretninu', upload.array('galerija', 10), (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/dodaj-nekretninu");
    let objects = [];
    let images = [];
    objects = Object.assign(req.files);
    for (let i = 0; i < objects.length; i++) {
        images.push("http://localhost:4000//" + objects[i]['filename']);
    }
    console.log(images);
    if (images.length == 0)
        images.push("http://localhost:4000//nekretnine.jpg");
    let nextId = 1;
    nekretnina_1.default.findOne({}, {}, { sort: { 'id': -1 } }, function (err, p) {
        if (!p)
            nextId = 1;
        else
            nextId = Number(p.id) + 1;
        let vlasnik = req.body.vlasnik.includes('agentbot') ? 'agencija' : req.body.vlasnik;
        let data = {
            id: String(nextId),
            naziv: req.body.naziv,
            grad: req.body.grad,
            opstina: req.body.opstina,
            ulica: req.body.ulica,
            tip: req.body.tip,
            brojSpratova: Number(req.body.brojSpratova),
            sprat: Number(req.body.sprat),
            kvadratura: Number(req.body.kvadratura),
            brojSoba: Number(req.body.brojSoba),
            jeNamestena: req.body.jeNamestena == 'true' ? true : false,
            galerija: images,
            usluga: req.body.usluga,
            cena: Number(req.body.cena),
            vlasnik: vlasnik,
            jePromovisana: "false",
            stanje: "cekanje"
        };
        nekretnina_1.default.collection.insertOne(data);
        res.status(200).json({ "dodavanje": "ok" });
    });
}));
router.route('/update-nekretnina').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const filter = {
        id: req.body.id
    };
    let doc = yield nekretnina_1.default.findOneAndUpdate(filter, req.body, { upsert: true }, function (err, doc) {
        if (err)
            console.log(err);
        else {
            let returnUser = new user_1.default(req.body);
            return res.json(returnUser);
        }
    });
}));
router.route('/odobri-nekretninu').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/odobri-nekretninu");
    const filter = {
        id: req.body.id
    };
    let doc = yield nekretnina_1.default.findOneAndUpdate(filter, { stanje: "odobreno" }, {}, function (err, doc) {
        if (err)
            console.log(err);
        else {
            return res.status(200).json({ "odobreno": "ok" });
        }
    });
}));
router.route('/promovisi-nekretninu').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/promovisi-nekretninu");
    const filter = {
        id: req.body.id
    };
    let doc = yield nekretnina_1.default.findOneAndUpdate(filter, { jePromovisana: "true" }, {}, function (err, doc) {
        if (err)
            console.log(err);
        else {
            return res.status(200).json({ "promovisano": "ok" });
        }
    });
}));
router.route('/ukloni-promociju-nekretnine').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/ukloni-promociju-nekretnine");
    const filter = {
        id: req.body.id
    };
    let doc = yield nekretnina_1.default.findOneAndUpdate(filter, { jePromovisana: "false" }, {}, function (err, doc) {
        if (err)
            console.log(err);
        else {
            return res.status(200).json({ "promovisano": "ok" });
        }
    });
}));
router.route('/prihvati-prodaju').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/prihvati-prodaju");
    const filter = {
        nekretninaId: req.body.nekretninaId
    };
    let doc = yield prodaje_1.default.findOneAndUpdate(filter, { stanje: "prihvaceno" }, {}, function (err, doc) {
        if (err)
            console.log(err);
        else {
            const filter2 = {
                id: req.body.nekretninaId
            };
            nekretnina_1.default.findOneAndUpdate(filter2, { stanje: "prodato" }, {}, function (err, doc) {
                if (err)
                    console.log(err);
                else {
                    return res.status(200).json({ "prihvati_prodaju": "ok" });
                }
            });
        }
    });
}));
router.route('/odbij-prodaju').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/prihvati-prodaju");
    const filter = {
        nekretninaId: req.body.nekretninaId
    };
    let doc = yield prodaje_1.default.findOneAndUpdate(filter, { stanje: "odbijeno" }, {}, function (err, doc) {
        if (err)
            console.log(err);
        else {
            return res.status(200).json({ "odbij_prodaju": "ok" });
        }
    });
}));
//*****************************************************************************
//[PORUKE]
//*****************************************************************************
router.route('/dodaj-poruku').post((req, res) => {
    let kupac = req.body.kupac;
    let prodavac = req.body.prodavac;
    let naslov = req.body.naslov;
    let nekretninaId = req.body.nekretninaId;
    let stanje = "chat";
    //---------------
    let sadrzaj = req.body.sadrzaj;
    blok_lista_1.default.findOne({ 'user1': kupac, 'user2': prodavac }, {}, {}, function (err, user) {
        if (!user) {
            blok_lista_1.default.findOne({ 'user1': prodavac, 'user2': kupac }, {}, {}, function (err, userFound) {
                if (!userFound) {
                    let nextId = 1;
                    let porukaNextId = 1;
                    konverzacija_1.default.findOne({ 'kupac': kupac, 'prodavac': prodavac, 'naslov': naslov }, function (err, p) {
                        if (!p) {
                            console.log("[konverzacija ne postoji]");
                            konverzacija_1.default.findOne({}, {}, { sort: { 'id': -1 } }, function (err, p) {
                                if (!p)
                                    nextId = 1;
                                else
                                    nextId = p.id + 1;
                                let data = {
                                    id: nextId,
                                    kupac: kupac,
                                    prodavac: prodavac,
                                    naslov: naslov,
                                    nekretninaId: String(nekretninaId),
                                    stanje: stanje,
                                    postojiPonuda: "false",
                                    vrednostPonude: 0,
                                    jePrihvacena: "false"
                                };
                                konverzacija_1.default.collection.insertOne(data);
                                poruka_1.default.findOne({}, {}, { sort: { 'id': -1 } }, function (err, p) {
                                    if (!p)
                                        porukaNextId = 1;
                                    else
                                        porukaNextId = p.id + 1;
                                    let data = {
                                        id: porukaNextId,
                                        posiljalac: kupac,
                                        idKonverzacija: String(nextId),
                                        sadrzaj: sadrzaj,
                                        datumSlanja: new Date(),
                                        jeProcitana: "false",
                                        jePonuda: "false",
                                        vrednostPonude: 0
                                    };
                                    poruka_1.default.collection.insertOne(data);
                                });
                                return res.status(200).json({ "dodavanje_konverzacija": "ok" });
                            });
                        }
                        else {
                            console.log("**konverzacija postoji**");
                            poruka_1.default.findOne({}, {}, { sort: { 'id': -1 } }, function (err, por) {
                                if (!por)
                                    porukaNextId = 1;
                                else
                                    porukaNextId = por.id + 1;
                                console.log(Number(por.id));
                                console.log(porukaNextId);
                                let data = {
                                    id: porukaNextId,
                                    posiljalac: kupac,
                                    idKonverzacija: String(p.id),
                                    sadrzaj: sadrzaj,
                                    datumSlanja: new Date(),
                                    jeProcitana: "false",
                                    jePonuda: "false",
                                    vrednostPonude: 0
                                };
                                poruka_1.default.collection.insertOne(data);
                            });
                            return res.status(200).json({ "dodavanje_konverzacija": "ok" });
                        }
                    });
                }
                else {
                    return res.status(200).json({ "dodavanje_konverzacija": "Korisnik je vec blokiran" });
                }
            });
        }
        else {
            return res.status(200).json({ "dodavanje_konverzacija": "Korisnik je vec blokiran" });
        }
    });
    //-------------------------
});
router.route('/dohvati-konverzacije-username').post((req, res) => {
    konverzacija_1.default.find({ 'kupac': req.body.username }, (err, korisnici) => {
        if (err) {
            console.log(err);
        }
        else {
            let konverzacije = [];
            korisnici.forEach(kor => {
                konverzacije.push(kor);
            });
            konverzacija_1.default.find({ 'prodavac': req.body.username }, (err, korisn) => {
                if (err) {
                    console.log(err);
                }
                else {
                    korisn.forEach(kor => {
                        konverzacije.push(kor);
                    });
                    return res.json(konverzacije);
                }
            });
        }
    });
    console.log("get=>getUsers()");
});
router.route('/dohvati-poruke-jedne-konverzacije').post((req, res) => {
    poruka_1.default.find({ 'idKonverzacija': req.body.id }, (err, user) => {
        if (err)
            console.log(err);
        else
            return res.json(user);
    });
});
router.route('/dodaj-poruku-u-konverzaciju').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/dodaj-poruku-u-konverzaciju");
    let porukaNextId = 1;
    console.log(req.body.idKonverzacija);
    const filter = {
        id: Number(req.body.idKonverzacija),
        stanje: "chat"
    };
    konverzacija_1.default.findOne({ 'id': req.body.idKonverzacija, 'stanje': "chat" }, {}, {}, function (err, k) {
        if (k) {
            console.log("hello");
            poruka_1.default.findOne({}, {}, { sort: { 'id': -1 } }, function (err, por) {
                if (!por)
                    porukaNextId = 1;
                else
                    porukaNextId = por.id + 1;
                let data = {
                    id: porukaNextId,
                    posiljalac: req.body.posiljalac,
                    idKonverzacija: String(req.body.idKonverzacija),
                    sadrzaj: req.body.sadrzaj,
                    datumSlanja: new Date(),
                    jeProcitana: "false",
                    jePonuda: "false",
                    vrednostPonude: 0
                };
                poruka_1.default.collection.insertOne(data);
                return res.status(200).json({ "dodavanje-jedne-poruke": "ok" });
            });
        }
        else {
            const filter2 = {
                id: Number(req.body.idKonverzacija),
                stanje: "arhiva"
            };
            konverzacija_1.default.findOne({ 'id': req.body.idKonverzacija, 'stanje': "arhiva" }, {}, {}, function (err, k2) {
                if (k2) {
                    console.log("hello");
                    poruka_1.default.findOne({}, {}, { sort: { 'id': -1 } }, function (err, por) {
                        if (!por)
                            porukaNextId = 1;
                        else
                            porukaNextId = por.id + 1;
                        let data = {
                            id: porukaNextId,
                            posiljalac: req.body.posiljalac,
                            idKonverzacija: String(req.body.idKonverzacija),
                            sadrzaj: req.body.sadrzaj,
                            datumSlanja: new Date(),
                            jeProcitana: "false",
                            jePonuda: "false",
                            vrednostPonude: 0
                        };
                        poruka_1.default.collection.insertOne(data);
                        return res.status(200).json({ "dodavanje-jedne-poruke": "ok" });
                    });
                }
                else {
                    return res.status(200).json({ "dodavanje-jedne-poruke": "Blokiran chat, dodavanje poruke neuspesno!" });
                }
            });
        }
    });
}));
router.route('/blokiraj-korisnika').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/blokiraj-korisnika");
    let porukaNextId = 1;
    blok_lista_1.default.findOne({ 'user1': req.body.user1, 'user2': req.body.user2 }, {}, {}, function (err, user) {
        if (!user) {
            blok_lista_1.default.findOne({ 'user1': req.body.user2, 'user2': req.body.user1 }, {}, {}, function (err, userFound) {
                if (!userFound) {
                    let data = {
                        user1: req.body.user1,
                        user2: req.body.user2
                    };
                    blok_lista_1.default.collection.insertOne(data);
                    const filter = {
                        kupac: req.body.user1,
                        prodavac: req.body.user2
                    };
                    let doc = konverzacija_1.default.find(filter, {}, {}, function (err, doc) {
                        if (err)
                            console.log(err);
                        else {
                            doc.forEach(res => {
                                konverzacija_1.default.collection.updateOne({ "id": res.id }, { $set: { 'stanje': "blok" } });
                            });
                            console.log("kurac");
                            const filter = {
                                kupac: req.body.user2,
                                prodavac: req.body.user1
                            };
                            konverzacija_1.default.find(filter, {}, {}, function (err, doc) {
                                doc.forEach(res => {
                                    konverzacija_1.default.collection.updateOne({ "id": res.id }, { $set: { 'stanje': "blok" } });
                                });
                            });
                        }
                    });
                    return res.status(200).json({ "blokiranje": "ok" });
                }
                else {
                    return res.status(200).json({ "blokiranje": "Korisnik je vec blokiran" });
                }
            });
        }
        else {
            return res.status(200).json({ "blokiranje": "Korisnik je vec blokiran" });
        }
    });
}));
router.route('/odblokiraj-korisnika').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/odblokiraj-korisnika");
    blok_lista_1.default.findOne({ 'user1': req.body.user1, 'user2': req.body.user2 }, {}, {}, function (err, userFound) {
        if (userFound) {
            let data = {
                user1: req.body.user1,
                user2: req.body.user2
            };
            blok_lista_1.default.collection.deleteOne(data);
            const filter = {
                kupac: req.body.user1,
                prodavac: req.body.user2
            };
            let doc = konverzacija_1.default.find(filter, {}, {}, function (err, doc) {
                if (err)
                    console.log(err);
                else {
                    doc.forEach(res => {
                        konverzacija_1.default.collection.updateOne({ "id": res.id }, { $set: { 'stanje': "chat" } });
                    });
                    console.log("kurac");
                    const filter = {
                        kupac: req.body.user2,
                        prodavac: req.body.user1
                    };
                    konverzacija_1.default.find(filter, {}, {}, function (err, doc) {
                        doc.forEach(res => {
                            konverzacija_1.default.collection.updateOne({ "id": res.id }, { $set: { 'stanje': "chat" } });
                        });
                    });
                }
            });
            return res.status(200).json({ "odblokiranje": "ok" });
        }
        else {
            return res.status(200).json({ "odblokiranje": "Nemate pravo odblokiranja ili korisnik ne postoji!" });
        }
    });
}));
router.route('/arhiviraj-konverzaciju').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/arhiviraj-konverzaciju");
    const filter = {
        id: req.body.id
    };
    let doc = yield konverzacija_1.default.findOneAndUpdate(filter, { stanje: "arhiva" }, {}, function (err, doc) {
        if (err)
            console.log(err);
        else {
            return res.status(200).json({ "arhiva": "ok" });
        }
    });
}));
router.route('/izbaci-iz-arhive-konverzaciju').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/izbaci-iz-arhive-konverzaciju");
    const filter = {
        id: req.body.id
    };
    let doc = yield konverzacija_1.default.findOneAndUpdate(filter, { stanje: "chat" }, {}, function (err, doc) {
        if (err)
            console.log(err);
        else {
            return res.status(200).json({ "arhiva": "ok" });
        }
    });
}));
router.route('/posalji-ponudu').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/posalji-ponudu");
    const filter = {
        id: req.body.chatId
    };
    let doc = yield konverzacija_1.default.findOneAndUpdate(filter, { postojiPonuda: "true", trenutnaVrednost: req.body.trenutnaVrednost }, {}, function (err, doc) {
        if (err)
            console.log(err);
        else {
            const filter = {
                idKonverzacija: req.body.chatId,
                jePonuda: "true"
            };
            poruka_1.default.findOne(filter, {}, {}, function (err, doc) {
                if (doc) {
                    console.log(doc.id);
                    poruka_1.default.collection.updateOne({ id: doc.id }, { $set: { vrednostPonude: req.body.trenutnaVrednost } });
                    return res.status(200).json({ "posalji-ponudu": "ok" });
                }
                else {
                    console.log("ne postoji");
                    let porukaNextId = 1;
                    poruka_1.default.findOne({}, {}, { sort: { 'id': -1 } }, function (err, por) {
                        if (!por)
                            porukaNextId = 1;
                        else
                            porukaNextId = por.id + 1;
                        console.log(req.body.chatId);
                        console.log(req.body.trenutnaVrednost);
                        let sadrzajImport = "Postovani, moja ponuda za Vasu nekretninu iznosi:" + req.body.trenutnaVrednost;
                        let data = {
                            id: porukaNextId,
                            posiljalac: req.body.posiljalac,
                            idKonverzacija: String(req.body.chatId),
                            sadrzaj: sadrzajImport,
                            datumSlanja: new Date(),
                            jeProcitana: "false",
                            jePonuda: "true",
                            vrednostPonude: Number(req.body.trenutnaVrednost)
                        };
                        poruka_1.default.collection.insertOne(data);
                    });
                    return res.status(200).json({ "posalji-ponudu": "ok" });
                }
            });
        }
    });
}));
router.route('/prihvati-ponudu').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/prihvati-ponudu");
    const filter = {
        id: req.body.chatId
    };
    konverzacija_1.default.findOneAndUpdate(filter, { jePrihvacena: "true" }, {}, function (err, doc) {
        if (err)
            console.log(err);
        else {
            let porukaNextId = 1;
            poruka_1.default.findOne({}, {}, { sort: { 'id': -1 } }, function (err, por) {
                if (!por)
                    porukaNextId = 1;
                else
                    porukaNextId = por.id + 1;
                console.log(req.body.chatId);
                console.log(req.body.trenutnaVrednost);
                let data = {
                    id: porukaNextId,
                    posiljalac: req.body.username,
                    idKonverzacija: String(req.body.chatId),
                    sadrzaj: "",
                    datumSlanja: new Date(),
                    jeProcitana: "false",
                    jePonuda: "prihvacena",
                    vrednostPonude: 0
                };
                poruka_1.default.collection.insertOne(data);
                let data2 = {
                    kupac: doc.toObject().kupac,
                    prodavac: req.body.username,
                    iznos: doc.toObject().trenutnaVrednost,
                    nekretninaId: doc.toObject().nekretninaId,
                    stanje: "cekanje"
                };
                prodaje_1.default.collection.insertOne(data2);
            });
            return res.status(200).json({ "prihvati-ponudu": "ok" });
        }
    });
}));
router.route('/odbij-ponudu').post((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    console.log("/odbij-ponudu");
    const filter = {
        id: req.body.chatId
    };
    konverzacija_1.default.findOneAndUpdate(filter, { jePrihvacena: "false", postojiPonuda: "false", trenutnaVrednost: 0 }, {}, function (err, doc) {
        if (err)
            console.log(err);
        else {
            const filter2 = {
                idKonverzacija: req.body.chatId,
                jePonuda: "true"
            };
            poruka_1.default.findOneAndUpdate(filter2, { jePonuda: "false", vrednostPonude: 0 }, {}, function (err, doc) {
                let porukaNextId = 1;
                poruka_1.default.findOne({}, {}, { sort: { 'id': -1 } }, function (err, por) {
                    if (!por)
                        porukaNextId = 1;
                    else
                        porukaNextId = por.id + 1;
                    let data = {
                        id: porukaNextId,
                        posiljalac: req.body.username,
                        idKonverzacija: String(req.body.chatId),
                        sadrzaj: "Ponuda je odbijena! Ponudi mi bolji iznos, kako bih prihvatio tvoju ponudu!",
                        datumSlanja: new Date(),
                        jeProcitana: "false",
                        jePonuda: "false",
                        vrednostPonude: 0
                    };
                    poruka_1.default.collection.insertOne(data);
                });
                return res.status(200).json({ "odbij-ponudu": "ok" });
            });
        }
    });
}));
app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map