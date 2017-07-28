'use strict';
// TODO: finish moves.
angular.module('moves', [])
  .factory('Moves', ['Pieces', 'Move', function(Pieces, Move) {
    var moves = {}
    var startingIndexs = Pieces.getStartingIndex()

    moves.pawn = function(board, currentIndex) {
        if(onboard(newIndex)) {
            if(isCapture(board, newIndex)) {

            }
        }
    }

    function onBoard(index){
        return _.inRange(index, 0, 65)
    }

  }])