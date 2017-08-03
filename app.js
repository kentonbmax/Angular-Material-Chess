angular.module('app', [
    'ngMaterial',
    'board',
    'pieces',
    'move',
    'moves'
])

.controller('ChessController', ['Board', 'Move','Pieces', ChessController])
.filter('unsafe', function($sce) {
    return function(val) {
        return $sce.trustAsHtml(val)
    }
})

function ChessController(Board, Move, Pieces){
    var vm = this
    vm.moveMessage = ''
    vm.reset = false
    vm.player = -1
    var pieceStartIndex = null
    var pieceLastIndex = -1
    var lastMoveIndex = -1
    vm.makeMove = false
    vm.capturedPieces = []
    console.log('start')

    vm.start = function() {
        reset()
        Board.initalize()
        vm.board = Board.board 
        vm.reset = vm.reset? false: true
    }

    vm.clickTile = function(tile) {
        var moveMade = false
        var validMove = false
        var validMovePiece = false
        var validPlayerPiece = Pieces.validPlayerPiece(vm.player, tile.pieceId)
        var isMove = Move.isMove(vm.player, tile.pieceId)
        
        if(isMove) {
            var onBoard = Move.onBoard(tile.index)
            validMove = Move.validMove(vm.player, tile) 

            if(onBoard && validMove){
                var capturedPiece = Move.makeMove(vm.player, vm.board[vm.pieceStartIndex], 
                    vm.pieceStartIndex, tile.index, tile.pieceId) 
                
                if(capturedPiece > 0) {
                    vm.capturedPieces.push(Pieces.getSymbol(capturedPiece))
                }

                Board.move(vm.pieceStartIndex, tile.index)
                vm.board = Board.board
                vm.pieceLastIndex = -1
                vm.lastMoveIndex = tile.index
                moveMade = true
                vm.player = vm.player === Pieces.players.white? 
                                          Pieces.players.black:
                                          Pieces.players.white
            }
        }

        vm.pieceStartIndex = moveMade ? null: tile.index
        vm.moveMessage = updateMoveMessage(moveMade, validPlayerPiece)
        moveMade = false
        vm.pieceLastIndex = validMovePiece? tile.index: -1
    }

    function reset() {
        vm.moveMessage = ''
        vm.reset = false
        vm.player = Pieces.players.white
        pieceStartIndex = null
    }

    function updateMoveMessage(moveMade, validPlayerPiece) {
        var makeAMove = 'Make a Move'

        if(moveMade) {
            return makeAMove
        }

        if(vm.player > -1 && pieceStartIndex > -1) {
            return validPlayerPiece? 'Valid to Move' : 'Invalid to Move'
        } else {
            return makeAMove
        }
    }
}

