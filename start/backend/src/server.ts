import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import user from './model/user';
import nekretnina from './model/nekretnina';
import path from 'path'
import iznajmljivanje from './model/iznajmljivanje';
import konverzacija from './model/konverzacija';
import poruka from './model/poruka';
import blok_lista from './model/blok_lista';
import prodaje from './model/prodaje';
import procenti_agencije from './model/procenti_agencije';

mongoose.set('useFindAndModify', false);
const app = express();

let multerFiles: Express.Multer.File[];
const multer = require('multer');
app.use(cors());
app.use(bodyParser.json());
app.use("", express.static("uploads"))

mongoose.connect('mongodb://localhost:27017/projekat')

const conn = mongoose.connection;

conn.once('open',() =>{
    console.log("Uspesna konekcija na bazu");
})

const router = express.Router();

const storage = multer.diskStorage({
    destination: (req: any, file: any, callBack: (arg0: any, arg1: string) => void) => {
        callBack(null, 'uploads')
    },
    filename: (req: any, file: { originalname: any; }, callBack: (arg0: any, arg1: string) => void) => {
        const uniqueSuffix = Date.now() + Math.round(Math.random() * 1E9);
        let arrName = file.originalname.split(".");
        callBack(null, arrName[0] + "-" + uniqueSuffix + path.extname(file.originalname))
    }
})

const upload = multer({ storage: storage })


//*****************************************************************************
//[KORISNICI]
//*****************************************************************************

router.route('/korisnici').get((req, res) => {
    
    user.find({}, (err, korisnici) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(korisnici);
        }
    });

    console.log("get=>getUsers()")
});

router.route('/login').post((req,res) => {

    let username = req.body.username;
    let password = req.body.password;

    user.findOne({'username': username, 'password': password},(err,user)=>{
        if(err) console.log(err);
        else res.json(user);
    }) 
});

app.post('/register', upload.single('slika'), async (req, res, next) => {   

    let filename = !req.file?  "standard.jpg" : req.file.filename;

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
    }

    let newUser = new user(data);  
   
    user.collection.insertOne(newUser).then(u=>{
        res.status(200).json({'user':'ok'})
        }).catch(err =>{
        res.status(400).json({'user': 'nok'});
        });
})

router.route('/username-pretraga').post((req, res) => {   
    user.findOne({'username': req.body.username},(err,user)=>{
        if(err) console.log(err);
        else res.json(user);
    }) 
});

router.route('/change-password').post(async (req,res) => {

    let username = req.body.username;
    let password = req.body.password;

    console.log("change-password:" + username+ " -> " + password);
    const filter = {
        username: req.body.username
    };

    let doc = await user.findOneAndUpdate(filter,req.body, {}, function (err, doc) {
        if(err) console.log(err);
        else{
            console.log("uspesno");
            return res.status(200).json({ "changePassword": "ok" });
        } 
    });
});
router.route('/update-user').post(async (req, res) => {
    const filter = {
        username: req.body.username
    };
    
    user.findOneAndUpdate(filter, req.body, {}, function (err, u) {
        if(err) console.log(err);
        else{
            let returnUser = new user(req.body)
            return res.json(returnUser);
        } 
    });
});
router.route('/delete-user').post(async (req, res) => {
    console.log("post->/delete-user")
    user.collection.deleteOne(req.body);
    return res.status(200).json({ "user_delete": "ok" });
});

router.route('/prihvati-user').post(async (req, res) => {
    console.log("/prihvati-user")
    const filter = {
        username: req.body.username
    };

    let doc = await user.findOneAndUpdate(filter, {odobren:true}, {}, function (err, doc) {
        if(err) console.log(err);
        else{
            return res.status(200).json({ "odobreno": "ok" });
        } 
    });
});

router.route('/odbij-user').post(async (req, res) => {
    console.log("/prihvati-user")
    const filter = {
        username: req.body.username
    };

    let doc = await user.findOneAndUpdate(filter, {odobren:false}, {}, function (err, doc) {
        if(err) console.log(err);
        else{
            return res.status(200).json({ "odobreno": "ok" });
        } 
    });
});

//*****************************************************************************
//[NEKRETNINE]
//*****************************************************************************
router.route('/nekretnine').get((req, res) => {
    
    nekretnina.find({}, (err, nekretnine) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(nekretnine);
        }
    });

    console.log("get=>getNekretnine()")
});

router.route('/nekretnine').post((req, res) => {
    let username = req.body.username;
    nekretnina.find({'vlasnik': username}, (err, nekretnine) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(nekretnine);
        }
    });

    console.log("post=>getNekretnine()")
});

router.route('/nekretnina').post(async (req, res) => {    
    
    let Userid = req.body.id;
    
    await nekretnina.findOne({'id': Userid },(err,user)=>{
        if(err) console.log(err);
        else {
            res.json(user);
        }
    }) 
    console.log("getNekretnina(id) poziv")
});
router.route('/pretraga-nekretnine').post((req,res)=>{
    let naziv = req.body.naziv == undefined? "": req.body.naziv;
    let grad = req.body.grad == undefined? "": req.body.grad;
    let cenaMin = req.body.cena == undefined? 0:req.body.cena;
    let cenaMax = req.body.cenaMax == undefined? 100000000:req.body.cenaMax;
    console.log(cenaMin);
    console.log(cenaMax);
    nekretnina.find({ "naziv": { $regex: '.*' + naziv + '.*' }, "grad":{ $regex: '.*' + grad + '.*' },"cena": { $gte: cenaMin, $lte: cenaMax } },
    function(err,data){
        if(err) console.log("greska pri find");
        else
        {
            //console.log(data);
            return res.json(data);
        } 
   });
});

router.route('/iznajmi').post((req,res)=>{
    let id = req.body.id;
    let datumOd = new Date(req.body.datumOd).getTime();
    let datumDo = new Date(req.body.datumDo).getTime();
    let cena = req.body.cena ;
    console.log(cena)
    req.body.cena =cena * ((datumDo-datumOd) / (1000 * 3600 * 24));
    console.log("/iznajmi")
    console.log(req.body.cena)
    iznajmljivanje.find({'id': id },
        function(err,data){
            if(err) console.log("greska pri find");
            else
            {
                if(data.length == 0){
                    let objToAdd = new iznajmljivanje(req.body);
                    iznajmljivanje.collection.insertOne(objToAdd);
                    res.status(200).json({'iznajmljivanje':'ok'})
                }else{
                    //console.log(data);
                    let uslov = true;
                    data.forEach(element => {
                        if(uslov){
                            let uslov1 = true;
                            let uslov2 = true;
                            if(new Date(element.get('datumOd')).getTime() <= datumOd && datumOd <=new Date(element.get('datumDo')).getTime()){
                                console.log("preklapanje datumaOd");
                                uslov1 = false;
                                uslov =false;                
                            }
                            if(uslov1 && new Date(element.get('datumOd')).getTime() <= datumDo && datumDo <=new Date(element.get('datumDo')).getTime()){
                                console.log("preklapanje datumaDo");
                                uslov2 = false;
                                uslov =false;              
                            }
                            if(uslov2 && new Date(element.get('datumOd')).getTime() >= datumOd && datumDo >= new Date(element.get('datumDo')).getTime()){
                                console.log("datum je podskup naseg datuma");
                                uslov =false;
                            }
                        }
                    });
                    if(!uslov)
                        return res.status(400).json({'iznajmljivanje': 'nok'});  
                    let objToAdd = new iznajmljivanje(req.body);
                    iznajmljivanje.collection.insertOne(objToAdd);
                    return res.status(200).json({'iznajmljivanje':'ok'})
                }
            } 
    });
});

router.route('/iznajmljivanja').get((req, res) => {
    
    iznajmljivanje.find({}, (err, nekretnine) => {
        if (err) {
            console.log(err);
        }
        else {
            res.json(nekretnine);
        }
    });

    console.log("get=>getIznajmljivanja()")
});

router.route('/get-procenti').get((req, res) => {
    console.log('/get-procenti')
    procenti_agencije.findOne({}, (err, nekretnine) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(nekretnine);
        }
    });

    console.log("get=>get_procenti()")
});

router.route('/get-prodaje').get((req, res) => {
    console.log('/get-prodaje')
    prodaje.find({}, (err, nekretnine) => {
        if (err) {
            console.log(err);
        }
        else {
            return res.json(nekretnine);
        }
    });

    console.log("get=>get_procenti()")
});

app.post('/dodaj-nekretninu', upload.array('galerija', 10), async (req, res, next) => {
    console.log("/dodaj-nekretninu");

    let objects: Array<any>= [];
    let images: String[] = [];

    objects = Object.assign(req.files);


    for (let i = 0; i < objects.length; i++) {
        images.push("http://localhost:4000//" + objects[i]['filename'])
    }
    console.log(images);
    if (images.length == 0)
        images.push("http://localhost:4000//nekretnine.jpg");


    let nextId = 1;

    nekretnina.findOne({}, {}, { sort: { 'id': -1 } }, function (err, p) {
        if (!p)
            nextId = 1;
        else
            nextId =Number(p.id) + 1;
        let vlasnik = req.body.vlasnik.includes('agentbot') ? 'agencija' : req.body.vlasnik;
        let data = {
            id: String(nextId),
            naziv: req.body.naziv,
            grad: req.body.grad,
            opstina: req.body.opstina,
            ulica: req.body.ulica,
            tip: req.body.tip,
            brojSpratova: Number(req.body.brojSpratova),
            sprat:Number(req.body.sprat),
            kvadratura: Number(req.body.kvadratura),
            brojSoba: Number(req.body.brojSoba),
            jeNamestena: req.body.jeNamestena=='true'? true: false,
            galerija: images,
            usluga: req.body.usluga,
            cena: Number(req.body.cena),
            vlasnik: vlasnik,
            jePromovisana: "false",
            stanje: "cekanje"
        }

        nekretnina.collection.insertOne(data);
        res.status(200).json({ "dodavanje": "ok" });
    });
})

router.route('/update-nekretnina').post(async (req, res) => {

    const filter = {
        id: req.body.id
    };

    let doc = await nekretnina.findOneAndUpdate(filter, req.body, { upsert: true }, function (err, doc) {
        if(err) console.log(err);
        else{
            let returnUser = new user(req.body)
            return res.json(returnUser);
        } 
    });
});

router.route('/odobri-nekretninu').post(async (req, res) => {
    console.log("/odobri-nekretninu")
    const filter = {
        id: req.body.id
    };

    let doc = await nekretnina.findOneAndUpdate(filter, {stanje:"odobreno"}, {}, function (err, doc) {
        if(err) console.log(err);
        else{
            return res.status(200).json({ "odobreno": "ok" });
        } 
    });
});

router.route('/promovisi-nekretninu').post(async (req, res) => {
    console.log("/promovisi-nekretninu")
    const filter = {
        id: req.body.id
    };

    let doc = await nekretnina.findOneAndUpdate(filter, {jePromovisana:"true"}, {}, function (err, doc) {
        if(err) console.log(err);
        else{
            return res.status(200).json({ "promovisano": "ok" });
        } 
    });
});

router.route('/ukloni-promociju-nekretnine').post(async (req, res) => {
    console.log("/ukloni-promociju-nekretnine")
    const filter = {
        id: req.body.id
    };

    let doc = await nekretnina.findOneAndUpdate(filter, {jePromovisana:"false"}, {}, function (err, doc) {
        if(err) console.log(err);
        else{
            return res.status(200).json({ "promovisano": "ok" });
        } 
    });
});

router.route('/prihvati-prodaju').post(async (req, res) => {
    console.log("/prihvati-prodaju")
    const filter = {
        nekretninaId: req.body.nekretninaId
    };

    let doc = await prodaje.findOneAndUpdate(filter, {stanje:"prihvaceno"}, {}, function (err, doc) {
        if(err) console.log(err);
        else{
            const filter2 = {
                id: req.body.nekretninaId
            };
            nekretnina.findOneAndUpdate(filter2, {stanje:"prodato"}, {}, function (err, doc) {
                if(err) console.log(err);
                else{
                    return res.status(200).json({ "prihvati_prodaju": "ok" });
                } 
            });
        } 
    });
});
router.route('/odbij-prodaju').post(async (req, res) => {
    console.log("/prihvati-prodaju")
    const filter = {
        nekretninaId: req.body.nekretninaId
    };

    let doc = await prodaje.findOneAndUpdate(filter, {stanje:"odbijeno"}, {}, function (err, doc) {
        if(err) console.log(err);
        else{
            return res.status(200).json({ "odbij_prodaju": "ok" });
        } 
    });
});

//*****************************************************************************
//[PORUKE]
//*****************************************************************************
router.route('/dodaj-poruku').post((req,res)=>{
    let kupac = req.body.kupac;
    let prodavac = req.body.prodavac;
    let naslov = req.body.naslov;
    let nekretninaId = req.body.nekretninaId;
    let stanje = "chat";

    //---------------
    let sadrzaj = req.body.sadrzaj;

    blok_lista.findOne({'user1':kupac,'user2':prodavac}, {}, { }, function (err,user) {
        if (!user)
        {
            blok_lista.findOne({'user1':prodavac,'user2':kupac}, {}, { }, function (err,userFound){
                if (!userFound){
                    let nextId = 1;
                    let porukaNextId = 1;
                    konverzacija.findOne({'kupac':kupac,'prodavac':prodavac, 'naslov':naslov}, function (err, p) {
                        if (!p)
                        {
                            console.log("[konverzacija ne postoji]");
                            
                            konverzacija.findOne({}, {}, { sort: { 'id': -1 } }, function (err, p) {
                                if (!p)
                                    nextId = 1;
                                else
                                    nextId =p.id + 1;
                                
                                let data = {
                                    id: nextId,
                                    kupac: kupac,
                                    prodavac: prodavac,
                                    naslov: naslov,
                                    nekretninaId: String(nekretninaId),
                                    stanje: stanje,
                                    postojiPonuda:"false",
                                    vrednostPonude: 0,
                                    jePrihvacena:"false"       
                                }     
                                konverzacija.collection.insertOne(data);
                                              
                                poruka.findOne({}, {}, { sort: { 'id': -1 } }, function (err, p) {
                                    if (!p)
                                        porukaNextId = 1;
                                    else
                                        porukaNextId =p.id + 1;
                
                                    let data = {
                                        id: porukaNextId,
                                        posiljalac: kupac,
                                        idKonverzacija: String(nextId),
                                        sadrzaj: sadrzaj,
                                        datumSlanja: new Date(),
                                        jeProcitana: "false", 
                                        jePonuda: "false",
                                        vrednostPonude: 0
                                    }     
                                    
                                    poruka.collection.insertOne(data);                   
                                });
                                return res.status(200).json({ "dodavanje_konverzacija": "ok" });
                                
                            });
                
                        }else{
                            console.log("**konverzacija postoji**");
                            
                            poruka.findOne({}, {}, { sort: { 'id': -1 } }, function (err,por) {
                                if (!por)
                                    porukaNextId = 1;
                                else
                                    porukaNextId =por.id + 1;
                                    console.log(Number(por.id))
                                    console.log(porukaNextId)
                                let data = {
                                    id: porukaNextId,
                                    posiljalac: kupac,
                                    idKonverzacija: String(p.id),
                                    sadrzaj: sadrzaj,
                                    datumSlanja: new Date(),
                                    jeProcitana: "false", 
                                    jePonuda: "false",
                                    vrednostPonude: 0     
                                }     
                                
                                poruka.collection.insertOne(data);                   
                            });
                            return res.status(200).json({ "dodavanje_konverzacija": "ok" });
                            
                        }   
                    });
                }
                else
                {
                    return res.status(200).json({ "dodavanje_konverzacija": "Korisnik je vec blokiran" }); 
                }
            
            });   
        }
        else
        {
            return res.status(200).json({ "dodavanje_konverzacija": "Korisnik je vec blokiran" }); 
        }                            
    });
    //-------------------------
    
   
});

router.route('/dohvati-konverzacije-username').post((req, res) => {
    
    konverzacija.find({'kupac':req.body.username}, (err, korisnici) => {
        if (err) {
            console.log(err);
        }
        else {
            let konverzacije : any[] = [];

            korisnici.forEach(kor =>{
                konverzacije.push(kor);
            })
           

            konverzacija.find({'prodavac':req.body.username}, (err, korisn) => {
                if (err) {
                    console.log(err);
                }
                else {
                    korisn.forEach(kor =>{
                        konverzacije.push(kor);
                    })

                    return res.json(konverzacije)
                }
            });
        }
    });

    console.log("get=>getUsers()")
});


router.route('/dohvati-poruke-jedne-konverzacije').post((req, res) => {   
    poruka.find({'idKonverzacija': req.body.id},(err,user)=>{
        if(err) console.log(err);
        else   
            return res.json(user);
    }); 
});

router.route('/dodaj-poruku-u-konverzaciju').post(async (req, res) => {
    console.log("/dodaj-poruku-u-konverzaciju")
    let porukaNextId  = 1
    console.log(req.body.idKonverzacija)
    const filter = {
        id: Number(req.body.idKonverzacija),
        stanje: "chat"
    };
    konverzacija.findOne({'id':req.body.idKonverzacija,'stanje':"chat"}, {}, {}, function (err,k){
        if(k){
            console.log("hello")
            poruka.findOne({}, {}, { sort: { 'id': -1 } }, function (err,por) {
                if (!por)
                    porukaNextId = 1;
                else
                    porukaNextId =por.id + 1;
                let data = {
                    id: porukaNextId,
                    posiljalac: req.body.posiljalac,
                    idKonverzacija: String(req.body.idKonverzacija),
                    sadrzaj: req.body.sadrzaj,
                    datumSlanja: new Date(),
                    jeProcitana: "false", 
                    jePonuda: "false",
                    vrednostPonude: 0    
                }     
                
                poruka.collection.insertOne(data);      
                return res.status(200).json({ "dodavanje-jedne-poruke": "ok" });             
            });
        }else{
            const filter2 = {
                id: Number(req.body.idKonverzacija),
                stanje: "arhiva"
            };
            konverzacija.findOne({'id':req.body.idKonverzacija,'stanje':"arhiva"}, {}, {}, function (err,k2){
                if(k2){
                    console.log("hello")
                    poruka.findOne({}, {}, { sort: { 'id': -1 } }, function (err,por) {
                        if (!por)
                            porukaNextId = 1;
                        else
                            porukaNextId =por.id + 1;
                        let data = {
                            id: porukaNextId,
                            posiljalac: req.body.posiljalac,
                            idKonverzacija: String(req.body.idKonverzacija),
                            sadrzaj: req.body.sadrzaj,
                            datumSlanja: new Date(),
                            jeProcitana: "false", 
                            jePonuda: "false",
                            vrednostPonude: 0    
                        }     
                        
                        poruka.collection.insertOne(data);      
                        return res.status(200).json({ "dodavanje-jedne-poruke": "ok" });             
                    }); 
                }else{
                    return res.status(200).json({ "dodavanje-jedne-poruke": "Blokiran chat, dodavanje poruke neuspesno!" });     
                }
            });     
        }
    });
   
});

router.route('/blokiraj-korisnika').post(async (req, res) => {
    console.log("/blokiraj-korisnika")
    let porukaNextId  = 1
    blok_lista.findOne({'user1':req.body.user1,'user2':req.body.user2}, {}, { }, function (err,user) {
        if (!user)
        {
            blok_lista.findOne({'user1':req.body.user2,'user2':req.body.user1}, {}, { }, function (err,userFound){
                if (!userFound){
                    let data = {
                        user1: req.body.user1,
                        user2: req.body.user2        
                    }  
                    
                    blok_lista.collection.insertOne(data);      
                    
                    const filter = {
                        kupac: req.body.user1,
                        prodavac: req.body.user2
                    };
                
                    let doc = konverzacija.find(filter, {}, {}, function (err, doc) {
                        if(err) console.log(err);
                        else{
                            doc.forEach(res =>{
                                konverzacija.collection.updateOne({"id":res.id}, {$set: {'stanje': "blok"}});
                            })
                            console.log("kurac");
                            const filter = {
                                kupac: req.body.user2,
                                prodavac: req.body.user1
                            };
                            konverzacija.find(filter, {}, {}, function (err, doc) {
                                doc.forEach(res =>{
                                    konverzacija.collection.updateOne({"id":res.id}, {$set: {'stanje': "blok"}});
                                })
                            });
                        } 
                    });

                    return res.status(200).json({ "blokiranje": "ok" }); 
                }
                else
                {
                    return res.status(200).json({ "blokiranje": "Korisnik je vec blokiran" }); 
                }
            
            });   
        }
        else
        {
            return res.status(200).json({ "blokiranje": "Korisnik je vec blokiran" }); 
        }                            
    });
});

router.route('/odblokiraj-korisnika').post(async (req, res) => {
    console.log("/odblokiraj-korisnika")
    blok_lista.findOne({'user1':req.body.user1,'user2':req.body.user2}, {}, { }, function (err,userFound){
        if (userFound){
            let data = {
                user1: req.body.user1,
                user2: req.body.user2        
            }  
            
            blok_lista.collection.deleteOne(data);  
            
            const filter = {
                kupac: req.body.user1,
                prodavac: req.body.user2
            };
        
            let doc = konverzacija.find(filter, {}, {}, function (err, doc) {
                if(err) console.log(err);
                else{
                    doc.forEach(res =>{
                        konverzacija.collection.updateOne({"id":res.id}, {$set: {'stanje': "chat"}});
                    })
                    console.log("kurac");
                    const filter = {
                        kupac: req.body.user2,
                        prodavac: req.body.user1
                    };
                    konverzacija.find(filter, {}, {}, function (err, doc) {
                        doc.forEach(res =>{
                            konverzacija.collection.updateOne({"id":res.id}, {$set: {'stanje': "chat"}});
                        })
                    });
                } 
            });

            return res.status(200).json({ "odblokiranje": "ok" }); 
        }
        else
        {
            return res.status(200).json({ "odblokiranje": "Nemate pravo odblokiranja ili korisnik ne postoji!" }); 
        }
    
    });   
    
});

router.route('/arhiviraj-konverzaciju').post(async (req, res) => {
    console.log("/arhiviraj-konverzaciju")
    const filter = {
        id: req.body.id
    };

    let doc = await konverzacija.findOneAndUpdate(filter, {stanje:"arhiva"}, {}, function (err, doc) {
        if(err) console.log(err);
        else{
            return res.status(200).json({ "arhiva": "ok" });
        } 
    });
});

router.route('/izbaci-iz-arhive-konverzaciju').post(async (req, res) => {
    console.log("/izbaci-iz-arhive-konverzaciju")
    const filter = {
        id: req.body.id
    };

    let doc = await konverzacija.findOneAndUpdate(filter, {stanje:"chat"}, {}, function (err, doc) {
        if(err) console.log(err);
        else{
            return res.status(200).json({ "arhiva": "ok" });
        } 
    });
});

router.route('/posalji-ponudu').post(async (req, res) => {
    console.log("/posalji-ponudu")
    const filter = {
        id: req.body.chatId
    };

    let doc = await konverzacija.findOneAndUpdate(filter, {postojiPonuda:"true",trenutnaVrednost:req.body.trenutnaVrednost}, {}, function (err, doc) {
        if(err) console.log(err);
        else{
            const filter = {
                idKonverzacija: req.body.chatId,
                jePonuda:"true"
            };
            poruka.findOne(filter, {}, {}, function (err, doc) {
                if(doc){
                    console.log(doc.id)
                    poruka.collection.updateOne({id:doc.id}, {$set: {vrednostPonude: req.body.trenutnaVrednost }});
                    return res.status(200).json({ "posalji-ponudu": "ok" });
                }else{
                    console.log("ne postoji")
                    let porukaNextId  = 1
                    poruka.findOne({}, {}, { sort: { 'id': -1 } }, function (err,por) {
                        if (!por)
                            porukaNextId = 1;
                        else
                            porukaNextId =por.id + 1;
                        console.log(req.body.chatId)
                        console.log(req.body.trenutnaVrednost)
                        let sadrzajImport  = "Postovani, moja ponuda za Vasu nekretninu iznosi:" + req.body.trenutnaVrednost;
                        let data = {
                            id: porukaNextId,
                            posiljalac: req.body.posiljalac,
                            idKonverzacija: String(req.body.chatId),
                            sadrzaj: sadrzajImport,
                            datumSlanja: new Date(),
                            jeProcitana: "false", 
                            jePonuda: "true",
                            vrednostPonude: Number(req.body.trenutnaVrednost)     
                        }     
                        
                        poruka.collection.insertOne(data);                 
                    });
                    
                    return res.status(200).json({ "posalji-ponudu": "ok" });
                }
                
            });
            

        } 
    });
});

router.route('/prihvati-ponudu').post(async (req, res) => {
    console.log("/prihvati-ponudu")
    const filter = {
        id: req.body.chatId
    };

    konverzacija.findOneAndUpdate(filter, {jePrihvacena:"true"}, {}, function (err, doc) {
        if(err) console.log(err);
        else{
            
            let porukaNextId  = 1
            poruka.findOne({}, {}, { sort: { 'id': -1 } }, function (err,por) {
                if (!por)
                    porukaNextId = 1;
                else
                    porukaNextId =por.id + 1;
                console.log(req.body.chatId)
                console.log(req.body.trenutnaVrednost)
                let data = {
                    id: porukaNextId,
                    posiljalac: req.body.username,
                    idKonverzacija: String(req.body.chatId),
                    sadrzaj: "",
                    datumSlanja: new Date(),
                    jeProcitana: "false", 
                    jePonuda: "prihvacena",
                    vrednostPonude: 0     
                }     
                
                poruka.collection.insertOne(data);  

                let data2 = {     
                    kupac: doc.toObject().kupac,
                    prodavac: req.body.username,
                    iznos: doc.toObject().trenutnaVrednost,
                    nekretninaId: doc.toObject().nekretninaId,
                    stanje:"cekanje"
                }  
                prodaje.collection.insertOne(data2);
            });
            
            return res.status(200).json({ "prihvati-ponudu": "ok" });
        }
                  
    });
});

router.route('/odbij-ponudu').post(async (req, res) => {
    console.log("/odbij-ponudu")
    const filter = {
        id: req.body.chatId
    };

    konverzacija.findOneAndUpdate(filter, {jePrihvacena:"false",postojiPonuda:"false",trenutnaVrednost:0}, {}, function (err, doc) {
        if(err) console.log(err);
        else{
            const filter2 = {
                idKonverzacija: req.body.chatId,
                jePonuda:"true"
            };
            poruka.findOneAndUpdate(filter2, {jePonuda:"false",vrednostPonude:0}, {}, function (err, doc) {
                let porukaNextId  = 1
                poruka.findOne({}, {}, { sort: { 'id': -1 } }, function (err,por) {
                    if (!por)
                        porukaNextId = 1;
                    else
                        porukaNextId =por.id + 1;

                    
                    let data = {
                        id: porukaNextId,
                        posiljalac: req.body.username,
                        idKonverzacija: String(req.body.chatId),
                        sadrzaj: "Ponuda je odbijena! Ponudi mi bolji iznos, kako bih prihvatio tvoju ponudu!",
                        datumSlanja: new Date(),
                        jeProcitana: "false", 
                        jePonuda: "false",
                        vrednostPonude: 0     
                    }     
                    
                    poruka.collection.insertOne(data);                 
                });
                
                return res.status(200).json({ "odbij-ponudu": "ok" });
            });
            
        }
                  
    });
});


app.use('/', router);
app.listen(4000, () => console.log(`Express server running on port 4000`));