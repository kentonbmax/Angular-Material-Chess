'use strict';

angular.module('move', [])
  .factory('Move', ['Pieces', function(Pieces) {
    var move = {}
    var currentIndex = null
    move.moves = []
    move.capturedPieces = []
    move.currentPlayer = 0

    function getCapturedPieces() {
      return move.capturedPieces
    }

    move.getRecentMoves = function(piece) {
      return _.find(moves, {'piece': piece})
    }

    // updates moves array which tacks history
    move.makeMove = function(player, piece, startIndex, endIndex, captureId){
      move.moves.push({player:player, piece:piece, start: startIndex, end:endIndex, captureId:captureId})
      var validCapter = move.isCapture(player, captureId)
      
      if(validCapter) {
        move.capturedPieces.push({index: move.capturedPieces.length + 1, 
          player: player, id:captureId})
        return captureId
      }

      return Pieces.pieces.empty
    }

    move.isMove = function(player, targetPieceId) {
      if(Pieces.pieces.empty === targetPieceId) {
        return true
      }
      var otherPlayer = !Pieces.validPlayerPiece(player, targetPieceId)

      return otherPlayer
    }

    move.isCapture = function(player, captureId) {
      return Pieces.pieces.empty !== captureId
      var validCapter = !Pieces.validPlayerPiece(player, captureId) && captureId !== Pieces.pieces.empty
      return validCapter
    }

    move.validMove = function(player, targetTile) {
      return !Pieces.validPlayerPiece(player, targetTile.pieceId)
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