'use strict';

angular.module('move', [])
  .factory('Move', [function() {
    var move = {}
    const PLAYERS = {white:0, black:1}
    var currentIndex = null
    move.moves = []
    move.capturedPieces = []
    move.currentPlayer = 0

    function getPlayerPieceRange(player){
      return player === PLAYERS.white? [1,7]: [8,13]
    }

    function getCapturedPieces() {
      return move.capturedPieces
    }

    move.getRecentMoves = function(piece) {
      return _.find(moves, {'piece': piece})
    }

    // updates moves array which tacks history
    move.makeMove = function(player, piece, startIndex, endIndex, captureId){
      var pieceRange = getPlayerPieceRange(player)
      move.moves.push({player:player, piece:piece, start: startIndex, end:endIndex, captureId:captureId})
      
      if(captureId > 0) {
        move.capturedPieces.push({payer: player, id:captureId})
      }

      return player === PLAYERS.white? PLAYERS.black: PLAYERS.white
    }

    move.validPiece = function(player, pieceId) {
      var playerPieceRange = getPlayerPieceRange(player)
      return _.inRange(pieceId, playerPieceRange[0], playerPieceRange[1])
    }

    move.validMove = function(player, targetTile) {
      return !move.validPiece(player, targetTile.pieceId)
    }

    move.onBoard = function(index) {
      var validMove  = _.inRange(index, 0, 65)
      if(validMove) {
        return true
      } else {
        return false
      }
    }

    return move
  }])