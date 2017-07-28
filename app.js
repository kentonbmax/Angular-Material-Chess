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
    vm.makeMove = false
    console.log('start')

    vm.start = function() {
        reset()
        Board.initalize()
        vm.board = Board.board 
        vm.player = 0
        vm.reset = vm.reset? false: true
    }

    vm.clickTile = function(tile) {
        var moveMade = false
        var canMove = Move.canMove(vm.player, vm.board[tile.index], tile.index)
        var isMove = vm.pieceStartIndex && vm.board[vm.pieceStartIndex] !== tile
        
        if(isMove) {
            vm.player = Move.makeMove(vm.player, vm.board[vm.pieceStartIndex], vm.pieceStartIndex, tile.index, tile.pieceId) 
            Board.move(vm.pieceStartIndex, tile.index)
            vm.board = Board.board
            moveMade = true
        }

        vm.move = canMove
        vm.pieceStartIndex = moveMade? null: tile.index
        vm.moveMessage = updateMoveMessage(canMove||moveMade)
    }

    function reset() {
        vm.moveMessage = ''
        vm.reset = false
        vm.player = -1
        pieceStartIndex = null
    }

    function updateMoveMessage(move) {
        if(vm.player > -1 && pieceStartIndex > -1) {
            return move? 'Valid to Move' : 'Invalid to Move'
        } else {
            return 'Make a move!'
        }
    }
}

