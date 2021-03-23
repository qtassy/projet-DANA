const express = require('express')
const cors = require('cors');
const mysql = require('mysql');

let app = express();
app.use(cors());

require('dotenv').config({path:"mdp.env"})

// Middleware
app.use(express.json())

app.listen(7144, () => {
  console.log('Serveur cartonVirtuel à lécoute')
})


// Liste les infos d'une piece, nécessite idLogement --> Test valide
app.get('/pieces/:idLogement', (req,res) => {
    let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
    const idLogement = parseInt(req.params.idLogement);

	connection.connect();
    connection.query("SELECT * FROM Piece INNER JOIN LiaisonPieces ON LiaisonPieces.idPiece = Piece.idPiece WHERE LiaisonPieces.idLogement = ?", [idLogement] , function (error, result) {
        if (error) throw error;

        res.status(200).json(result);
    });
    connection.end();
})


// Liste le contenu d'un carton, nécessite idCarton --> Test valide
app.get('/contenu/:idCarton', (req,res) => {
    const idCarton = parseInt(req.params.idCarton);

    (async () => {
        return await getContenu(idCarton);
    })().then(async (result) => {
        res.status(200).json(result);
    })
})


// Affiche une liste d'objets pouvant être ajouter au carton --> Test valide
app.get('/contenus', (req,res) => {
    let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

	connection.connect();
    connection.query("SELECT * FROM `Contenu`", function (error, result) {
        if (error) throw error;

        res.status(200).json(result);
    });
    connection.end();
})


const getContenu = (idCarton) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        connection.connect();
        connection.query("SELECT * FROM `Contenu` INNER JOIN LiaisonContenu ON Contenu.idContenu = LiaisonContenu.idContenu WHERE LiaisonContenu.idCarton = " + idCarton, function (error, result) {
            if (error) throw error;
            resolve(result);
        });
        connection.end();
    })
}


 const getInfo = (idPiece) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        connection.connect();
        connection.query("SELECT Carton.idCarton, numeroCarton, (SELECT libelle FROM Piece WHERE Piece.idPiece = idPieceOrigine) AS origine,idPieceOrigine, (SELECT libelle FROM Piece WHERE Piece.idPiece = idPieceDestination) AS destination,idPieceDestination, largeur, longueur, hauteur, fragile ,couleur FROM `Carton` INNER JOIN LiaisonCartons ON LiaisonCartons.idCarton = Carton.idCarton WHERE LiaisonCartons.idPieceOrigine = ?", [idPiece] , function (error, result) {
            if (error) throw error;
            resolve(result);
        });
        connection.end();
    })
 }


// Liste les cartons d'une pièce, nécessite idPiece --> Test valide
app.get('/cartonsPiece/:idPiece', (req,res) => {
    const idPiece = parseInt(req.params.idPiece);

    (async () => {
        return await getInfo(idPiece);
    })().then(async (result) => {
        var json = result;
        for (var i = 0; i < result.length; i++) {
            json[i].contenu = await getContenu(result[i].idCarton);
        }
        console.log(json);
        res.status(200).send(json);
    })
})


// Liste les infos d'un carton, nécessite idCarton --> Test Valide
app.get('/carton/:idCarton', (req,res) => {
    let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
    const idCarton = parseInt(req.params.idCarton);

	connection.connect();
    connection.query("SELECT * FROM `Carton` WHERE `idCarton` = " + idCarton, function (error, result) {
        if (error) throw error;

        let connectionContenu = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
        connectionContenu.connect();
        connectionContenu.query("SELECT * FROM `Contenu` INNER JOIN LiaisonContenu ON Contenu.idContenu = LiaisonContenu.idContenu WHERE LiaisonContenu.idCarton = " + idCarton, function (error, resultContenu) {
            if (error) throw error;
            result.contenu = resultContenu;
            res.status(200).json(result);
        });
        connectionContenu.end();
    });
    connection.end();
})


const selectPiece = (idLogement) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        connection.connect();
        connection.query("SELECT * FROM Piece INNER JOIN LiaisonPieces ON LiaisonPieces.idPiece = Piece.idPiece WHERE LiaisonPieces.idLogement = ?", [idLogement] , function (error, result) {
            if (error) throw error;
            resolve(result);
        })
        connection.end();
    })
}


const selectNbCarton = (idPiece,libelle) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        connection.connect();
        connection.query("SELECT idCarton FROM `LiaisonCartons` WHERE `idPieceOrigine` = " + idPiece, function (error, result) {
            if (error) throw error;

            var data = {
                "idPiece": idPiece,
                "libelle": libelle,
                "nb": result.length
            };

            resolve(data);
        });
        connection.end();
    })
}



// Nombre de cartons dans une pièce, nécessite l'idPiece --> 
app.get('/lstPiece/:origine/:destination', (req,res) => {
    const origine = parseInt(req.params.origine);
    const destination = parseInt(req.params.destination);
    
    var json = {
        origine:[],
        destination: []
    };

    var resultOrigine;
    var resultDestination;

    (async () => {
        resultOrigine = await selectPiece(origine);
    })().then(async () => {
        resultDestination = await selectPiece(destination);

        for (var i = 0; i < resultOrigine.length; i++) {
            json.origine.push({id: resultOrigine[i].idPiece, libelle: resultOrigine[i].libelle});
        }

        for (var i = 0; i < resultDestination.length; i++) {
            json.destination.push({id: resultDestination[i].idPiece, libelle:resultDestination[i].libelle});
        }

        console.log(json);
        res.status(200).send(json);
    })
})


// Nombre de cartons dans une pièce, nécessite l'idPiece --> Test valide
app.get('/nbCartons/:idLogement', (req,res) => {
    const idLogement = parseInt(req.params.idLogement);
            
    var json = {
        pieces:[]
    };
    var lstIdPiece;

    (async () => {
        lstIdPiece = await selectPiece(idLogement);
    })().then(async () => {

        for (var i = 0; i < lstIdPiece.length; i++) {
            json.pieces.push(await selectNbCarton(lstIdPiece[i].idPiece, lstIdPiece[i].libelle));
        }
        console.log(json);
        res.status(200).send(json);
    })
})


const ajoutPiece = (libelle) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        connection.connect();
        connection.query("INSERT INTO `Piece` (`libelle`) VALUES (?)", [libelle] , function (error, result) {
            if (error) throw error;
            resolve(result);
        });
        connection.end();
    })
}


const ajoutLogement = (libelle) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        connection.connect();
        connection.query("INSERT INTO `Logement` (`adresse`) VALUES (?)", [libelle] , function (error, result) {
            if (error) throw error;
            resolve(result);
        });
        connection.end();
    })
}


const ajoutDemenagement = (date,nomProjet,idOrigine,idArrive) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        connection.connect();
        connection.query("INSERT INTO `Demenagement`(`dateDemenagement`, `nomProjet`, `idLogementActuel`, `idLogementArrive`) VALUES (?,?,?,?)", [date,nomProjet,idOrigine,idArrive] , function (error, result) {
            if (error) throw error;
            resolve(result);
        });
        connection.end();
    })
}


const liaisonClientDemenagement = (idDemenagement,idClient) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        console.log(idClient);

        connection.connect();
        connection.query("INSERT INTO `LiaisonClient`(`idDemenagement`, `idClient`) VALUES (?,?)", [idDemenagement,idClient] , function (error, result) {
            if (error) throw error;
            resolve();
        });
        connection.end();
    })
}


const getLogements = (idDemenagement) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        connection.connect();
        connection.query("SELECT `idLogementActuel`, `idLogementArrive` FROM `Demenagement` WHERE `idDemenagement` = ?", [idDemenagement] , function (error, result) {
            if (error) throw error;
            var json = {
                origin: result[0].idLogementActuel,
                destination: result[0].idLogementArrive
            };
            resolve(json);
        });
        connection.end();
    })
}


// Ajoute un demenagement dans le demenagement du client, nécessite date, nomProjet, adresseOrigine, adresse Arrive --> 
app.post('/ajtDemenagement', (req,res) => {
    console.log("Appel de ajtDemenagement");
    
    const date = req.body.dateProjet;
    const nomProjet = req.body.nomProjet;
    const adresseOrigine = req.body.adresseActuelle;
    const adresseArrive = req.body.adresseFutur;
    const idClient = req.body.idClient;

    console.log(req.body);

    (async () => {
        return await ajoutLogement(adresseOrigine);
    })().then(async (adrOrigine) => {
        var adrArrive = await ajoutLogement(adresseArrive);

        if(adrOrigine != undefined && adrArrive != undefined) {
            var idOrigine = adrOrigine.insertId;
            var idArrive = adrArrive.insertId;
    
            var resultAjt = await ajoutDemenagement(date,nomProjet,idOrigine,idArrive);
            if(resultAjt !== undefined) {
                await liaisonClientDemenagement(resultAjt.insertId,idClient);
                res.status(200).send(await getLogements(resultAjt.insertId));
            } else {
                res.status(409).send({ erreur: "Erreur lors de la création de démenagement"});
            }

        } else {
            res.status(409).send({ erreur: "Erreur lors de la création des logements"});
        }
    })
})

// Ajoute un logement dans le demenagement du client, nécessite libelle, idDemenagement, type (origine / arrive) --> Test valide
app.post('/ajtLogement', (req,res) => {
    console.log("Appel de ajtLogement");
    let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
    const libelle = req.body.libelle;

    (async () => {
        return await ajoutLogement(libelle);
    })().then(async (resultAjt) => {
        if(resultAjt != undefined) {
            var resultIdLogement = resultAjt.insertId;

            connection.connect();
            connection.query("INSERT INTO `LiaisonClient`(`idDemenagement`, `idLogement`) VALUES (?,?)", [idDemenagement,resultIdLogement] , function (error, result) {
                if (error) throw error;
                res.status(200).send({ message: "Le logement a bien été ajouté"});
            });
            connection.end();
        } else {
            res.status(409).send({ erreur: "Erreur lors de l'ajout du logement"});
        }
    })
})


const liaisonPiece = (idLogement,idPiece) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
        
        connection.connect();
        connection.query("INSERT INTO `LiaisonPieces`(`idLogement`, `idPiece`) VALUES (?,?)", [idLogement,idPiece] , function (error, result) {
            if (error) throw error;
            resolve();
        });
        connection.end();
    })
}


// Ajoute une pièce dans le logement du client, nécessite idLogement, liste de pieces --> Test valide
app.post('/ajtPieces', (req,res) => {
    console.log("Appel de ajtPiece");

    const idLogement = parseInt(req.body.idLogement);
    var pieces = req.body.pieces;
    var lstIdPiece = [];

    var existe = false;
    console.log(req.body);

    (async () => {
        lstPiecesOrigine = await selectPiece(idLogement);
        for (var i = 0; i < pieces.length; i++) {
            existe = false;
            lstPiecesOrigine.forEach(element => {
                if(element.libelle === pieces[i].nom) {
                    existe = true;
                }
            });

            if(!existe) {
                lstIdPiece.push(await ajoutPiece(pieces[i].nom));  
            }
        }
    })().then(async () => {
        for (var i = 0; i < lstIdPiece.length; i++) {
            await liaisonPiece(idLogement,lstIdPiece[i].insertId);
            
            if (i === lstIdPiece.length - 1){
                res.status(200).send({ message: "Les pièces ont bien été ajoutées"});
            }
        }
    })
})


const updatePiece = (libelle,idPiece,res) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
        connection.connect();
        connection.query("UPDATE `Piece` SET `libelle`= ? WHERE `idPiece` = ?", [libelle,idPiece] , function (error, result) {
            if (error) {
                res.status(409).send({ erreur: "Erreur lors de la mise à jour de la pièce"});
                resolve();
            }
            res.status(200).send({ message: "La pièce a bien été modifié"});
            resolve();
        });
        connection.end();
    })
}


// Modifie le libelle de la pièce, nécessite idPiece, libelle --> Test valide
app.post('/modifPiece', (req,res) => {
    const idPiece = parseInt(req.body.idPiece);
    const libelle = req.body.libelle;
    var existe = false;

    (async () => {
        return await selectPiece(idLogement);
    })().then(async (lstPiecesOrigine) => {
        lstPiecesOrigine.forEach(element => {
            if(element.libelle === libelle) {
                existe = true;
            }
        });

        if(!existe) {
            await updatePiece(pieces[i].nom,idPiece,res);
        } else {
            res.status(409).send({ erreur: "Le libelle saisie existe déjà"});
        }
    })
})


// Supprimer une pièce, nécessite idPiece --> Test valide
app.post('/supprPiece', (req,res) => {
    let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
    const idPiece = parseInt(req.body.idPiece);

    connection.connect();
    connection.query("DELETE FROM `Piece` WHERE `idPiece` = ?", [idPiece] , function (error, result) {
        if (error) throw error;
        res.status(200).send({ message: "La pièce a bien été supprimé"});
    });
    connection.end();
})


// Ajoute un contenu dans la liste contenus, permet de lister des contenus souvent réutiliser --> Test valide
app.post('/ajtNouveauContenu', (req,res) => {
    let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
    const descriptif = req.body.descriptif;

    // Vérifier que le contenu n'existe pas déjà
    connection.connect();
    connection.query("INSERT INTO `Contenu` (`descriptif`) VALUES (?)", [descriptif] , function (error, result) {
        if (error) throw error;
        res.status(200).send({ message: "Le nouveau contenu à bien été ajouter"});
    });
    connection.end();
})


const ajoutContenu = (idCarton,idContenu) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        connection.connect();
        connection.query("INSERT INTO `LiaisonContenu` (`idCarton`, `idContenu`) VALUES (?,?)", [idCarton,idContenu] , function (error, result) {
            if (error) throw error;
            resolve(result);
        });
        connection.end();
    })
}


const liaisonCartonPiece = (idCarton, pieceOrigine, pieceArrive) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        console.log("Piece Arrive" + pieceArrive);
        console.log("Piece Origine" + pieceOrigine);
        connection.connect();
        connection.query("INSERT INTO `LiaisonCartons`(`idCarton`, `idPieceOrigine`, `idPieceDestination`) VALUES (?,?,?)", [idCarton, pieceOrigine,pieceArrive] , function (error, result) {
            if (error) throw error;
            resolve(result);
        });
        connection.end();
    })
}


const insertCarton = (req) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
        
        const numeroCarton = parseInt(req.body.numeroCarton);
        const largeur = parseFloat(req.body.largeur);
        const longueur = parseFloat(req.body.longueur);
        const hauteur = parseFloat(req.body.hauteur);
        const couleur = req.body.couleur;
        const image = req.body.image;
        const fragile = req.body.fragile;
        const poids = parseInt(req.body.poids);

        connection.connect();
        connection.query("INSERT INTO `Carton` (`numeroCarton`, `largeur`, `longueur`, `hauteur`, `couleur`, `image`, `fragile`, `poids`) VALUES (?,?,?,?,?,?,?,?)", [numeroCarton,largeur,longueur,hauteur,couleur,image,fragile,poids] , function (error, result) {
            if (error) throw error;
            resolve(result);
        });
        connection.end();
    })
}

// vérifie si le carton existe dans le logement
const verifyNumCarton = (numeroCarton,idLogement) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
        connection.connect();
        connection.query("SELECT `numeroCarton` FROM `Carton` INNER JOIN LiaisonCartons ON LiaisonCartons.idCarton = Carton.idCarton INNER JOIN LiaisonPieces ON LiaisonPieces.idPiece = LiaisonCartons.idPieceOrigine WHERE `idLogement` = ? AND `numeroCarton` = ?", [idLogement,numeroCarton] , function (error, result) {
            if (error) throw error;
            resolve(result);
        });
        connection.end();
    })
}

// Ajoute un carton dans une pièce avec tout son contenu --> Test valide
app.post('/ajtCarton', (req,res) => {
    console.log("Ajout de carton");
    console.log(req.body);

    const pieceOrigine = parseInt(req.body.pieceOrigine);
    const pieceArrive = parseInt(req.body.pieceArrive);
    const contenus = req.body.contenus;
    const numeroCarton = req.body.numeroCarton;

    if(pieceArrive !== undefined && pieceOrigine !== undefined && contenus !== undefined && numeroCarton !== undefined) {
        (async () => {
            return await verifyNumCarton(numeroCarton,pieceOrigine);
        })().then(async (result) => {
            if (result.length === 0) {
                if(contenus != undefined) {
                    (async () => {
                        return await insertCarton(req);
                    })().then(async (resultAjtCarton) => {
                            var idCarton = resultAjtCarton.insertId;
                            await liaisonCartonPiece(idCarton, pieceOrigine, pieceArrive);
            
                            for (var i = 0; i < contenus.length; i++) {
                                await ajoutContenu(idCarton, contenus[i]);
                            }
                            res.status(200).send({ message: "Le carton N°"+ numeroCarton +"a bien été ajouté"});    
                    })
                } else {
                    res.status(409).send({ erreur: "Aucun contenu"});
                }
            } else {
                res.status(409).send({ erreur: "Numéro carton déjà utilisé dans le logement"});
            }
        })
    } else {
        res.status(409).send({ erreur: "Données manquantes"});
    }
})


const updateCarton = (req) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        const idCarton = req.body.idCarton;
        const numeroCarton = req.body.numeroCarton;
        const largeur = req.body.largeur;
        const longueur = req.body.longueur;
        const hauteur = req.body.hauteur;
        const couleur = req.body.couleur;
        const image = req.body.image;
        const fragile = req.body.fragile;
        const poids = req.body.poids;


        // vérifier que le numéro carton n'est pas déjà existant
        connection.connect();
        connection.query("UPDATE `Carton` SET `numeroCarton`=?,`largeur`=?,`longueur`=?,`hauteur`=?, `couleur`=?,`image`=?,`fragile`=?,`poids`=? WHERE `idCarton` = ?", [numeroCarton,largeur,longueur,hauteur,couleur,image,fragile,poids,idCarton] , function (error, result) {
            if (error) throw error;
            resolve(result);
        });
        connection.end();
    })
}


const updateLiaisonCarton = (req) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
        const idCarton = req.body.idCarton;
        const nouvellePieceOrigine = req.body.nouvellePieceOrigine;
        const nouvellePieceArrive = req.body.nouvellePieceArrive;

        connection.connect();
        connection.query("UPDATE `LiaisonCartons` SET `idPieceOrigine`=?, `idPieceDestination`=? WHERE `idCarton` = ?", [nouvellePieceOrigine,nouvellePieceArrive,idCarton] , function (error, result) {
            if (error) throw error;
            resolve(result);
        });
        connection.end();
    })
}


const supprLiaisonContenu = (idCarton) => {
    return new Promise((resolve) => {
        let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});

        connection.connect();
        connection.query("DELETE FROM `LiaisonContenu` WHERE `idCarton` = ?", [idCarton] , function (error, result) {
            if (error) throw error;
            resolve(result);
        });
        connection.end();
    })
}


// Modifie un carton, son contenu et son origine. Nécessite les infos, origine, liste de contenu --> Test valide
app.post('/modifCarton', (req,res) => {
    const contenus = req.body.contenus;
    const idCarton = req.body.idCarton; 

    (async () => {
        await updateCarton(req);
    })().then(async () => {
        await updateLiaisonCarton(req);
        await supprLiaisonContenu(idCarton);

        for (var i = 0; i < contenus.length; i++) {
            await ajoutContenu(idCarton, contenus[i]);
        }
        res.status(200).send({ message: "Le carton a bien été modifié"});
    })
})


// Supprime un carton, nécessite idCarton --> Test valide
app.post('/supprCarton', (req,res) => {
    let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
    const idCarton = req.body.idCarton;

    connection.connect();
    connection.query("DELETE FROM `Carton` WHERE `idCarton` = ?", [idCarton] , function (error, result) {
        if (error) throw error;

        res.status(200).send({ message: "Le carton a bien été supprimé"});
    });
    connection.end();
})


// Recupère les logements concernés par le demenagement, nécessite idCompte -->
app.get('/getDemenagement/:idCompte', (req,res) => {
    let connection = mysql.createConnection({host: process.env.DB_HOST, user: process.env.DB_USER, password: process.env.DB_PASSWORD, database: process.env.DB_DATABASE});
    const idCompte = parseInt(req.params.idCompte);

	connection.connect();
    connection.query("SELECT Demenagement.idLogementActuel, Demenagement.idLogementArrive FROM `Demenagement` INNER JOIN LiaisonClient ON LiaisonClient.idDemenagement = Demenagement.idDemenagement INNER JOIN ProfilClient ON ProfilClient.idClient = LiaisonClient.idClient INNER JOIN Compte ON Compte.idCompte = ProfilClient.idCompte WHERE Compte.idCompte = ?", [idCompte] , function (error, result) {
        if (error) throw error;

        let response = null;   
        if (result[0] === undefined) {
            response = {};
        } else {
            response ={
                origin : result[0].idLogementActuel,
                destination : result[0].idLogementArrive
            }
        }
        console.log(response);
        res.status(200).json(response);
    });
    connection.end();
})