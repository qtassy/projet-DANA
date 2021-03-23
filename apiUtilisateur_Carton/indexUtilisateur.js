const express = require('express')
const cors = require('cors');
const mysql = require('mysql');

let app = express();
app.use(cors());

require('dotenv').config({path:"mdp.env"})

// Middleware
app.use(express.json())

app.listen(7145, () => {
  console.log('Serveur utilisateur à lécoute')
})


// Login, nécessite un "login" et "pass" pour tester la connexion avec la base --> Test valide
app.post('/login', (req, res) => {
	let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

	const login = req.body.login;
	const mdp = req.body.pass;

    console.log(req.body);

    connection.connect();
	connection.query("Select `idCompte`,`typeCompte` from Compte Where login = ? and mdp = ?", [login, mdp], (err, result) => { 
		if(err) {	
	        res.send({err: err})  		
		}	

		if(Object.keys(result).length !== 0) {		
		    if(result[0].typeCompte == 0) {
                let connectionSelectUtil = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
                connectionSelectUtil.connect();
                connectionSelectUtil.query("SELECT `idClient`,`idCompte` FROM `ProfilClient` WHERE `idCompte` = ?", [result[0].idCompte], (err, resultSelect) => { 
                    if(err) {	
                        res.send({err: err})  		
                    }	

                    resultSelect[0].type = result[0].typeCompte;
                    res.status(200).send(resultSelect[0]);
                })
                connectionSelectUtil.end();
            } else {
                let connectionSelectPro = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
                connectionSelectPro.connect();
                connectionSelectPro.query("SELECT `idProfessionnel` FROM `ProfilProfessionnel` WHERE `idCompte` = ?", [result[0].idCompte], (err, resultSelect) => { 
                    if(err) {	
                        res.send({err: err})  		
                    }	
    
                    resultSelect[0].type = result[0].typeCompte;
                    res.status(200).send(resultSelect[0]);
                })
                connectionSelectPro.end();
            }
		} else {	
	     	res.send({id: -1})		
		}	
	})
	connection.end();     
})


const creationCompte = (email,mdp,typeCompte) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
    
        connection.connect();
        connection.query("INSERT INTO `Compte`(`login`, `mdp`, `typeCompte`) VALUES (?,?,?)", [email,mdp,typeCompte], (err, result) => {
            if(err) {	
                res.send({err: err})  		
            }
            resolve(result);
        })
        connection.end();
    })
}


const insertClient = (req,res,idCompte) => {
    return new Promise((resolve) => {
        const nom = req.body.nom;
        const prenom = req.body.prenom;
        const email = req.body.email;
        const photo = req.body.photo;
        const telephone = req.body.telephone;

        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
        
        connection.connect();
        connection.query("INSERT INTO `ProfilClient` (`nom`, `prenom`, `email`, `photo`, `telephone`, `idCompte`) VALUES (?,?,?,?,?,?)", [nom,prenom,email,photo,telephone,idCompte], (err, result) => {
            if(err) {	
                res.send({err: err})  		
            }

            res.status(200).send({message: "Le compte client de "+ nom  +"  "+ prenom +" a bien été créé"});
            resolve();
        })
        connection.end();
    })
}


const verifyMail = (email) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        connection.connect();
        connection.query("SELECT `email` FROM `ProfilClient` WHERE `email` = ?", [email], (err, result) => {
            if(err) {	
                res.send({err: err})  		
            }
            resolve(result);
        })
        connection.end();
    })
}


const verifyTelephone = (telephone) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        connection.connect();
        connection.query("SELECT `telephone` FROM `ProfilClient` WHERE `telephone` = ?", [telephone], (err, result) => {
            if(err) {	
                res.send({err: err})  		
            }
            resolve(result);
        })
        connection.end();
    })
}


// Ajout d'un client et de son compte --> Test valide
app.post('/ajtClient', (req, res) => {
    const email = req.body.email;
    const mdp = req.body.mdp;
    const telephone = req.body.telephone;

    var resVerifyTel;
    var resVerifyMail;

    (async () => {
        resVerifyTel = await verifyTelephone(telephone);
        resVerifyMail = await verifyMail(email);
    })().then(async () => {
        if (resVerifyMail.length == 0 && resVerifyTel.length == 0) {
            (async () => {
                return await creationCompte(email,mdp,0);
            })().then(async (result) => {
                if (result != undefined){
                    var idCompte = result.insertId;
                    await insertClient(req,res,idCompte);
                } else {
                    res.status(409).send({erreur: "Erreur lors de la création du client"});
                }
            })
        } else {
            var json = {};

            if(resVerifyMail.length != 0) {
                json.erreurMail = "Email déjà existant";
            }

            if (resVerifyTel != 0) {
                json.erreurTel = "Numéro de telephone déjà existant";
            }
            
            console.log(json);
            res.status(409).send(json);
        }
    })
})


const selectClientFromId = (idClient) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        connection.connect();
        connection.query("SELECT `nom`, `prenom`, `email`, `telephone`, `photo`, `idCompte` FROM `ProfilClient` WHERE `idClient` = ?", [idClient], (err, result) => {
            if(err) {	
                res.send({err: err})  		
            }
            resolve(result);
        })
        connection.end();
    })
}


// Modification d'un client dans la base --> Test valide
app.post('/modifClient', (req, res) => {
    let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

    const nom = req.body.nom;
    const prenom = req.body.prenom;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const idClient = req.body.idClient;
    const photo = req.body.photo;
    const mdp = req.body.mdp;

    (async () => {
        return await selectClientFromId(idClient);
    })().then(async (result) => {
        if (result[0].nom != nom || result[0].prenom != prenom || result[0].telephone != telephone || result[0].email != email || result[0].mdp != mdp || result[0].photo != photo) {
            var resultMail = await verifyMail(email);
            if(resultMail.length == 0 || resultMail.length == 1 && resultMail[0].idClient == idClient) {
                if (result[0].email != email || result[0].mdp != mdp) {
                    connection.connect();
                    connection.query("UPDATE `Compte` SET `login`=?,`mdp`=? WHERE `idCompte` = ?", [email,mdp,result[0].idCompte], (err, resultUpda) => {
                        if(err) {	
                            res.send({err: err})  		
                        }
                    })
                    connection.end();
                }
                
                let connectionCli = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
                connectionCli.connect();
                connectionCli.query("UPDATE `ProfilClient` SET `nom`=?,`prenom`=?,`email`=?,`telephone`=?,`photo`=? WHERE `idClient` = ?", [nom,prenom,email,telephone,photo,idClient], (err, resultUpdate) => {
                    if(err) {	
                        res.send({err: err})  		
                    }
                    res.status(200).send({message: "L'utilisateur N°"+result[0].idCompte+" a bien été modifié"});
                })
                connectionCli.end();
            } else {
                res.status(409).send({erreur: "Email utilisateur déjà utilisé"});
            }
        } else {
            res.status(409).send({erreur: "Aucun changement, requête non effectué"});
        }
    })
})


const insertPro = (req,res,idCompte) => {
    return new Promise((resolve) => {

        const email = req.body.email;
        const telephone = req.body.telephone;
        const urlSite = req.body.urlSite;
        const nomEntreprise = req.body.nomEntreprise;
        const adresseEntreprise = req.body.adresseEntreprise;

        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
        
        connection.connect();
        connection.query("INSERT INTO `ProfilProfessionnel`(`adresseEntreprise`,`nomEntreprise`, `urlSite`, `email`, `telephone`,`idCompte`) VALUES (?,?,?,?,?,?)", [adresseEntreprise,nomEntreprise,urlSite,email,telephone,idCompte], (err, result) => {
            if(err) {
                console.log(err);
                res.send({err: err})  		
            }
            res.status(200).send({message: "Le compte professionnel de "+ nomEntreprise +" a bien été créé"});
            resolve();
        })
        connection.end();
    })
}


const verifyMailPro = (email) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        connection.connect();
        connection.query("SELECT `email` FROM `ProfilProfessionnel` WHERE `email` = ?", [email], (err, result) => {
            if(err) {	
                res.send({err: err})  		
            }
            resolve(result);
        })
        connection.end();
    })
}


const verifyTelephonePro = (telephone) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        connection.connect();
        connection.query("SELECT `telephone` FROM `ProfilProfessionnel` WHERE `telephone` = ?", [telephone], (err, result) => {
            if(err) {	
                res.send({err: err})  		
            }
            resolve(result);
        })
        connection.end();
    })
}


// Ajout d'un Pro et de son compte --> Test valide
app.post('/ajtPro', (req, res) => {
    const email = req.body.email;
    const mdp = req.body.mdp;
    const telephone = req.body.telephone;

    var resVerifyTel;
    var resVerifyMail;

    (async () => {
        resVerifyTel = await verifyTelephonePro(telephone);
        resVerifyMail = await verifyMailPro(email);
    })().then(async () => {
        if (resVerifyMail.length == 0 && resVerifyTel.length == 0) {
            (async () => {
                return await creationCompte(email,mdp,1);
            })().then(async (result) => {
                if (result != undefined){
                    var idCompte = result.insertId;
                    await insertPro(req,res,idCompte);
                } else {
                    res.status(200).send({erreur: "Erreur lors de la création du professionnel"});
                }
            })
        } else {
            var json = {};

            if(resVerifyMail.length != 0) {
                json.erreurMail = "Email déjà existant";
            }

            if (resVerifyTel != 0) {
                json.erreurTel = "Numéro de telephone déjà existant";
            }
            
            console.log(json);
            res.status(409).send(json);
        }
    })
})

const selectProFromId = (idProfessionnel) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        connection.connect();
        connection.query("SELECT `nomEntreprise`, `urlSite`, `email`, `telephone`, `idCompte` FROM `ProfilProfessionnel` WHERE `idProfessionnel` = ?", [idProfessionnel], (err, result) => {
            if(err) {	
                res.send({err: err})  		
            }
            resolve(result);
        })
        connection.end();
    })
}


// Modification d'un Pro dans la base --> Test valide
app.post('/modifPro', (req, res) => {
    let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

    const nomEntreprise = req.body.nomEntreprise;
    const urlSite = req.body.urlSite;
    const email = req.body.email;
    const telephone = req.body.telephone;
    const idProfessionnel = req.body.idProfessionnel;
    const mdp = req.body.mdp;

    (async () => {
        return await selectProFromId(idProfessionnel);
    })().then(async (result) => {
        if (result[0].nomEntreprise != nomEntreprise || result[0].urlSite != urlSite || result[0].telephone != telephone || result[0].email != email || result[0].mdp != mdp) {
            var resultMail = await verifyMail(email);
            if(resultMail.length == 0 || resultMail.length == 1 && resultMail[0].idProfessionnel == idProfessionnel) {
                if (result[0].email != email || result[0].mdp != mdp) {
                    connection.connect();
                    connection.query("UPDATE `Compte` SET `login`=?,`mdp`=? WHERE `idCompte` = ?", [email,mdp,result[0].idCompte], (err, resultUpda) => {
                        if(err) {	
                            res.send({err: err})  		
                        }
                    })
                    connection.end();
                }
                
                let connectionPro = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
                connectionPro.connect();
                connectionPro.query("UPDATE `ProfilProfessionnel` SET `nomEntreprise`=?,`urlSite`=?,`email`=?,`telephone`=? WHERE `idProfessionnel` = ?", [nomEntreprise,urlSite,email,telephone,idProfessionnel], (err, resultUpdate) => {
                    if(err) {	
                        res.send({err: err})  		
                    }
                    res.status(200).send({message: "L'utilisateur N°"+result[0].idCompte+" a bien été modifié"});
                })
                connectionPro.end();
            }
        } else {
            res.status(409).send({erreur: "Aucun changement, requête non effectué"});
        }
    })
})


// Suppression d'un Pro dans la base --> Test valide
app.post('/supprCompte', (req, res) => {
    let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
	const idCompte = req.body.idCompte;

    connection.connect();
	connection.query("DELETE FROM `Compte` WHERE `idCompte` = ?", [idCompte], (err, result) => {
		if(err) {	
	        res.send({err: err})  		
		}
        res.status(200).send({message: "L'utilisateur N°"+idCompte+" a bien été supprimé"});
	})
	connection.end();
})

// Recupère les infos d'un compte client, n"cessite l'idCompte -->
app.get('/getInfosClient/:idCompte', (req,res) => {
    let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
    const idCompte = parseInt(req.params.idCompte);

	connection.connect();
    connection.query("SELECT `idClient`, `nom`, `prenom`, `email`, `telephone`, `photo` FROM `ProfilClient` WHERE `idCompte` = ?", [idCompte] , function (error, result) {
        if (error) throw error;
        res.status(200).json(result);
    });
    connection.end();
})