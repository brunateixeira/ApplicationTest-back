'use strict';

var Dados = require('../models/dados.js');

module.exports = function (router) {

    router.post('/', function (req, res) {

        var { aeroporto: aeroporto, nuvens: nuvens, terreno: terreno } = req.body;

        var retorno = new Dados(aeroporto, nuvens, terreno);

        res.json({ mapas: retorno.mapas, dias: retorno.dias, diasAeroportoCoberto: retorno.diasAeroportoCoberto })
    });
};
