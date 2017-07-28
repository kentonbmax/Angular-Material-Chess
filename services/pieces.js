'use strict';

angular.module('pieces', [])
  .factory('Pieces', [function() {

    var piecesObj = {}

    const pieces = {empty: 0, wp:1, wn:2, wb:3, wr:4, wq:5, wk:6, 
                            bp:7, bn:8, bb:9, br:10, bq:11, bk:12}

    const symbols = {1: '&#9817', 2: '&#9816;', 3: '&#9815;', 4: '&#9814;'
      , 5: '&#9813;', 6: '&#9812;', 7: '&#9823;', 8: '&#9822;', 9: '&#9821;'
      , 10: '&#9820;', 11: '&#9819;', 12: '&#9818;'}

    const startingIndexs = {0:pieces.br, 1: pieces.bn, 2:pieces.bb, 3: pieces.bq, 4:pieces.bk
                          , 5:pieces.bb, 6:pieces.bn, 7: pieces.br, 8:pieces.bp, 9:pieces.bp, 10:pieces.bp
                          , 11:pieces.bp, 12:pieces.bp, 13:pieces.bp, 14:pieces.bp, 15:pieces.bp
                          //White
                          , 48:pieces.wp, 49: pieces.wp, 50:pieces.wp, 51: pieces.wp, 52:pieces.wp
                          , 53:pieces.wp, 54:pieces.wp, 55: pieces.wp, 56:pieces.wr, 57:pieces.wn, 58:pieces.wb
                          , 59:pieces.wq, 60:pieces.wk, 61:pieces.wb, 62:pieces.wn, 63:pieces.wr}

    piecesObj.getPiece = function(pieceName) {
      return pieces[pieceName]
    }

    piecesObj.getSymbol = function(index) {
      return symbols[index]
    }

    piecesObj.getStartIndexs = function() {
      return startingIndexs
    }

    piecesObj.getStartingIndex = function(piece) {
      return _.find(startingIndexs, piece)
    }

    piecesObj.pieces = pieces

    Object.freeze(piecesObj.pieces)

    return piecesObj
  }])
