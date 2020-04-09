'use strict';

var Processar = require('../services/processar.js');

module.exports = function DadosModel(aeroporto, nuvens, terreno) {

  var retorno = new Processar(aeroporto, nuvens, terreno);

  return {
    mapas: retorno.mapas,
    dias: retorno.dias,
    diasAeroportoCoberto: retorno.diasAeroportoCoberto
  };
};