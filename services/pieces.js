'use strict';

angular.module('pieces', [])
  .factory('Pieces', [function() {

    var piecesObj = {}

    const PIECES = {empty: 0, wp:1, wn:2, wb:3, wr:4, wq:5, wk:6, 
                            bp:7, bn:8, bb:9, br:10, bq:11, bk:12}

    const SYMBOLS = {1: '&#9817', 2: '&#9816;', 3: '&#9815;', 4: '&#9814;'
      , 5: '&#9813;', 6: '&#9812;', 7: '&#9823;', 8: '&#9822;', 9: '&#9821;'
      , 10: '&#9820;', 11: '&#9819;', 12: '&#9818;'}

    const STARTING_INDEXS = {0:PIECES.br, 1: PIECES.bn, 2:PIECES.bb, 3: PIECES.bq, 4:PIECES.bk
                          , 5:PIECES.bb, 6:PIECES.bn, 7: PIECES.br, 8:PIECES.bp, 9:PIECES.bp, 10:PIECES.bp
                          , 11:PIECES.bp, 12:PIECES.bp, 13:PIECES.bp, 14:PIECES.bp, 15:PIECES.bp
                          //White
                          , 48:PIECES.wp, 49: PIECES.wp, 50:PIECES.wp, 51: PIECES.wp, 52:PIECES.wp
                          , 53:PIECES.wp, 54:PIECES.wp, 55: PIECES.wp, 56:PIECES.wr, 57:PIECES.wn, 58:PIECES.wb
                          , 59:PIECES.wq, 60:PIECES.wk, 61:PIECES.wb, 62:PIECES.wn, 63:PIECES.wr}

    piecesObj.getPiece = function(pieceName) {
      return PIECES[pieceName]
    }

    piecesObj.getSymbol = function(index) {
      return SYMBOLS[index]
    }

    piecesObj.getStartIndexs = function() {
      return STARTING_INDEXS
    }

    piecesObj.getStartingIndex = function(piece) {
      return _.find(STARTING_INDEXS, piece)
    }

    piecesObj.pieces = PIECES

    Object.freeze(piecesObj.pieces)

    return piecesObj
  }])
