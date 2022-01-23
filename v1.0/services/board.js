'use strict';

angular.module('board', [])
  .factory('Board', ['Pieces', function(Pieces) {
    var board = {}
    
    board.board = new Array(64)
    const LAYOUT = Pieces.getStartIndexs()

    board.initalize = function() {
      
      setBoard()
      console.log(board.board)
    }

    board.move = function(startIndex, endIndex) {
        board.board[endIndex].pieceId = board.board[startIndex].pieceId
        board.board[endIndex].symbol = board.board[startIndex].symbol
        board.board[startIndex].pieceId = Pieces.pieces.empty
        board.board[startIndex].symbol = Pieces.getSymbol(Pieces.pieces.empty)
    }

     function setBoard() {
      for(var i =0; i < board.board.length; i++) {
        var currentPiece = LAYOUT[i]
        var tileColor = parseInt((i / 8)+i) % 2 === 0 ? '': 'green'
        if(currentPiece){
          board.board[i] = {index: i, pieceId:currentPiece, symbol:Pieces.getSymbol(currentPiece), color: tileColor, selected:false}
        } else{
          board.board[i] = {index: i, pieceId:Pieces.getPiece('empty'), symbol:null, color: tileColor, selected:false}
        }
      }
    }
    return board

  }])

 
