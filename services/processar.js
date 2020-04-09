'use strict';


module.exports = function (aeroportos, nuvens, terreno) {

  var colunas = 0;
  var linhas = 0;

  if (terreno) {
    colunas = terreno.split('x')[0];
    linhas = terreno.split('x')[1];
  }

  if (!colunas || colunas < 10) {
    colunas = 10;
  }

  if (!linhas || linhas < 10) {
    linhas = 10;
  }

  if (!aeroportos || aeroportos < 3) {
    aeroportos = 3;
  }

  if (!nuvens || nuvens < 4) {
    nuvens = 4;
  }


  var todosMapas = [];

  var listaAeroportos = marcarPontosMapa(colunas, linhas, aeroportos, []);
  var listaNuvens = marcarPontosMapa(colunas, linhas, nuvens, listaAeroportos);

  var mapaBase = montarMapa(listaAeroportos, listaNuvens, colunas, linhas);
  var mapaEvoluido = marcarEvolucaoNuvem(mapaBase);

  todosMapas.push(mapaBase);
  todosMapas.push(mapaEvoluido);

  var qtdDiasAeroportoCoberto = 0;
  var dias = 2;

  var aeroportoLivre = contarAeroportoLivre(mapaEvoluido);

  while (aeroportoLivre > 0) {

    if ((aeroportoLivre < aeroportos) && (qtdDiasAeroportoCoberto === 0)) {
      qtdDiasAeroportoCoberto = dias - 1;
    }

    mapaEvoluido = marcarEvolucaoNuvem(mapaEvoluido);
    todosMapas.push(mapaEvoluido);

    aeroportoLivre = contarAeroportoLivre(mapaEvoluido);
    dias++;
  }

  return { mapas: todosMapas, dias: dias, diasAeroportoCoberto: qtdDiasAeroportoCoberto };

}


function marcarPontosMapa(colunas, linhas, quantidade, cargaInicial) {

  var listaMarcada = [];

  for (var i = 0; i < quantidade; i++) {
    var a = Math.floor(Math.random() * (colunas * linhas));

    if (listaMarcada.indexOf(a) < 0 && cargaInicial.indexOf(a) < 0) {
      listaMarcada.push(a);
    } else {
      i--
    }
  }

  return listaMarcada;
}

function montarMapa(listaAeroportos, listaNuvens, colunas, linhas) {

  var quantidadeTotal = colunas * linhas;

  var listaMapa = [];

  var arrayAux = [];

  for (var i = 0; i < quantidadeTotal; i++) {

    if (listaAeroportos.indexOf(i) >= 0) {
      arrayAux.push('A');
    } else if (listaNuvens.indexOf(i) >= 0) {
      arrayAux.push('*');
    } else {
      arrayAux.push('.');
    }

    if (arrayAux.length === parseInt(colunas)) {
      listaMapa.push(arrayAux);
      arrayAux = [];
    }
  }

  return listaMapa;
}

function marcarEvolucaoNuvem(mapaBase) {

  var listaEvoluida = [];

  mapaBase.forEach(x => {
    listaEvoluida.push(new Array(...x));
  });


  for (var i = 0; i < mapaBase.length; i++) {
    for (var j = 0; j < mapaBase[i].length; j++) {

      if (mapaBase[i][j] && mapaBase[i][j] == '*') {
        listaEvoluida[i][j] = '*';

        if (listaEvoluida[i][j - 1])
          listaEvoluida[i][j - 1] = '*';

        if (listaEvoluida[i][j + 1])
          listaEvoluida[i][j + 1] = '*';

        if (mapaBase[i - 1] && listaEvoluida[i - 1][j])
          listaEvoluida[i - 1][j] = '*';

        if (mapaBase[i + 1] && listaEvoluida[i + 1][j])
          listaEvoluida[i + 1][j] = '*';
      }

    }
  }

  return listaEvoluida;
}

function contarAeroportoLivre(mapa) {
  var qtdAeroporto = 0;

  for (var i = 0; i < mapa.length; i++) {
    if (mapa[i].indexOf('A') >= 0)
      qtdAeroporto++;
  }

  return qtdAeroporto;
}